import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiResponse, ErrorResponse } from "../types/responses";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) {
  if (err instanceof AppError) {
    console.error(`[ОШИБКА] ${err.statusCode}, ${err.message}`);
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof ZodError) {
    const errors = err.errors.map((err) => ({
      path: err.path.join("."),
      text: err.message,
    }));
    console.error(`[ОШИБКА] 400, валидация не прошла успешно, ${errors}`);
    return res
      .status(400)
      .json({ message: "Валидация не прошла успешно!", errors });
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
        return res
          .status(409)
          .json({ message: "Ресурс уже существует!", errors: err.meta });

      case "P2025":
        console.error(`[НЕ НАЙДЕНО] Ресурс не существует`);
        return res
          .status(404)
          .json({ message: "Ресурс не найден!", errors: err.meta });

      case "P2003":
        console.error(`[ОШИБКА FK] Поле ${err.meta?.field_name}`);
        return res
          .status(400)
          .json({ message: "Ошибка целостности данных!", errors: err.meta });

      default:
        console.error(`[ОШИБКА ВАЛИДАЦИИ] Код ${err.code}`);
        return res
          .status(400)
          .json({ message: "Валидация не прошла успешно!", errors: err.meta });
    }
  }

  console.error("Произошла неожиданная ошибка:", err);
  return res.status(500).json({ error: "Внутренняя ошибка сервера" });
}
