import { Request, Response } from "express";
import {
  getUserByLogin,
  createUser,
  getUserById,
} from "../services/user.service";
import { AppError } from "../utils/errors";
import { getAuthenticatedUserById } from "../services/user.service";
import asyncHandler from "../utils/asyncHandler";

export const registerUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { login, name, password } = res.locals.validatedData;

    const existentUser = await getUserByLogin(login);
    if (existentUser) {
      throw new AppError("Пользователь уже зарегистрирован", 400);
    }

    const user = await createUser({ login, name, password });
    console.log(`[УСПЕХ] пользователь ${login} зарегистрирован`);
    return res
      .status(201)
      .json({ id: user.id, login: user.login, createdAt: user.createdAt });
  }
);

export const getUserByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = res.locals.validatedData;
    const user = await getUserById(id);

    if (!user) {
      throw new AppError("Пользователь не найден", 404);
    }

    console.log(`[УСПЕХ] Пользователь по id ${user.id} запрошен`);
    return res.status(200).json(user);
  }
);

export const getAuthedUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getAuthenticatedUserById(res.locals.userId);
    if (!user) {
      throw new AppError("Пользователь не найден", 404);
    }
    console.log(
      `[УСПЕХ] Данные авторизованного пользователя ${user.login} запрошены`
    );
    res.json(user);
  }
);
