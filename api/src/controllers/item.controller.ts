import { NextFunction, Response } from "express";
import { createItem } from "../services/item.service";
import { AppError } from "../utils/errors";
import { AuthRequest } from "../middleware/auth.middleware";

export async function registerItem(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.userId) {
      throw new AppError("Доступ запрещен", 401);
    }

    const newItem = await createItem({ ...req.body, userId: req.userId });

    if (!newItem) {
      throw new AppError("Не удалось создать новое объявление", 400);
    }

    return res.status(201).json({ ...newItem });
  } catch (error) {
    next(error);
  }
}
