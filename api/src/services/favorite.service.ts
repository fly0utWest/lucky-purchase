import { prisma } from "../db/config";

export async function addToFavorites(userId: string, itemId: string) {
  return prisma.favorite.create({
    data: {
      userId,
      itemId,
    },
  });
}

export async function removeFromFavorites(userId: string, itemId: string) {
  return prisma.favorite.delete({
    where: {
      userId_itemId: {
        userId,
        itemId,
      },
    },
  });
}

export async function getUserFavorites(userId: string) {
  return prisma.favorite.findMany({
    where: {
      userId,
    },
    select: {
      item: true,
    },
  });
}

export async function isItemFavorited(userId: string, itemId: string) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_itemId: {
        userId,
        itemId,
      },
    },
  });

  return favorite !== null;
}
