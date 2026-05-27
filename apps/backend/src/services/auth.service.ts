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
 },
 token: generateToken(user.id),
 };
};
