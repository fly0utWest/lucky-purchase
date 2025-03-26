import { prisma } from "../db/config";
import { CreateItemDTO, GetItemsDTO } from "../validators/item.validator";

export async function createItem(data: CreateItemDTO & { userId: string }) {
  const { userId, ...itemData } = data;

  return prisma.item.create({
    data: {
      ...itemData,
      user: { connect: { id: userId } },
    },
  });
}

export async function getItems({
  limit = 10,
  skip = 0,
  sort = "desc",
}: GetItemsDTO) {
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
        },
      },
    },
  });

  if (!item) {
    throw new Error("Товар не найден");
  }

  return item;
}
