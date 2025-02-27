import { Request, Response, NextFunction } from "express";

export function notFoundHandler(
  req: Request,
  res: Response,
) {
  res.status(404).json({ error: "Route not found" });
}
