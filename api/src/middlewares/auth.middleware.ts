import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, SocketError } from "../utils/errors";
import { Socket } from "socket.io";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return next(
      new AppError("Отказано в доступе: токен не был предоставлен", 401)
    );
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

export function authenticateJWTSocket(
  socket: Socket,
  next: (error?: Error) => void
) {
  try {
    // Try to get token from auth object first, then from headers
    const token =
      socket.handshake.auth.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new SocketError(
        "Отказано в доступе: токен не был предоставлен.",
        401
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    if (typeof decoded === "string" || !decoded.userId) {
      throw new SocketError("Отказано в доступе: повреждённый токен", 403);
    }

    socket.data.userId = decoded.userId;

    next();
  } catch (error) {
    next(
      error instanceof Error
        ? error
        : new SocketError("Ошибка аутентификации", 403)
    );
  }
}
