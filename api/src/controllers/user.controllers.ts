import {
  createUser,
  getUserById,
  updateUserById,
} from "../services/user.service";
import { getAuthenticatedUserById } from "../services/user.service";
import asyncHandler from "../utils/asyncHandler";

export const registerUserHandler = asyncHandler(async (req, res) => {
  const { login, name, password } = res.locals.validatedData;

  const result = await createUser({ login, name, password });
  return res.status(201).json(result);
});

export const getUserByIdHandler = asyncHandler(async (req, res) => {
  const { id } = res.locals.validatedData;
  const user = await getUserById(id);

  return res.status(200).json(user);
});

export const getAuthedUserHandler = asyncHandler(async (req, res) => {
  const user = await getAuthenticatedUserById(res.locals.userId);
  res.json(user);
});

export const updateUserByIdHandler = asyncHandler(async (req, res) => {
  const { userId } = res.locals;
  const { validatedData } = res.locals;

  const updatedUser = await updateUserById(userId, validatedData);
  return res.status(200).json(updatedUser);
});
