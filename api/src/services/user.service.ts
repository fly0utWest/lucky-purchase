import { prisma } from "../db/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createUser = async (login: string, password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({ data: { login, password: encryptedPassword } });
};

export const getUserByLogin = async (login: string) => {
  return prisma.user.findUnique({ where: { login } });
};

export const generateToken = async (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30 days",
  });
};
