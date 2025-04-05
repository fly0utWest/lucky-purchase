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

// Updated interface to handle File objects for images
interface CreateItemData extends Omit<ItemFormValues, "images"> {
  images: File[];
}

export function useItems() {
  const { toast } = useToast();
  const { authenticatedUser, token, addToItems, removeFromItems, hasItem } =
    useAuthStore();

  // Delete item mutation remains the same
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

  // Using destructuring to get both mutate and mutateAsync
  const {
    mutate: createItemMutation,
    mutateAsync: createItemAsync,
    isPending: isCreating,
  } = useMutation({
    mutationFn: async (itemData: CreateItemData) => {
      if (!authenticatedUser || !token) {
        throw new Error("Пользователь не авторизован");
      }

      // Create FormData object to handle both files and text fields
      const formData = new FormData();

      // Add all text fields to FormData
      Object.entries(itemData).forEach(([key, value]) => {
        if (key !== "images") {
          // Handle arrays and objects by stringify them
          if (
            typeof value === "object" &&
            value !== null &&
            !(value instanceof File)
          ) {
            formData.append(key, JSON.stringify(value));
          } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }
      });

      // Add images to FormData
      if (itemData.images && itemData.images.length > 0) {
        itemData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      return fetchWrapper<ItemCreationResponse>(
        `/item/create`,
        {
          method: "POST",
          headers: {
            // Don't set Content-Type header - browser will set it with correct boundary
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
        ItemSchema
      );
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
        title: "Ошибка при создании товара",
        description:
          error instanceof Error ? error.message : "Произошла ошибка",
        variant: "destructive",
      });
    },
  });

  // Wrapper function that exposes the mutation
  const createItem = async (
    itemData: CreateItemData
  ): Promise<ItemCreationResponse> => {
    if (!authenticatedUser || !token) {
      throw new Error("Пользователь не авторизован");
    }
    return createItemAsync(itemData);
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
    deleteItem: handleDeleteItem,
    isCreating,
    isDeleting,
    isUserItem: hasItem,
  };
}
