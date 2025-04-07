import { z } from "zod";
import { User } from "@prisma/client";

export const RegisterUserSchema: z.ZodType<
  Pick<User, "login" | "password" | "name">
> = z.object({
  login: z.string().email("Неправильный формат эл.  почты"),
  password: z.string().min(6, "Пароль должен быть как минимум 6 символов"),
  name: z.string(),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export const UpdateUserDataSchema: z.ZodType<
  Partial<Pick<User, "name" | "password">>
> = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
});

export const UpdateUserAvatarSchema: z.ZodType<Pick<User, "avatar">> = z.object(
  {
    avatar: z
      .string()
      .nullable()
      .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
        message: "Неверный формат имени файла фонового изображения",
      }),
  }
);

export const UpdateUserBackgroudSchema: z.ZodType<Pick<User, "background">> =
  z.object({
    background: z
      .string()
      .nullable()
      .refine((val) => !val || /^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(val), {
        message: "Неверный формат имени файла фонового изображения",
      }),
  });

export type UpdateUserDataDTO = z.infer<typeof UpdateUserDataSchema>;
export type UpdateUserBackgroundDTO = z.infer<typeof UpdateUserBackgroudSchema>;
export type UpdateUserAvatarDTO = z.infer<typeof UpdateUserAvatarSchema>;
