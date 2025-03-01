import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(
  schema: ZodSchema,
  type: "body" | "params" | "userId" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    let data;

    if (type === "body") {
      data = req.body;
    } else if (type === "params") {
      data = req.params;
    } else if (type === "userId") {
      data = { id: (req as any).userId };
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      return res.status(400).json({
        error: `Запрос с типом ${type} повреждён`,
        details: result.error.errors,
      });
    }

    next();
  };
}
