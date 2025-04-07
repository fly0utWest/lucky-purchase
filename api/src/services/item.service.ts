import { prisma } from "../db/config";
import { CreateItemDTO, GetItemsDTO } from "../validators/item.validator";
import { createUploadMiddleware } from "../config/multer.config";
import { Request } from "express";
import { unlink } from "fs/promises";
import { AppError } from "../utils/errors";

export const uploadItemFiles = createUploadMiddleware({
  destination: "static/items",
  fileSize: 10 * 1024 * 1024, // 10MB для товаров
});

export async function createItem(data: CreateItemDTO & { userId: string }) {
  const { userId, categoryId, ...itemData } = data;
  const imageFilenames = data.images.map((file) => file.filename);

  return prisma.item.create({
    data: {
      ...itemData,
      images: imageFilenames,
      category: { connect: { id: categoryId } },
      user: { connect: { id: userId } },
    },
  });
}

export async function getItems({ limit, skip, sort, userId }: GetItemsDTO) {
  return prisma.item.findMany({
    where: userId ? { userId } : {},
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
