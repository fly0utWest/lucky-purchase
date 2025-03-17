import { prisma } from "../db/config";
import { Item } from "@prisma/client";

export async function createItem(data: Item) {
  const { userId, ...itemData } = data;

  return prisma.item.create({
    data: {
      ...itemData,
      user: { connect: { id: userId } },
    },
  });
}
