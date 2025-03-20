import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../services/auth.service";
import asyncHandler from "../utils/asyncHandler";

export const loginUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const { login, password } = res.locals.validatedData;
  const { token } = await authenticateUser({ login, password });
  console.log(`[УСПЕХ]: пользователь ${login} авторизовался`)
  return res.status(200).json({ token });
});
