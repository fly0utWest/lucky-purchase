import asyncHandler from "../utils/asyncHandler";
import { Response, Request } from "express";
import {
  toggleFavorite,
  getUserFavorites,
  isItemFavorited,
} from "../services/favorite.service";
import { ToggleFavoriteDTO } from "../validators/favorite.validator";

export const toggleFavoriteHandler = asyncHandler(async (req, res) => {
  const { userId } = res.locals;
  const { itemId, action }: ToggleFavoriteDTO = res.locals.validatedData;
  let item = await toggleFavorite(userId, itemId, action);

  return res.status(action === "add" ? 201 : 200).json(item);
});

export const getFavoritesListHandler = asyncHandler(async (req, res) => {
  const { userId } = res.locals;

  const userFavoritesList = await getUserFavorites(userId);

  return res.status(200).json(userFavoritesList);
});

export const checkFavoriteStatusHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const { itemId } = req.query;

    const isFavorited = await isItemFavorited(userId, itemId as string);

    return res.status(200).json(isFavorited);
  }
);
