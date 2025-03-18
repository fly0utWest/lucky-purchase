import { z } from "zod";
import { User } from "@prisma/client";

export const LoginUserSchema: z.ZodType<Pick<User, "login" | "password">> =
  z.object({
    login: z.string().email("Адрес эл. почты в неправильном формате"),
    password: z.string().min(6, "Пароль должен быть как минимум 6 символов"),
  });

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;
