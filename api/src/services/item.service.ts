import { prisma } from "../../config/db";
import { CreateItemDTO, GetItemsDTO } from "../validators/item.validator";
import { unlink } from "fs/promises";
import { AppError } from "../utils/errors";
import {
  CreateItemResponse,
  GetItemByIdResponse,
  GetItemsResponse,
} from "../types/responses";

export async function createItem(
  data: CreateItemDTO & { userId: string }
): Promise<CreateItemResponse> {
  const { userId, categoryId, ...itemData } = data;

  const createdItem = await prisma.item.create({
    data: {
      ...itemData,
      category: { connect: { id: categoryId } },
      user: { connect: { id: userId } },
    },
  });

  console.log(`[УСПЕХ] Объявление добавлено пользователем с id ${userId}`);

  return { item: createdItem };
}

export async function getItems({
  limit,
  skip,
  sort,
  userId,
}: GetItemsDTO): Promise<GetItemsResponse> {
  const items = await prisma.item.findMany({
    where: userId ? { userId } : {},
    take: Number(limit),
    skip: Number(skip),
    orderBy: { createdAt: sort },
  });

  console.log(`[УСПЕХ] Было запрошено ${items.length} объявлений`);
  return { items, count: items.length };
}

export async function getItemById(id: string): Promise<GetItemByIdResponse> {
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          avatar: true,
        },
      },
      category: {
        select: { id: true, name: true },
      },
    },
  });

  if (!item) {
    throw new AppError("Объявление не было найдено!", 404);
  }

  return { ...item };
}

export async function removeItemById(id: string): Promise<null> {
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

  console.log(`[УСПЕХ] удалено объявление с id ${id}`);
  return null;
}
