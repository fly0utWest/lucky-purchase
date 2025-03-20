import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { ZodError } from "zod";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    console.error(`[ОШИБКА]: ${err.statusCode}, ${err.message}`);
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof ZodError) {
    console.error(`[ОШИБКА]: 404, валидация не прошла успешно, ${err.errors}`);
    res
      .status(400)
      .json({ message: "Валидация не прошла успешно!", errors: err.errors });
    return;
  }

  console.error("Произошла неожиданная ошибка:", err);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
  return;
}
