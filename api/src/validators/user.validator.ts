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

export const UserByIdSchema: z.ZodType<Pick<User, "id">> = z.object({
  id: z.string().uuid("Неправильный формат id"),
});
