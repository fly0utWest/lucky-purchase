"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import ItemCard from "@/components/item-card";
import { useAuthStore } from "@/store/authStore";
import { ItemsResponse, ItemsResponseSchema } from "@/shared/models";

export function FavoriteItems() {
  const { token, authenticatedUser } = useAuthStore();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<ItemsResponse>({
    queryKey: ["favoriteItems", authenticatedUser?.favorites],
    queryFn: () =>
      fetchWrapper(
        "favorite/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        ItemsResponseSchema
      ),
  });

  const items = response?.items || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Ошибка загрузки избранного"
        message={
          error instanceof Error
            ? error.message
            : "Не удалось загрузить избранные товары"
        }
      />
    );
  }

  if (response?.count === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        В избранном пока ничего нет
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items?.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
