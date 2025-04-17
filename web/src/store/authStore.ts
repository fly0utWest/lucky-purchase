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
  addToItems: (itemId: string) => void;
  removeFromItems: (itemId: string) => void;
  hasItem: (itemId: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      authenticatedUser: null,
      setToken: (token) => {
        set({ token });
      },
      setAuthenticatedUser: (user) => {
        set({ authenticatedUser: user });
      },
      logout: () => {
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

      addToItems: (itemId) =>
        set((state) => ({
          authenticatedUser: state.authenticatedUser
            ? {
                ...state.authenticatedUser,
                items: [...(state.authenticatedUser.items || []), itemId],
              }
            : null,
        })),
      removeFromItems: (itemId) =>
        set((state) => {
          if (!state.authenticatedUser) return { authenticatedUser: null };

          const updatedUser = {
            ...state.authenticatedUser,
            items:
              state.authenticatedUser.items?.filter((id) => id !== itemId) ||
              [],
          };

          if (updatedUser.favorites?.includes(itemId)) {
            updatedUser.favorites = updatedUser.favorites.filter(
              (id) => id !== itemId
            );
          }

          return { authenticatedUser: updatedUser };
        }),
      hasItem: (itemId) => {
        const state = get();
        return state.authenticatedUser?.items?.includes(itemId) ?? false;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return {
            getItem: (name) => {
              const item = localStorage.getItem(name);
              return item;
            },
            setItem: (name, value) => {
              localStorage.setItem(name, value);
            },
            removeItem: (name) => {
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
        return persisted;
      },
    }
  )
);
