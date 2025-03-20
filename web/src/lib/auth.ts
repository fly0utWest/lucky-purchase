import { AuthenticatedUserSchema, AuthenticatedUser } from "@/shared/models";
import { env } from "@/env.mjs";

export const fetchUserWithJWT = async (
  token: string
): Promise<AuthenticatedUser> => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось получить пользователя с сервера");
  }

  const data = await response.json();
  const user = AuthenticatedUserSchema.safeParse(data);

  if (!user.success) {
    console.error("Ошибка валидации:", user.error.format());
    throw new Error("Ошибка во время парсинга данных.");
  }

  return user.data;
};
