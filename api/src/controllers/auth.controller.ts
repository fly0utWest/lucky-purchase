import { NextFunction, Request, Response } from "express";
import { getUserByLogin, generateToken } from "../services/user.service";
import bcrypt from "bcrypt";
import { AppError } from "../utils/errors";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password } = req.body;

    const existentUser = await getUserByLogin(login);
    if (!existentUser) {
      throw new AppError("User does not exist", 400);
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
