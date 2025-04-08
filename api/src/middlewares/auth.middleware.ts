import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errors";


const JWT_SECRET = process.env.JWT_SECRET as string;

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return next(new AppError("Отказано в доступе: токен не был предоставлен", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string };

    if (!decoded.userId) {
      return next(new AppError("Отказано в доступе: повреждённый токен", 403));
    }

    res.locals.userId = decoded.userId;
    next();
  } catch (error) {
    return next(new AppError("Отказано в доступе: повреждённый токен", 403));
  }
}
