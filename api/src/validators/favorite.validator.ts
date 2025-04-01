import { z } from "zod";

export const ToggleFavoriteSchema = z.object({
  itemId: z.string().uuid({
    message: "itemId должен быть действительным UUID",
  }),
  action: z.enum(["add", "remove"], {
    message:
      "Действие не было правильно установлено. Допустимые значения: 'add' или 'remove'",
  }),
});

export type ToggleFavoriteDTO = z.infer<typeof ToggleFavoriteSchema>;
