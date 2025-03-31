import asyncHandler from "../utils/asyncHandler";
import { Response, Request } from "express";
import { addToFavorites } from "../services/favorite.service";
import { removeFromFavorites } from "../services/favorite.service";

export const toggleFavoriteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const { itemId, action } = res.locals.validatedData;
    let resItem;

    if (action === "add") {
      resItem = await addToFavorites(userId, itemId);
    } else if (action === "remove") {
      resItem = await removeFromFavorites(userId, itemId);
    }

    console.log(
      `[УСПЕХ]: Пользователь с id ${userId} добавил товар с id ${itemId} в избранное`
    );
    res.status(201).json({ ...resItem, action });
  }
);
