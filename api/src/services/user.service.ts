import { prisma } from "../db/config";
import bcrypt from "bcrypt";

export const createUser = async (login: string, password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({ data: { login, password: encryptedPassword } });
};

export const getUserByLogin = async (login: string) => {
  return prisma.user.findUnique({ where: { login } });
};
