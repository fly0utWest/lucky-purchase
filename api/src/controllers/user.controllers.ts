import { Request, Response, NextFunction, RequestHandler } from "express";
import { getUserByLogin, createUser } from "../services/user.service";
import { AppError } from "../utils/errors";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password } = req.body;

    const existentUser = await getUserByLogin(login);
    if (existentUser) {
      throw new AppError("User already exists", 400);
    }

    const user = await createUser(login, password);
    return res
      .status(201)
      .json({ id: user.id, login: user.login, createdAt: user.createdAt });
  } catch (error) {
    next(error);
  }
};
