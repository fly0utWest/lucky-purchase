import { prisma } from "../../config/db";
import { AppError } from "../utils/errors";
import {
  GetUserFavoritesResponse,
  IsFavoritedResponse,
  ToggleFavoriteResponse,
} from "../types/responses";

export async function toggleFavorite(
  userId: string,
  itemId: string,
  action: "add" | "remove"
): Promise<ToggleFavoriteResponse> {
  let result;

  if (action === "add") {
    result = await prisma.favorite.create({
      data: {
        userId,
        itemId,
      },
    });
  } else {
    result = await prisma.favorite.delete({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });
  }

  if (!result) {
    throw new AppError(
      "Неправильные данные для добавления товара в избранное",
      400
    );
  }

  console.log(
    `[УСПЕХ] Пользователь с id ${userId} ${action === "add" ? "добавил" : "удалил"} товар с id ${itemId} ${action === "add" ? "в" : "из"} избранное${action === "add" ? "" : "го"}`
  );

  return { ...result, action };
}

export async function getUserFavorites(
  userId: string
): Promise<GetUserFavoritesResponse> {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
    select: {
      item: true,
    },
  });

  return {
    items: favorites.map((favorite) => favorite.item),
    count: favorites.length,
  };
}

export async function isItemFavorited(
  userId: string,
  itemId: string
): Promise<IsFavoritedResponse> {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_itemId: {
        userId,
        itemId,
      },
    },
  });

  return { isFavorited: favorite !== null };
}
