import { AuthenticatedUser } from "@/shared/models";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  authenticatedUser: AuthenticatedUser | null;
  setToken: (token: string) => void;
  setAuthenticatedUser: (user: AuthenticatedUser) => void;
  logout: () => void;
  addToFavorites: (itemId: string) => void;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      authenticatedUser: null,
      setToken: (token) => {
        console.log("[AuthStore] Присваеваем токенг:", token);
        set({ token });
      },
      setAuthenticatedUser: (user) => {
        console.log("[AuthStore] Присваиваем пользователя:", user);
        set({ authenticatedUser: user });
      },
      logout: () => {
        console.log("[AuthStore] Выход из системы");
        set({ token: null, authenticatedUser: null });
      },
      addToFavorites: (itemId) =>
        set((state) => ({
          authenticatedUser: state.authenticatedUser
            ? {
                ...state.authenticatedUser,
                favorites: [
                  ...(state.authenticatedUser.favorites || []),
                  itemId,
                ],
              }
            : null,
        })),
      removeFromFavorites: (itemId) =>
        set((state) => ({
          authenticatedUser: state.authenticatedUser
            ? {
                ...state.authenticatedUser,
                favorites:
                  state.authenticatedUser.favorites?.filter(
                    (id) => id !== itemId
                  ) || [],
              }
            : null,
        })),
      isFavorite: (itemId) => {
        const state = get();
        return state.authenticatedUser?.favorites?.includes(itemId) ?? false;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return {
            getItem: (name) => {
              const item = localStorage.getItem(name);
              console.log("[AuthStore] Достаем из localstorage: ", {
                name,
                value: item,
              });
              return item;
            },
            setItem: (name, value) => {
              console.log("[AuthStore] Присваиваем в localstorage:", { name, value });
              localStorage.setItem(name, value);
            },
            removeItem: (name) => {
              console.log("[AuthStore] Удаляем из localstorage:", name);
              localStorage.removeItem(name);
            },
          };
        }
        return {
          getItem: () => Promise.resolve(null),
          setItem: () => Promise.resolve(),
          removeItem: () => Promise.resolve(),
        };
      }),
      skipHydration: true,
      partialize: (state) => {
        const persisted = {
          token: state.token,
          authenticatedUser: state.authenticatedUser,
        };
        console.log("[AuthStore] Сохраненное состояние:", persisted);
        return persisted;
      },
    }
  )
);
