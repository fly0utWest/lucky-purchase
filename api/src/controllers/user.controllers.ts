import {
  getUserByLogin,
  createUser,
  getUserById,
  updateUserById,
} from "../services/user.service";
import { AppError } from "../utils/errors";
import { getAuthenticatedUserById } from "../services/user.service";
import asyncHandler from "../utils/asyncHandler";

export const registerUserHandler = asyncHandler(
  async (req, res) => {
    const { login, name, password } = res.locals.validatedData;


    const result = await createUser({ login, name, password });
    return res
      .status(201)
      .json(result);
  }
);

export const getUserByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = res.locals.validatedData;
    const user = await getUserById(id);

    if (!user) {
      throw new AppError("Пользователь не найден", 404);
    }

    console.log(`[УСПЕХ] Пользователь по id ${user.id} запрошен`);
    return res.status(200).json(user);
  }
);

export const getAuthedUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getAuthenticatedUserById(res.locals.userId);
    if (!user) {
      throw new AppError("Пользователь не найден", 404);
    }
    console.log(
      `[УСПЕХ] Данные авторизованного пользователя ${user.login} запрошены`
    );
    res.json(user);
  }
);

export const updateUserByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = res.locals;
    const { validatedData } = res.locals;

    const updatedUser = await updateUserById(userId, validatedData);
    if (!updatedUser) {
      throw new AppError("Пользователь не найден", 404);
    }
    console.log(`[УСПЕХ] Пользователь ${updatedUser.login} обновлен`);
    return res.status(200).json(updatedUser);
  }
);
