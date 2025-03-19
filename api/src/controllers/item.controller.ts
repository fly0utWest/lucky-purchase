import { NextFunction, Request, Response } from "express";
import { createItem } from "../services/item.service";
import { AppError } from "../utils/errors";
import { getItems } from "../services/item.service";

export async function registerItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!res.locals.userId) {
      throw new AppError("Доступ запрещен", 401);
    }

    const newItem = await createItem({
      ...req.body,
      userId: res.locals.userId,
    });

    console.log(
      `[УСПЕХ]: Объявление добавлено пользователем с id ${res.locals.userId}`
    );
    return res.status(201).json({ ...newItem });
  } catch (error) {
    next(error);
  }
}

export async function getItemsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { limit, skip, sort } = res.locals.validatedData as {
      limit: number;
      skip: number;
      sort: "asc" | "desc";
    };

    const items = await getItems(limit, skip, sort);

    return res.status(200).json({ items, count: items.length });
  } catch (error) {
    next(error);
  }
}
