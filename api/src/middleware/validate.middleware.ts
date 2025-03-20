import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export function validate(
  schema: ZodSchema,
  type: "body" | "params" | "userId" | "query" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
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
      case "userId":
        data = { id: res.locals.userId };
        break;
      default:
        return res.status(400).json({ error: "Недопустимый тип валидации" });
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      return next(new ZodError(result.error.errors));
    }

    res.locals.validatedData = data;
    next();
  };
}
