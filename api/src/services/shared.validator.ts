import z from "zod";

export const UUIDSchema = z.object({
  id: z.string().uuid("Неправильный формат id"),
});

export type UUIDDTO = z.infer<typeof UUIDSchema>;
