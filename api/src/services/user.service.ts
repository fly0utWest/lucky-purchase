import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";
import { unlink } from "fs/promises";
import { UpdateUserDTO, RegisterUserDTO } from "../validators/user.validator";
import { AppError } from "../utils/errors";

const autheniticatedUserSelectFields = {
  id: true,
  name: true,
  login: true,
  avatar: true,
  background: true,
  createdAt: true,
  favorites: {
    select: {
      itemId: true,
    },
  },
  items: {
    select: {
      id: true,
    },
  },
};

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
    select: {
      id: true,
      name: true,
      avatar: true,
      background: true,
      createdAt: true,
    },
  });
}

export async function getAuthenticatedUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: autheniticatedUserSelectFields,
  });

  if (!user) return null;

  return {
    ...user,
    favorites: user.favorites.map((fav) => fav.itemId),
    items: user.items.map((item) => item.id),
  };
}

export interface AuthenticatedUserResponse {
  id: string;
  name: string;
  login: string;
  avatar: string | null;
  background: string | null;
  createdAt: Date;
  favorites: string[];
  items: string[];
}

export async function updateUserById(
  userId: string,
  data: UpdateUserDTO
): Promise<AuthenticatedUserResponse | null> {
  if ("avatar" in data) {
    const oldUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });

    if (oldUser?.avatar) {
      try {
        await unlink(`${process.cwd()}/static/users/avatars/${oldUser.avatar}`);
      } catch (error) {
        console.log("[ПРЕДУПРЕЖДЕНИЕ] Не удалось удалить аватар");
      }
    }
  }

  if ("background" in data) {
    const oldUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { background: true },
    });

    if (oldUser?.background) {
      try {
        await unlink(
          `${process.cwd()}/static/users/backgrounds/${oldUser.background}`
        );
      } catch (error) {
        console.log("[ПРЕДУПРЕЖДЕНИЕ] Не удалось удалить фон");
      }
    }
  }

  if ("password" in data) {
    const encryptedPassword = await bcrypt.hash(data.password!, 10);
    data.password = encryptedPassword;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: autheniticatedUserSelectFields,
  });

  return {
    ...user,
    favorites: user.favorites.map((fav) => fav.itemId),
    items: user.items.map((item) => item.id),
  };
}
