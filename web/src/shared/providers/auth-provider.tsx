"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { fetchUserWithJWT } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { AuthenticatedUser } from "@/shared/models";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, authenticatedUser, setAuthenticatedUser, setToken, logout } =
    useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  console.log("[AuthProvider] Initial state:", {
    token,
    authenticatedUser,
    isInitialized,
  });

  // Инициализация из localStorage
  useEffect(() => {
    if (!isInitialized && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("auth-storage");
        console.log("[AuthProvider] Stored data:", stored);

        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("[AuthProvider] Parsed storage:", parsed);

          if (parsed?.state?.token) {
            console.log(
              "[AuthProvider] Found token in storage:",
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
      console.log("[AuthProvider] Fetching user data with token:", token);
      if (!token) return null;
      return fetchUserWithJWT(token);
    },
    enabled: !!token && isInitialized,
    retry: 1,
    staleTime: 0, // Всегда получаем свежие данные
  });

  useEffect(() => {
    if (!isInitialized) return;

    console.log("[AuthProvider] Effect triggered:", { data, error, token });

    if (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      logout();
      return;
    }

    if (data) {
      console.log("[AuthProvider] Setting user data:", data);
      setAuthenticatedUser(data);
    }
  }, [data, error, logout, setAuthenticatedUser, token, isInitialized]);

  // Показываем загрузку только при первичной загрузке
  if (!isInitialized || (isLoading && token)) {
    console.log("[AuthProvider] Loading state...");
    return null;
  }

  return <>{children}</>;
}
