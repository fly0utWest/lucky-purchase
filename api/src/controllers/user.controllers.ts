import { Request, Response, NextFunction } from "express";
import {
  getUserByLogin,
  createUser,
  getUserById,
} from "../services/user.service";
import { AppError } from "../utils/errors";
import { getAuthenticatedUserById } from "../services/user.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, name, password } = req.body;

    const existentUser = await getUserByLogin(login);
    if (existentUser) {
      throw new AppError("Пользователь уже зарегистрирован", 400);
    }

    const user = await createUser({login, name, password});
    return res
      .status(201)
      .json({ id: user.id, login: user.login, createdAt: user.createdAt });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      throw new AppError("Пользователь не найден", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export async function getAuthedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!res.locals.userId) {
      throw new AppError("Доступ запрещен", 401);
    }

    const user = await getAuthenticatedUserById(res.locals.userId);
    if (!user) {
      throw new AppError("Пользователь не найден", 404);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}
