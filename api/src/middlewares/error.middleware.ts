import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiResponse } from "../types/responses";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    console.error(`[ОШИБКА] ${err.statusCode}, ${err.message}`);
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  if (err instanceof ZodError) {
    const errors = err.errors.map((err) => ({
      path: err.path.join("."),
      text: err.message,
    }));
    console.error(`[ОШИБКА] 400, валидация не прошла успешно, ${errors}`);
    res.status(400).json({ message: "Валидация не прошла успешно!", errors });
    return;
  }
  if (err instanceof PrismaClientKnownRequestError) {
    console.error(
      `[ОШИБКА ПРИЗМЫ ${err.code}] ${err.message}, Мета: ${JSON.stringify(err.meta)}`
    );
    switch (err.code) {
      case "P2002":
        console.error(
          `[КОНФЛИКТ] Дубликат для ${Array.isArray(err.meta?.target) ? err.meta.target.join(", ") : err.meta?.target}`
        );
        res
          .status(409)
          .json({ message: "Ресурс уже существует!", errors: err.meta });
        return;
      case "P2025":
        console.error(`[НЕ НАЙДЕНО] Ресурс не существует`);
        res
          .status(404)
          .json({ message: "Ресурс не найден!", errors: err.meta });
        return;
      case "P2003":
        console.error(`[ОШИБКА FK] Поле ${err.meta?.field_name}`);
        res
          .status(400)
          .json({ message: "Ошибка целостности данных!", errors: err.meta });
        return;
      default:
        console.error(`[ОШИБКА ВАЛИДАЦИИ] Код ${err.code}`);
        res
          .status(400)
          .json({ message: "Валидация не прошла успешно!", errors: err.meta });
        return;
    }
  }
  console.error("Произошла неожиданная ошибка:", err);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
};
