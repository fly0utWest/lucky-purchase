import { Item } from "@prisma/client";
import { z } from "zod";

export const CreateItemSchema: z.ZodType<
  Pick<Item, "title" | "description" | "images" | "price">
> = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  images: z
    .array(z.string())
    .nonempty({ message: "Массив с фото не должен быть пуст" })
    .refine(
      (images) =>
        images.every((val) => /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val)),
      {
        message:
          "Каждое имя файла должно быть в верном формате (т.е, 'image.png').",
      }
    ),
});

export type CreateItemDTO = z.infer<typeof CreateItemSchema>;

export const GetItemsSchema = z.object({
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
