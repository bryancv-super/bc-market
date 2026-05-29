import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { randomBytes } from "crypto";
import { getPrisma } from "@/lib/server/prisma";
import { createHttpError } from "@/lib/server/http";
import { sendPasswordRecoveryEmail } from "@/lib/server/email";

const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;

export type AuthUser = {
  id: string;
  email: string;
};

function getJwtSecret() {
  return process.env.JWT_SECRET || "bc-market-development-secret";
}

function normalizeEmail(email: unknown) {
  return String(email || "").trim().toLowerCase();
}

function assertEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createHttpError(400, "A valid email is required");
  }
}

function assertPassword(password: unknown) {
  if (typeof password !== "string" || password.length < 8) {
    throw createHttpError(400, "Password must contain at least 8 characters");
  }
}

function sanitizeUser(user: {
  id: string;
  username: string;
  email: string;
  profileImage: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function signToken(user: { id: string; email: string }) {
  return jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), { expiresIn: "7d" });
}

export function getAuthUser(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    throw createHttpError(401, "Authentication token is required");
  }

  try {
    const payload = jwt.verify(token, getJwtSecret()) as JwtPayload;

    if (typeof payload.id !== "string" || typeof payload.email !== "string") {
      throw new Error("Invalid token payload");
    }

    return { id: payload.id, email: payload.email };
  } catch {
    throw createHttpError(401, "Invalid or expired authentication token");
  }
}

export function getOptionalAuthUser(request: Request) {
  try {
    return getAuthUser(request);
  } catch {
    return null;
  }
}

export async function signup(payload: Record<string, unknown>) {
  const prisma = getPrisma();
  const username = String(payload.username || payload.name || "").trim();
  const email = normalizeEmail(payload.email);
  const password = payload.password;
  const passwordConfirmation = payload.passwordConfirmation || payload.confirmPassword;

  if (!username) {
    throw createHttpError(400, "Name is required");
  }

  assertEmail(email);
  assertPassword(password);

  if (password !== passwordConfirmation) {
    throw createHttpError(400, "Password confirmation does not match");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw createHttpError(409, "Email is already registered");
  }

  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: bcrypt.hashSync(String(password), 10),
    },
  });

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}

export async function login(payload: Record<string, unknown>) {
  const prisma = getPrisma();
  const email = normalizeEmail(payload.email);
  const password = payload.password;

  assertEmail(email);

  if (!password) {
    throw createHttpError(400, "Password is required");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(String(password), user.passwordHash)) {
    throw createHttpError(401, "Invalid email or password");
  }

  return {
    user: sanitizeUser(user),
    token: signToken(user),
  };
}

export async function recoverPassword(payload: Record<string, unknown>, appUrl: string) {
  const prisma = getPrisma();
  const email = normalizeEmail(payload.email);
  assertEmail(email);

  const user = await prisma.user.findUnique({ where: { email } });
  const message = "If the email exists, a password recovery link was sent";

  if (!user) {
    return { message };
  }

  const token = randomBytes(32).toString("hex");

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    },
  });

  const resetUrl = `${appUrl.replace(/\/$/, "")}/reset-password?token=${token}`;
  await sendPasswordRecoveryEmail(user.email, resetUrl);

  return { message };
}

export async function resetPassword(payload: Record<string, unknown>) {
  const prisma = getPrisma();
  const token = String(payload.token || "").trim();
  const password = payload.password || payload.newPassword;
  const passwordConfirmation = payload.passwordConfirmation || payload.confirmPassword;

  if (!token) {
    throw createHttpError(400, "Reset token is required");
  }

  assertPassword(password);

  if (password !== passwordConfirmation) {
    throw createHttpError(400, "Password confirmation does not match");
  }

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    if (resetToken) {
      await prisma.passwordResetToken.delete({ where: { token } });
    }
    throw createHttpError(400, "Reset token is invalid or expired");
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash: bcrypt.hashSync(String(password), 10) },
    }),
    prisma.passwordResetToken.delete({ where: { token } }),
  ]);

  return { message: "Password updated successfully" };
}

export async function getUserProfile(userId: string) {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  return sanitizeUser(user);
}

export async function updateUserProfile(userId: string, payload: Record<string, unknown>) {
  const prisma = getPrisma();
  const username = String(payload.username || payload.name || "").trim();

  if (!username && payload.profileImage === undefined) {
    throw createHttpError(400, "Profile update payload is required");
  }

  const data: { username?: string; profileImage?: string | null } = {};

  if (username) {
    data.username = username;
  }

  if (payload.profileImage !== undefined) {
    data.profileImage = payload.profileImage ? String(payload.profileImage) : null;
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return sanitizeUser(user);
  } catch {
    throw createHttpError(404, "User not found");
  }
}

export async function changePassword(userId: string, payload: Record<string, unknown>) {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const currentPassword = payload.currentPassword;
  const newPassword = payload.newPassword || payload.password;
  const passwordConfirmation = payload.passwordConfirmation || payload.confirmPassword;

  if (!bcrypt.compareSync(String(currentPassword || ""), user.passwordHash)) {
    throw createHttpError(401, "Current password is invalid");
  }

  assertPassword(newPassword);

  if (newPassword !== passwordConfirmation) {
    throw createHttpError(400, "Password confirmation does not match");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: bcrypt.hashSync(String(newPassword), 10) },
  });

  return { message: "Password changed successfully" };
}
