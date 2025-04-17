import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { ApiResponse } from "../types/responses";

export function validate(
  schema: ZodSchema,
  type: "body" | "params" | "userId" | "query" = "body"
) {
  return (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    let data;

    switch (type) {
      case "body":
        data = req.body;
        break;
      case "params":
        data = req.params;
        break;
      case "query":
        data = req.query;
        break;
      default:
        return res.status(400).json({ error: "Недопустимый тип валидации" });
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      return next(new ZodError(result.error.errors));
    }

    res.locals.validatedData = result.data;
    next();
  };
}
