import { z } from "zod";

export const PublicUserSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  name: z.string().min(1, "Name is required"),
  avatar: z
    .string()
    .nullable()
    .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
      message: "Wrong format of an avatar string.",
    }),
  createdAt: z.string().datetime("Invalid date format"),
});

export type PublicUser = z.infer<typeof PublicUserSchema>;

export const AuthenticatedUserSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  name: z.string().min(1, "Name is required"),
  login: z.string().min(3, "Login must be at least 3 characters"),
  avatar: z
    .string()
    .nullable()
    .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
      message: "Wrong format of an avatar string.",
    }),
  createdAt: z.string().datetime("Invalid date format"),
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}
