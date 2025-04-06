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
  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
    select: {
      item: true,
    },
  });

  return favorites.map((favorite) => favorite.item);
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
