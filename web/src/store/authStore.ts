import { AuthenticatedUser } from "@/shared/models";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  authenticatedUser: AuthenticatedUser | null;
  setToken: (token: string) => void;
  setAuthenticatedUser: (user: AuthenticatedUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window === "undefined" ? null : localStorage.getItem("jwtToken"),
  authenticatedUser: null,
  setToken: (token) => {
    localStorage.setItem("jwtToken", token);
    set({ token });
  },
  setAuthenticatedUser: (user) => {
    set({ authenticatedUser: user });
  },
  logout: () => {
    localStorage.removeItem("jwtToken");
    set({ token: null, authenticatedUser: null });
  },
}));
