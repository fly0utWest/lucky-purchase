import { prisma } from "../db/config";
import bcrypt from "bcrypt";
import { RegisterUserDTO } from "../validators/user.validator";
import { GetItemsSchema } from "../validators/item.validator";

export async function createUser({ login, password, name }: RegisterUserDTO) {
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
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      login: true,
      avatar: true,
      createdAt: true,
      favorites: {
        select: {
          itemId: true,
        },
      },
      items: { select: { id: true } },
    },
  });

  if (!user) return null;

  return {
    ...user,
    favorites: user.favorites.map((fav) => fav.itemId),
    items: user.items.map((item) => item.id),
  };
}

export async function updateUserById(userId: string) {}
