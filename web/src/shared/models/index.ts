import { z } from "zod";

export const PublicUserSchema = z.object({
  id: z.string().uuid("Неверный формат UUID"),
  name: z.string().min(1, "Имя обязательно"),
  avatar: z
    .string()
    .nullable()
    .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
      message: "Неверный формат строки аватара",
    }),
  createdAt: z.string().datetime("Неверный формат даты"),
});

export type PublicUser = z.infer<typeof PublicUserSchema>;

export const AuthenticatedUserSchema = z.object({
  id: z.string().uuid("Неверный формат UUID"),
  name: z.string().min(1, "Имя обязательно"),
  login: z.string().min(3, "Логин должен содержать минимум 3 символа"),
  avatar: z
    .string()
    .nullable()
    .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
      message: "Неверный формат строки аватара",
    }),
  createdAt: z.string().datetime("Неверный формат даты"),
  favorites: z.array(z.string().uuid("Неверный формат UUID")),
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  createdAt: z.string().datetime(),
});

const CategoryResponseSchema = z.object({
  categories: z.array(CategorySchema),
  count: z.number().int().nonnegative(),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;

export const ItemSchema = z.object({
  id: z.string().uuid("Неверный формат UUID"),
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  images: z
    .array(
      z.string().refine((val) => /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
        message: "Неверный формат имени файла изображения",
      })
    )
    .nonempty("Необходимо добавить хотя бы одно изображение"),
  price: z
    .number()
    .int()
    .positive("Цена должна быть положительным целым числом"),
  createdAt: z.string().datetime("Неверный формат даты"),
  userId: z.string().uuid("Неверный формат UUID"),
  user: PublicUserSchema,
  category: CategorySchema,
});

export type Item = z.infer<typeof ItemSchema>;

export const itemFormSchema = z.object({
  title: z.string().min(3, "Название должно быть не менее 3 символов"),
  description: z.string().min(10, "Описание должно быть не менее 10 символов"),
  price: z.coerce.number().positive("Цена должна быть положительным числом"),
  categoryId: z
    .string()
    .uuid("Выберите категорию")
    .optional()
    .or(z.literal("")),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;
