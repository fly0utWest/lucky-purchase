"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { ItemsResponse, ItemsResponseSchema } from "@/shared/models";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import ItemCard from "@/components/item-card";

interface UserItemsProps {
  userId: string;
}

export function UserItems({ userId }: UserItemsProps) {
  const { data, isLoading, isError, error } = useQuery<ItemsResponse>({
    queryKey: ["userItems", userId],
    queryFn: () =>
      fetchWrapper(`item/get?userId=${userId}`, undefined, ItemsResponseSchema),
  });

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
        title="Ошибка загрузки объявлений"
        message={
          error instanceof Error
            ? error.message
            : "Не удалось загрузить объявления пользователя"
        }
      />
    );
  }

  if (!data?.count) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Нет объявлений
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </section>
  );
}
