import { z } from "zod";
import { User } from "@prisma/client";

export const RegisterUserSchema: z.ZodType<
  Pick<User, "login" | "password" | "name">
> = z.object({
  login: z.string().email("Неправильный формат эл.  почты"),
  password: z.string().min(6, "Пароль должен быть как минимум 6 символов"),
  name: z.string(),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export const UpdateUserSchema: z.ZodType<
  Partial<Pick<User, "name" | "avatar" | "background" | "password">>
> = z.object({
  name: z.string().optional(),
  avatar: z.string()
  .nullable()
  .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
    message: "Неверный формат имени файла фонового изображения",
  })
  .optional(),
  background: z
  .string()
  .nullable()
  .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
    message: "Неверный формат имени файла фонового изображения",
  })
  .optional(),
  password: z.string().optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;