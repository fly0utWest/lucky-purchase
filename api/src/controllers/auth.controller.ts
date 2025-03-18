import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../services/auth.service";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password } = req.body;
    const { token } = await authenticateUser({ login, password });
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
