import z from "zod";

export const UUIDSchema = z.object({
  id: z.string().uuid("Неправильный формат id"),
});

export type UUIDDTO = z.infer<typeof UUIDSchema>;

export const fileNamePattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/;
export const invalidFileFormatMessage =
  "Неправильный формат файла - должно быть file.extension";
