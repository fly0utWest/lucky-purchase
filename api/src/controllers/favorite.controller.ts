import asyncHandler from "../utils/asyncHandler";
import { Response, Request } from "express";
import { addToFavorites } from "../services/favorite.service";
import { removeFromFavorites } from "../services/favorite.service";
import { ToggleFavoriteDTO } from "../validators/favorite.validator";
import { getUserFavorites } from "../services/favorite.service";

export const toggleFavoriteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const { itemId, action }: ToggleFavoriteDTO = res.locals.validatedData;
    let resItem;

    if (action === "add") {
      resItem = await addToFavorites(userId, itemId);
    } else if (action === "remove") {
      resItem = await removeFromFavorites(userId, itemId);
    }

    console.log(
      `[УСПЕХ]: Пользователь с id ${userId} ${action === "add" ? "добавил" : "удалил"} товар с id ${itemId} ${action === "add" ? "в" : "из"} избранное${action === "add" ? "" : "го"}`
    );
    res.status(action === "add" ? 201 : 200).json({ ...resItem, action });
  }
);

export const getFavoriteList = asyncHandler(
  async (req: Request, res, Response) => {
    const { userId } = res.locals;

    const userFavoritesList = await getUserFavorites(userId);

    console.log(
      `[УСПЕХ]: Спсисок изюранных обхявлений пользователя ${userId} был запрошен.`
    );

    res.status(200).json({ userFavoritesList });
  }
);
