import { prisma } from "../db/config";
import bcrypt from "bcrypt";

export async function createUser(
  login: string,
  name: string,
  password: string
) {
  const encryptedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { login, name, password: encryptedPassword },
  });
}

export async function getUserByLogin(login: string) {
  return prisma.user.findUnique({ where: { login } });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, avatar: true, createdAt: true },
  });
}

export async function getAuthenticatedUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      login: true,
      avatar: true,
      createdAt: true,
    },
  });
}
