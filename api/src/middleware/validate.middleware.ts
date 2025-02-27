import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema, type: "body" | "params" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = type === "body" ? req.body : req.params;
    const result = schema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({
        error: `Validation for request ${type} failed`,
        details: result.error.errors,
      });
    }

    next();
  };
}
