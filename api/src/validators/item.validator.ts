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
