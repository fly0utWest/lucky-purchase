import { authenticateUser } from "../services/auth.service";
import asyncHandler from "../utils/asyncHandler";
import { LoginUserDTO } from "../validators/auth.validator";

export const loginUserHandler = asyncHandler(
  async (req, res) => {
    const { login, password }: LoginUserDTO = res.locals.validatedData;
    const token = await authenticateUser({ login, password });
    return res.status(200).json(token);
  }
);
