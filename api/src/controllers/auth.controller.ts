import { NextFunction, Request, Response } from "express";
import { getUserByLogin, generateToken } from "../services/user.service";
import bcrypt from "bcrypt";
import { AppError } from "../utils/errors";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body;

  try {
    if (!login || !password) {
      throw new AppError("Sent credentials are not sufficient!", 400);
    }

    const existentUser = await getUserByLogin(login);
    if (!existentUser) {
      throw new AppError("User is non-existent", 400);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existentUser.password
    );

    if (!isPasswordValid) {
      throw new AppError("Password is incorrect!", 401);
    }

    const token = await generateToken(existentUser.id);

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
