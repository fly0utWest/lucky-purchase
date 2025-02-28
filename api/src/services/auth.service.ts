import jwt from "jsonwebtoken";
import { getUserByLogin } from "../services/user.service";
import bcrypt from "bcrypt";
import { AppError } from "../utils/errors";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30 days",
  });
}

export const authenticateUser = async (login: string, password: string) => {
  const user = await getUserByLogin(login);
  if (!user) {
    throw new AppError("Invalid login credentials", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid login credentials", 401);
  }

  const token = await generateToken(user.id);
  return { token };
};
