"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { AuthenticatedUserSchema, AuthenticatedUser } from "@/shared/models";
import { fetchWrapper } from "@/lib/utils";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, authenticatedUser, setAuthenticatedUser, setToken, logout } =
    useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("auth-storage");

        if (stored) {
          const parsed = JSON.parse(stored);

          if (parsed?.state?.token) {
            setToken(parsed.state.token);
          }
        }
      } catch (e) {
      }
      setIsInitialized(true);
    }
  }, [isInitialized, setToken]);

  const { data, error, isLoading } = useQuery<AuthenticatedUser | null, Error>({
    queryKey: ["user", token],
    queryFn: async () => {
      if (!token) return null;
      return fetchWrapper(
        `/user/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        AuthenticatedUserSchema
      );
    },
    enabled: !!token && isInitialized,
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    if (!isInitialized) return;


    if (error) {
      logout();
      return;
    }

    if (data) {
      setAuthenticatedUser(data);
    }
  }, [data, error, logout, setAuthenticatedUser, token, isInitialized]);

  if (!isInitialized || (isLoading && token)) {
    return null;
  }

  return <>{children}</>;
}
