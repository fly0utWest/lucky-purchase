import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/shared/providers/toast-provider";
import { useAuthStore } from "@/store/authStore";
import { fetchWrapper } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { debounce } from "lodash";

interface ToggleFavoriteResponse {
  userId: string;
  itemId: string;
  createdAt: Date;
  action: "add" | "remove";
}

export function useFavorite() {
  const { toast } = useToast();
  const {
    authenticatedUser,
    token,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: async (itemId: string) => {
      if (!authenticatedUser || !token) {
        throw new Error("Пользователь не авторизован");
      }
      const action = isFavorite(itemId) ? "remove" : "add";
      return fetchWrapper<ToggleFavoriteResponse>(
        `/favorite/toggle?itemId=${itemId}&action=${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data, itemId) => {
      if (data.action === "add") {
        addToFavorites(itemId);
      } else {
        removeFromFavorites(itemId);
      }
      toast({
        title: "Успешно",
        description:
          data.action === "add"
            ? "Товар добавлен в избранное"
            : "Товар удален из избранного",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Произошла ошибка",
        variant: "destructive",
      });
    },
  });

  const debouncedMutate = useMemo(() => debounce(mutate, 500), [mutate]);

  const toggleFavorite = useCallback(
    (itemId: string) => {
      if (!authenticatedUser) {
        toast({
          variant: "destructive",
          title: "Требуется авторизация",
          description:
            "Пожалуйста, войдите в систему, чтобы добавить товар в избранное",
        });
        return;
      }

      debouncedMutate(itemId);
    },
    [authenticatedUser, debouncedMutate]
  );
  return {
    toggleFavorite,
    isFavorite,
  };
}
