import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/errors";
import { LoginUserDTO } from "../validators/auth.validator";
import { AuthResponse } from "../types/responses";
import { prisma } from "../../config/db";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function generateToken(userId: string): Promise<string> {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30 days",
  });
}

export const authenticateUser = async ({
  login,
  password,
}: LoginUserDTO): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({ where: { login } });

  if (!user) {
    throw new AppError("Неправильные данные для входа", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Неправильные данные для входа", 401);
  }

  const token = await generateToken(user.id);
  console.log(`[УСПЕХ] пользователь ${login} авторизовался`);
  return { token };
};
