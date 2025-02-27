import { z } from "zod";

export const LoginUserSchema = z.object({
  login: z.string().email("Login must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
