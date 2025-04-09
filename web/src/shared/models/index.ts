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
  background: z
    .string()
    .nullable()
    .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
      message: "Неверный формат строки фона",
    }),
  createdAt: z.string().datetime("Неверный формат даты"),
});

export type PublicUser = z.infer<typeof PublicUserSchema>;

export const AuthenticatedUserSchema = PublicUserSchema.extend({
  login: z.string().min(3, "Логин должен содержать минимум 3 символа"),
  favorites: z.array(z.string().uuid("Неверный формат UUID")),
  items: z.array(z.string().uuid("Неверный формат UUID")),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Имя должно быть как минимум 1 символ в длину")
    .optional(),
  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .optional(),
});

export const UpdateUserFormSchema = z
  .object({
    name: z.string().optional(),
    password: z.string().optional(),
  })
  .refine(
    (data) => {
      // Если имя указано, оно должно быть не менее 1 символа
      if (data.name && data.name.length > 0) {
        return data.name.length >= 1;
      }
      return true;
    },
    {
      message: "Имя должно быть как минимум 1 символ в длину",
      path: ["name"],
    }
  )
  .refine(
    (data) => {
      // Если пароль указан, он должен быть не менее 6 символов
      if (data.password && data.password.length > 0) {
        return data.password.length >= 6;
      }
      return true;
    },
    {
      message: "Пароль должен содержать минимум 6 символов",
      path: ["password"],
    }
  );

export type UpdateUserValues = z.infer<typeof UpdateUserSchema>;
export type UpdateUserFormValues = z.infer<typeof UpdateUserFormSchema>;

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

const CategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  createdAt: z.string().datetime().optional(),
});

const CategoryResponseSchema = z.object({
  categories: z.array(CategorySchema),
  count: z.number().int().nonnegative(),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;

export const ItemCreationResponseSchema = z.object({
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
  categoryId: z.string().uuid("Неверный формат UUID"),
});

export type ItemCreationResponse = z.infer<typeof ItemCreationResponseSchema>;

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
  categoryId: z.string().uuid("Неверный формат UUID"),
  user: PublicUserSchema.optional(),
  category: CategorySchema.optional(),
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemsResponseSchema = z.object({
  items: z.array(ItemSchema),
  count: z.number().nonnegative("Длина не может быть отрицательным значением"),
});

export type ItemsResponse = z.infer<typeof ItemsResponseSchema>;

export const itemFormSchema = z.object({
  title: z.string().min(3, "Название должно быть не менее 3 символов"),
  description: z.string().min(10, "Описание должно быть не менее 10 символов"),
  price: z.coerce
    .number()
    .positive("Цена должна быть положительным числом")
    .max(999999999, "Цена не может быть больше 999 999 999"),
  categoryId: z
    .string()
    .uuid("Выберите категорию")
    .optional()
    .or(z.literal("")),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;
