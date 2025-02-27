import { z } from "zod";

export const RegisterUserSchema = z.object({
  login: z.string().email("Login is not an email!"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string(),
});

export const userIdSchema = z.object({
  id: z.string().uuid("Id is invalid")
})