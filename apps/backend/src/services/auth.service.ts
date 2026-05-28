import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const registerUser = async (userData: any) => {
 const { username, email, password } = userData;

 const existingUser = await prisma.user.findFirst({
 where: {
 OR: [
 { email: { equals: email } },
 { username: { equals: username } },
 ],
 },
 });

 if (existingUser) {
 throw new Error("User with this email or username already exists");
 }

 const passwordHash = await bcrypt.hash(password, 10);

 const user = await prisma.user.create({
 data: {
 username,
 email,
 passwordHash,
 },
 });

 return {
 user: {
 id: user.id,
 username: user.username,
 email: user.email,
 },
 token: generateToken(user.id),
 };
};

export const loginUser = async (credentials: any) => {
 const { email, password } = credentials;

 const user = await prisma.user.findUnique({
 where: { email },
 });

 if (!user) {
 throw new Error("Invalid credentials");
 }

 const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

 if (!isPasswordValid) {
 throw new Error("Invalid credentials");
 }

 return {
  user: {
   id: user.id,
   username: user.username,
   email: user.email,
   profileImage: user.profileImage,
  },
  token: generateToken(user.id),
 };
};

export const getCurrentUser = async (userId: string) => {
 const user = await prisma.user.findUnique({
 where: { id: userId },
 select: {
 id: true,
 username: true,
 email: true,
 profileImage: true,
 createdAt: true,
 updatedAt: true,
 },
 });

 if (!user) {
 throw new Error("User not found");
 }

 return user;
};

export const updateCurrentUser = async (
 userId: string,
 data: { username?: string; profileImage?: string | null },
) => {
 const username = data.username?.trim();
 const profileImage = data.profileImage?.trim();

 if (!username || username.length < 2) {
 throw new Error("El nombre debe tener al menos 2 caracteres");
 }

 const existingUser = await prisma.user.findFirst({
 where: {
 username,
 NOT: { id: userId },
 },
 });

 if (existingUser) {
 throw new Error("Ese nombre de usuario ya está en uso");
 }

 return prisma.user.update({
 where: { id: userId },
 data: {
 username,
 profileImage: profileImage || null,
 },
 select: {
 id: true,
 username: true,
 email: true,
 profileImage: true,
 createdAt: true,
 updatedAt: true,
 },
 });
};

export const changeCurrentUserPassword = async (
 userId: string,
 currentPassword: string,
 newPassword: string,
) => {
 if (!currentPassword) {
 throw new Error("Ingresa tu contraseña actual");
 }

 if (!newPassword || newPassword.length < 6) {
 throw new Error("La nueva contraseña debe tener al menos 6 caracteres");
 }

 const user = await prisma.user.findUnique({
 where: { id: userId },
 });

 if (!user) {
 throw new Error("User not found");
 }

 const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

 if (!isPasswordValid) {
 throw new Error("La contraseña actual no es correcta");
 }

 const passwordHash = await bcrypt.hash(newPassword, 10);

 await prisma.user.update({
 where: { id: userId },
 data: { passwordHash },
 });

 return { message: "Contraseña actualizada" };
};
