import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  getUserByLogin,
  createUser,
  getUserById,
} from "../services/user.service";
import { AppError } from "../utils/errors";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, name, password } = req.body;

    const existentUser = await getUserByLogin(login);
    if (existentUser) {
      throw new AppError("User already exists", 400);
    }

    const user = await createUser(login, name, password);
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
      throw new AppError("User not found", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
