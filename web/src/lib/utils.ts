import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/env.mjs";
import { PublicUser } from "@/shared/models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchPublicUser = async (
  id: string
): Promise<PublicUser | null> => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`, {
      method: "GET", // Usually, fetching public user data should be a GET request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Ошибка: ${response.status} ${response.statusText}`);
      return null;
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Ошибка при запросе пользователя:", error);
    return null;
  }
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}
