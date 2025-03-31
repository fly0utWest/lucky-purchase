import { z } from "zod";
import { Favorite } from "@prisma/client";

export const AddRemoveFavoriteSchema: z.ZodType<Pick<Favorite, "itemId">> =
  z.object({
    itemId: z.string().uuid({
      message: "itemId должен быть действительным UUID",
    }),
    action: z.enum(["add", "remove"], {
      message:
        "Действие не было правильно установлено. Допустимые значения: 'add' или 'remove'",
    }),
  });

export type AddFavoriteDTO = z.infer<typeof AddRemoveFavoriteSchema>;
