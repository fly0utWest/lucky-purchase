"use client";

import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserWithJWT } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token, setAuthenticatedUser } = useAuthStore();

  const {
    data: user,
  } = useQuery({
    queryKey: ["authenticatedUser", token],
    queryFn: () => fetchUserWithJWT(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (user) {
      setAuthenticatedUser(user);
    }
  }, [user, setAuthenticatedUser]);

  return <>{children}</>;
};
