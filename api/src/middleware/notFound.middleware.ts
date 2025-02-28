import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(new AppError("Route was not found", 404));
}
