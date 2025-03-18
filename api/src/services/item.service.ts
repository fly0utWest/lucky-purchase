import { prisma } from "../db/config";
import { CreateItemDTO } from "../validators/item.validator";

export async function createItem(data: CreateItemDTO & { userId: string }) {
  const { userId, ...itemData } = data;

  return prisma.item.create({
    data: {
      ...itemData,
      user: { connect: { id: userId } },
    },
  });
}
