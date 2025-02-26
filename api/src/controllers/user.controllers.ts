import { Request, Response } from "express";
import { getUserByLogin } from "../services/user.service";
import { createUser } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  const existentUser = await getUserByLogin(login);

  if (existentUser) {
    res.status(400).json({ error: "User already exists" });
  }

  try {
    const user = await createUser(login, password);
    res
      .status(200)
      .json({ id: user.id, login: user.login, createdAt: user.createdAt });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
