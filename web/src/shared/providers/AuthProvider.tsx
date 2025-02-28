"use client";
import { useEffect } from "react";

import { useAuthStore } from "@/store/authStore";
import { fetchUserWithJWT } from "@/lib/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, user, setUser } = useAuthStore();

  useEffect(() => {
    async function conditionalUserFetch() {
      if (token && !user) {
        const fetchedUser = await fetchUserWithJWT(token);
        setUser(fetchedUser);
      }
    }
    conditionalUserFetch();
  }, [token, setUser, user]);

  return <>{children}</>;
};
