import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/shared/providers/toast-provider";
import { useAuthStore } from "@/store/authStore";
import { fetchWrapper } from "@/lib/utils";
import { useCallback } from "react";
import { debounce } from "@/lib/utils";
import { ItemCreationResponse, ItemFormValues, ItemSchema } from "@/shared/models";

interface CreateItemWithImagesData extends ItemFormValues {
  images: string[];
}

export function useItems() {
  const { toast } = useToast();
  const { authenticatedUser, token, addToItems, removeFromItems, hasItem } =
    useAuthStore();

  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: async (itemId: string) => {
      if (!authenticatedUser || !token) {
        throw new Error("Пользователь не авторизован");
      }
      return fetchWrapper(`/item/delete/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (_, itemId) => {
      removeFromItems(itemId);
      toast({
        title: "Успешно",
        description: "Товар удален",
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

  // Create item mutation - now accepts images
  const { mutate: createItemMutation, isPending: isCreating } = useMutation({
    mutationFn: async (itemData: CreateItemWithImagesData) => {
      if (!authenticatedUser || !token) {
        throw new Error("Пользователь не авторизован");
      }
      return fetchWrapper<ItemCreationResponse>(`/item/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      }, ItemSchema);
    },
    onSuccess: (data) => {
      addToItems(data.id);
      toast({
        title: "Успешно",
        description: "Товар успешно создан",
        variant: "default",
      });
      return data;
    },
    onError: (error) => {
      toast({
        title: "Ошибка при создании товара",
        description:
          error instanceof Error ? error.message : "Произошла ошибка",
        variant: "destructive",
      });
    },
  });

  const createItem = async (itemData: CreateItemWithImagesData) => {
    if (!authenticatedUser || !token) {
      throw new Error("Пользователь не авторизован");
    }
    return createItemMutation(itemData);
  };

  const handleDeleteItem = useCallback(
    debounce((itemId: string) => {
      if (!authenticatedUser) {
        toast({
          variant: "destructive",
          title: "Требуется авторизация",
          description: "Пожалуйста, войдите в систему, чтобы удалить товар",
        });
        return;
      }
      if (!hasItem(itemId)) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Вы не можете удалить этот товар",
        });
        return;
      }
      deleteItem(itemId);
    }, 300),
    [authenticatedUser, deleteItem, hasItem, toast]
  );

  return {
    createItem,
    deleteItem: handleDeleteItem,
    isCreating,
    isDeleting,
    isUserItem: hasItem,
  };
}
