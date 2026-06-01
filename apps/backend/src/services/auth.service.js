const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { getPrisma } = require('../lib/prisma');
const { getJwtSecret } = require('../utils/env');
const { createHttpError } = require('../utils/http-error');

const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;
const PASSWORD_REQUIREMENTS =
  'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol';

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function assertEmail(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createHttpError(400, 'A valid email is required');
  }
}

function assertPassword(password) {
  if (
    typeof password !== 'string' ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)
  ) {
    throw createHttpError(400, PASSWORD_REQUIREMENTS);
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

async function signup(payload) {
  const prisma = getPrisma();
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

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw createHttpError(409, 'Email is already registered');
  }

  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
    },
  });

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}

async function login(payload) {
  const prisma = getPrisma();
  const email = normalizeEmail(payload.email);
  const password = payload.password;

  assertEmail(email);

  if (!password) {
    throw createHttpError(400, 'Password is required');
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    throw createHttpError(401, 'Invalid email or password');
  }

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}

async function recoverPassword(payload) {
  const prisma = getPrisma();
  const email = normalizeEmail(payload.email);
  assertEmail(email);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw createHttpError(404, 'No user was found for this email');
  }

  const token = randomBytes(32).toString('hex');

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    },
  });

  return {
    message: 'Password recovery email sent',
    resetToken: token,
  };
}

async function resetPassword(payload) {
  const prisma = getPrisma();
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

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    if (resetToken) {
      await prisma.passwordResetToken.delete({ where: { token } });
    }
    throw createHttpError(400, 'Reset token is invalid or expired');
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash: bcrypt.hashSync(password, 10) },
    }),
    prisma.passwordResetToken.delete({ where: { token } }),
  ]);

  return { message: 'Password updated successfully' };
}

async function getUserProfile(userId) {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return sanitizeUser(user);
}

async function updateUserProfile(userId, payload) {
  const prisma = getPrisma();
  const username = String(payload.username || payload.name || '').trim();

  if (!username && payload.profileImage === undefined) {
    throw createHttpError(400, 'Profile update payload is required');
  }

  const data = {};

  if (username) {
    data.username = username;
  }

  if (payload.profileImage !== undefined) {
    data.profileImage = payload.profileImage;
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return sanitizeUser(user);
  } catch (error) {
    throw createHttpError(404, 'User not found');
  }
}

async function changePassword(userId, payload) {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { id: userId } });

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

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: bcrypt.hashSync(newPassword, 10) },
  });

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
