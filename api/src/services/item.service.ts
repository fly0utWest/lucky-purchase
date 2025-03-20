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

export async function getItems({ limit, skip, sort }: GetItemsDTO) {
  return prisma.item.findMany({
    take: limit,
    skip,
    orderBy: { createdAt: sort },
  });
}
