import { NextFunction, Request, Response } from "express";
import { createItem } from "../services/item.service";
import { AppError } from "../utils/errors";

export async function registerItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newItem = await createItem(req.body);

    if (!newItem) {
      throw new AppError("Не удалось создать новое объявление", 400);
    }

    return res.status(201).json({ ...newItem });
  } catch (error) {
    next(error);
  }
}
