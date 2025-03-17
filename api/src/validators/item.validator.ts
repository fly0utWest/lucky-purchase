import { z } from "zod";

export const CreateItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  userId: z.string().uuid(),
});

export type CreateItemDTO = z.infer<typeof CreateItemSchema>;