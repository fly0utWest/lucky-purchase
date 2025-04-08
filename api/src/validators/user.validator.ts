import { z } from "zod";
import { User } from "@prisma/client";
import {
  fileNamePattern,
  invalidFileFormatMessage,
} from "../services/shared.validator";

export const RegisterUserSchema: z.ZodType<
  Pick<User, "login" | "password" | "name">
> = z.object({
  login: z.string().email("Неправильный формат эл.  почты"),
  password: z.string().min(6, "Пароль должен быть как минимум 6 символов"),
  name: z.string(),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export const UpdateUserDataSchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
});

export const UpdateUserAvatarSchema = z.object({
  avatar: z
    .string()
    .nullable()
    .refine((val) => !val || fileNamePattern.test(val), {
      message: invalidFileFormatMessage,
    }),
});

export const UpdateUserBackgroundSchema = z.object({
  background: z
    .string()
    .nullable()
    .refine((val) => !val || fileNamePattern.test(val), {
      message: invalidFileFormatMessage,
    }),
});

export const UpdateUserSchema = z.union([
  UpdateUserDataSchema,
  UpdateUserAvatarSchema,
  UpdateUserBackgroundSchema,
]);

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
