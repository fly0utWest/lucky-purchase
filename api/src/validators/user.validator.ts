import { z } from "zod";

export const RegisterUserSchema = z.object({
  login: z.string().email("Адрес эл. почты в неправильном формате"),
  password: z.string().min(6, "Пароль должен быть как минимум 6 символов"),
  name: z.string(),
});

export const UserByIdSchema = z.object({
  id: z.string().uuid("Неправильный формат id"),
});
