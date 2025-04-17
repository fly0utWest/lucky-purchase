import { z } from "zod";
import { fileNamePattern, invalidFileFormatMessage } from "./shared.validator";

export const CreateItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce
    .number()
    .positive("Цена должна быть положительным числом")
    .max(999999999, "Цена не может быть больше 999 999 999"),
  categoryId: z.string().uuid("Формат id неправилен"),
  images: z
    .array(z.string().regex(fileNamePattern, invalidFileFormatMessage))
    .min(1, "Добавьте хотя бы одно изображение"),
});

export type CreateItemDTO = z.infer<typeof CreateItemSchema>;

export const GetItemsSchema = z.object({
  userId: z.string().uuid("Неправильный формат id").optional(),
  limit: z
    .string()
    .optional()
    .default("10")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, {
      message: "Лимит должен быть положительным числом",
    }),

  skip: z
    .string()
    .optional()
    .default("0")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 0, {
      message: "Пропуск должен быть положительным числом",
    }),

  sort: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type GetItemsDTO = z.infer<typeof GetItemsSchema>;
