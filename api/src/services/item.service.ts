import { prisma } from "../db/config";
import { CreateItemDTO, GetItemsDTO } from "../validators/item.validator";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";
import { unlink } from "fs/promises";
import { AppError } from "../utils/errors";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "static/items");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueName = `${crypto.randomBytes(16).toString("hex")}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Настройка загрузки
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Неподдерживаемый формат файла"));
    }
  },
});

export async function uploadImage(file: Express.Multer.File) {
  return file.filename;
}

export async function createItem(data: CreateItemDTO & { userId: string }) {
  const { userId, categoryId, ...itemData } = data;

  return prisma.item.create({
    data: {
      ...itemData,
      category: { connect: { id: categoryId } },
      user: { connect: { id: userId } },
    },
  });
}

export async function getItems({ limit, skip, sort }: GetItemsDTO) {
  return prisma.item.findMany({
    take: Number(limit),
    skip: Number(skip),
    orderBy: { createdAt: sort },
  });
}

export async function getItemById(id: string) {
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
      category: {
        select: { id: true, name: true },
      },
    },
  });

  return item;
}

export async function removeItemById(id: string) {
  const deletedItem = await prisma.item.delete({
    where: {
      id,
    },
  });

  const pics = deletedItem.images;

  const deletePromises = pics.map((pic) =>
    unlink(`${process.cwd()}/static/items/${pic}`).catch((err) => {
      throw new AppError(`Не удалось удалить файл ${pic}: ${err.message}`, 500);
    })
  );

  await Promise.all(deletePromises);

  return null;
}
