"use client";
import { useEffect } from "react";

import { useAuthStore } from "@/store/authStore";
import { fetchUserWithJWT } from "@/lib/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, authenticatedUser, setAuthenticatedUser } = useAuthStore();

  useEffect(() => {
    async function conditionalUserFetch() {
      if (token && !authenticatedUser) {
        const fetchedUser = await fetchUserWithJWT(token);
        if (fetchedUser) setAuthenticatedUser(fetchedUser);
      }
    }
    conditionalUserFetch();
  }, [token, setAuthenticatedUser, authenticatedUser]);

  return <>{children}</>;
};
