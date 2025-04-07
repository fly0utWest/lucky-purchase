import { prisma } from "../db/config";
import bcrypt from "bcrypt";
import { RegisterUserDTO, UpdateUserDTO } from "../validators/user.validator";
import { GetItemsSchema } from "../validators/item.validator";
import { createUploadMiddleware } from "../config/multer.config";

export const uploadUserFiles = createUploadMiddleware({
  destination: (req, file, cb) => {
    const path =
      file.fieldname === "avatar"
        ? "static/users/avatars"
        : "static/users/backgrounds";
    cb(null, path);
  },
  fileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
});

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
    select: {
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

export async function updateUserById(userId: string, data: UpdateUserDTO) {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
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
