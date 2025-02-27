import { prisma } from "../db/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function createUser(login: string, name: string, password: string) {
  const encryptedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({ data: { login, name, password: encryptedPassword } });
}

export async function getUserByLogin(login: string) {
  return prisma.user.findUnique({ where: { login } });
}

export async function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30 days",
  });
}
