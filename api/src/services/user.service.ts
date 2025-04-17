import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";
import { unlink } from "fs/promises";
import { UpdateUserDTO, RegisterUserDTO } from "../validators/user.validator";
import { AppError } from "../utils/errors";
import {
  AuthenticatedUserResponse,
  UserByIdResponse,
  UserCreationResponse,
} from "../types/responses";

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

export async function createUser({
  login,
  password,
  name,
}: RegisterUserDTO): Promise<UserCreationResponse> {
  const existentUser = await prisma.user.findUnique({ where: { login } });

  if (existentUser) {
    throw new AppError("Пользователь уже зарегистрирован", 400);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  console.log(`[УСПЕХ] пользователь ${login} зарегистрирован`);
  const {
    id,
    login: createdLogin,
    createdAt,
  } = await prisma.user.create({
    data: { login, name, password: encryptedPassword },
  });

  return { id, login: createdLogin, createdAt };
}

export async function getUserById(userId: string): Promise<UserByIdResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      avatar: true,
      background: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("Пользователь не найден", 404);
  }

  console.log(`[УСПЕХ] Пользователь по id ${user.id} запрошен`);

  return user;
}

export async function getAuthenticatedUserById(
  userId: string
): Promise<AuthenticatedUserResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: autheniticatedUserSelectFields,
  });

  if (!user) {
    throw new AppError("Пользователь не найден", 404);
  }

  console.log(
    `[УСПЕХ] Данные авторизованного пользователя ${user.login} запрошены`
  );
  return {
    ...user,
    favorites: user.favorites.map((fav) => fav.itemId),
    items: user.items.map((item) => item.id),
  };
}

export async function updateUserById(
  userId: string,
  data: UpdateUserDTO
): Promise<AuthenticatedUserResponse> {
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

  if (!user) {
    throw new AppError("Пользователь не найден", 404);
  }

  console.log(`[УСПЕХ] Пользователь ${user.login} обновлен`);

  return {
    ...user,
    favorites: user.favorites.map((fav) => fav.itemId),
    items: user.items.map((item) => item.id),
  };
}
