import { Request, Response } from "express";
import { createItem, getItems } from "../services/item.service";
import { AppError } from "../utils/errors";
import asyncHandler from "../utils/asyncHandler";

export const registerItemHandler = asyncHandler(
  async (req: Request, res: Response) => {
    if (!res.locals.userId) {
      throw new AppError("Доступ запрещен", 401);
    }

    const newItem = await createItem({
      ...res.locals.validatedData,
      userId: res.locals.userId,
    });

    console.log(
      `[УСПЕХ]: Объявление добавлено пользователем с id ${res.locals.userId}`
    );
    res.status(201).json({ ...newItem });
  }
);

export const getItemsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      limit = "10",
      skip = "0",
      sort = "desc",
    } = res.locals.validatedData;
    const items = await getItems({ limit, skip, sort });

    console.log(`[УСПЕХ]: было запрошено ${items.length} объявлений`);
    res.status(200).json({ items, count: items.length });
  }
);
