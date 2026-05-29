const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes, randomUUID } = require('crypto');
const { getJwtSecret } = require('../utils/env');
const { createHttpError } = require('../utils/http-error');

const users = new Map();
const resetTokens = new Map();
const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function assertEmail(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createHttpError(400, 'A valid email is required');
  }
}

function assertPassword(password) {
  if (typeof password !== 'string' || password.length < 8) {
    throw createHttpError(400, 'Password must contain at least 8 characters');
  }
}

function sanitizeUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    getJwtSecret(),
    { expiresIn: '7d' },
  );
}

function findUserByEmail(email) {
  return Array.from(users.values()).find((user) => user.email === email);
}

function signup(payload) {
  const username = String(payload.username || payload.name || '').trim();
  const email = normalizeEmail(payload.email);
  const password = payload.password;
  const passwordConfirmation = payload.passwordConfirmation || payload.confirmPassword;

  if (!username) {
    throw createHttpError(400, 'Name is required');
  }

  assertEmail(email);
  assertPassword(password);

  if (password !== passwordConfirmation) {
    throw createHttpError(400, 'Password confirmation does not match');
  }

  if (findUserByEmail(email)) {
    throw createHttpError(409, 'Email is already registered');
  }

  const now = new Date().toISOString();
  const user = {
    id: randomUUID(),
    username,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    profileImage: null,
    createdAt: now,
    updatedAt: now,
  };

  users.set(user.id, user);

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}

function login(payload) {
  const email = normalizeEmail(payload.email);
  const password = payload.password;

  assertEmail(email);

  if (!password) {
    throw createHttpError(400, 'Password is required');
  }

  const user = findUserByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    throw createHttpError(401, 'Invalid email or password');
  }

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}

function recoverPassword(payload) {
  const email = normalizeEmail(payload.email);
  assertEmail(email);

  const user = findUserByEmail(email);

  if (!user) {
    throw createHttpError(404, 'No user was found for this email');
  }

  const token = randomBytes(32).toString('hex');

  resetTokens.set(token, {
    userId: user.id,
    expiresAt: Date.now() + RESET_TOKEN_TTL_MS,
  });

  return {
    message: 'Password recovery email sent',
    resetToken: token,
  };
}

function resetPassword(payload) {
  const token = String(payload.token || '').trim();
  const password = payload.password || payload.newPassword;
  const passwordConfirmation = payload.passwordConfirmation || payload.confirmPassword;

  if (!token) {
    throw createHttpError(400, 'Reset token is required');
  }

  assertPassword(password);

  if (password !== passwordConfirmation) {
    throw createHttpError(400, 'Password confirmation does not match');
  }

  const resetToken = resetTokens.get(token);

  if (!resetToken || resetToken.expiresAt < Date.now()) {
    resetTokens.delete(token);
    throw createHttpError(400, 'Reset token is invalid or expired');
  }

  const user = users.get(resetToken.userId);

  if (!user) {
    resetTokens.delete(token);
    throw createHttpError(400, 'Reset token is invalid or expired');
  }

  user.passwordHash = bcrypt.hashSync(password, 10);
  user.updatedAt = new Date().toISOString();
  resetTokens.delete(token);

  return { message: 'Password updated successfully' };
}

function getUserProfile(userId) {
  const user = users.get(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return sanitizeUser(user);
}

function updateUserProfile(userId, payload) {
  const user = users.get(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const username = String(payload.username || payload.name || user.username).trim();

  if (!username) {
    throw createHttpError(400, 'Name is required');
  }

  user.username = username;

  if (payload.profileImage !== undefined) {
    user.profileImage = payload.profileImage;
  }

  user.updatedAt = new Date().toISOString();

  return sanitizeUser(user);
}

function changePassword(userId, payload) {
  const user = users.get(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const currentPassword = payload.currentPassword;
  const newPassword = payload.newPassword || payload.password;
  const passwordConfirmation = payload.passwordConfirmation || payload.confirmPassword;

  if (!bcrypt.compareSync(currentPassword || '', user.passwordHash)) {
    throw createHttpError(401, 'Current password is invalid');
  }

  assertPassword(newPassword);

  if (newPassword !== passwordConfirmation) {
    throw createHttpError(400, 'Password confirmation does not match');
  }

  user.passwordHash = bcrypt.hashSync(newPassword, 10);
  user.updatedAt = new Date().toISOString();

  return { message: 'Password changed successfully' };
}

module.exports = {
  signup,
  login,
  recoverPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  changePassword,
};
