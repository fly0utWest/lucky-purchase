import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/shared/providers/toast-provider";
import { useAuthStore } from "@/store/authStore";
import { fetchWrapper } from "@/lib/utils";

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

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async (itemId: string) => {
      if (!authenticatedUser || !token) {
        throw new Error("User not authenticated");
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

  return {
    toggleFavorite,
    isFavorite,
  };
}
