import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/env.mjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string | Date,
  locale = "ru-RU"
): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}
export async function fetchWrapper<T>(endpoint: string): Promise<T> {
  const url = endpoint.startsWith("/")
    ? `${env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`
    : `${env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных с ${endpoint}`);
  }

  const data = await response.json();
  return data;
}
