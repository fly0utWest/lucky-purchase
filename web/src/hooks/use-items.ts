import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/shared/providers/toast-provider";
import { useAuthStore } from "@/store/authStore";
import { fetchWrapper } from "@/lib/utils";
import { useCallback } from "react";
import { debounce } from "@/lib/utils";
import {
  ItemCreationResponse,
  ItemFormValues,
  ItemSchema,
} from "@/shared/models";

export function useItems() {
  const { toast } = useToast();
  const { authenticatedUser, token, addToItems, removeFromItems, hasItem } =
    useAuthStore();

  // Delete item mutation remains the same
  const {
    mutate: deleteItemMutation,
    mutateAsync: deleteItemAsync,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: async (itemId: string) => {
      if (!authenticatedUser || !token) {
        throw new Error("Пользователь не авторизован");
      }
      const response = await fetchWrapper(`/item/delete/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Возвращаем itemId для onSuccess
      return itemId;
    },
    onSuccess: (itemId) => {
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
          error instanceof Error ? error.message : "Не удалось удалить объявление",
        variant: "destructive",
      });
    },
  });

  const deleteItem = async (itemId: string) => {
    if (!authenticatedUser || !token) {
      throw new Error("Пользователь не авторизован");
    }
    return deleteItemAsync(itemId);
  };

  const {
    mutate: createItemMutation,
    mutateAsync: createItemAsync,
    isPending: isCreating,
  } = useMutation<ItemCreationResponse, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      if (!authenticatedUser || !token) {
        throw new Error("Пользователь не авторизован");
      }

      return fetchWrapper<ItemCreationResponse>("/item/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    },
    onSuccess: (data) => {
      addToItems(data.id);
      toast({
        title: "Успешно",
        description: "Товар успешно создан",
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

  const createItem = async (
    formData: FormData
  ): Promise<ItemCreationResponse> => {
    if (!authenticatedUser || !token) {
      throw new Error("Пользователь не авторизован");
    }
    return createItemAsync(formData);
  };

  // Delete item handler with debounce remains the same
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

  // Return functions and state flags
  return {
    createItem,
    deleteItem,
    isCreating,
    isDeleting,
    isUserItem: hasItem,
  };
}
