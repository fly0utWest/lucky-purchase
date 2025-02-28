import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: { id: string; login: string; name?: string } | null;
  setToken: (token: string) => void;
  setUser: (user: { id: string; login: string; name?: string }) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: typeof window === undefined ? null : localStorage.getItem("jwtToken"),
  user: null,
  setToken: (token) => {
    localStorage.setItem("jwtToken", token);
    set({ token });
  },
  setUser: (user) => {
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("jwtToken");
    set({ token: null, user: null });
  },
}));
