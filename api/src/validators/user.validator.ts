import { z } from "zod";
import { User } from "@prisma/client";
import { fileNamePattern, invalidFileFormatMessage } from "./shared.validator";

export const RegisterUserSchema: z.ZodType<
  Pick<User, "login" | "password" | "name">
> = z.object({
  login: z.string().email("Неправильный формат эл.  почты"),
  password: z.string().min(6, "Пароль должен быть как минимум 6 символов"),
  name: z.string(),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export const UpdateUserDataSchema = z
  .object({
    name: z
      .string()
      .min(1, "Имя должно быть как минимум 1 символ в длину")
      .optional(),
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).length > 0;
    },
    {
      message: "Должно быть указано хотя бы одно поле для обновления",
    }
  );

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
