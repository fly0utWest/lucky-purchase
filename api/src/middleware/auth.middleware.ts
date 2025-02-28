import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errors";

export interface AuthRequest extends Request {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export function authenticateJWT(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return next(new AppError("Unauthorized: No token provided", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string };

    if (!decoded.userId) {
      return next(new AppError("Forbidden: Invalid token payload", 403));
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return next(new AppError("Forbidden: Invalid token", 403));
  }
}
