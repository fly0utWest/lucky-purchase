"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { AuthenticatedUser } from "@/shared/models";
import { fetchWrapper } from "@/lib/utils";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, authenticatedUser, setAuthenticatedUser, setToken, logout } =
    useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  console.log("[AuthProvider] Начальное состояние: ", {
    token,
    authenticatedUser,
    isInitialized,
  });

  // Инициализация из localStorage
  useEffect(() => {
    if (!isInitialized && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("auth-storage");
        console.log("[AuthProvider] Сохраненное состояние: ", stored);

        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("[AuthProvider] Считанное состояние: ", parsed);

          if (parsed?.state?.token) {
            console.log(
              "[AuthProvider] Токен найден в localstorage:",
              parsed.state.token
            );
            setToken(parsed.state.token);
          }
        }
      } catch (e) {
        console.error("Ошибка при чтении данных из localStorage:", e);
      }
      setIsInitialized(true);
    }
  }, [isInitialized, setToken]);

  const { data, error, isLoading } = useQuery<AuthenticatedUser | null, Error>({
    queryKey: ["user", token],
    queryFn: async () => {
      console.log("[AuthProvider] Получаем пользователя с токеном: ", token);
      if (!token) return null;
      return fetchWrapper(`/user/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    enabled: !!token && isInitialized,
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    if (!isInitialized) return;

    console.log("[AuthProvider] Эффект триггернуло: ", { data, error, token });

    if (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      logout();
      return;
    }

    if (data) {
      console.log("[AuthProvider] Сохраняем пользователя: ", data);
      setAuthenticatedUser(data);
    }
  }, [data, error, logout, setAuthenticatedUser, token, isInitialized]);

  if (!isInitialized || (isLoading && token)) {
    console.log("[AuthProvider] Загружаем стейт...");
    return null;
  }

  return <>{children}</>;
}
