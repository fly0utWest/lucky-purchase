"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { Item } from "@/shared/models";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import ItemCard from "@/components/item-card";

interface UserItemsProps {
  userId: string;
}

export function UserItems({ userId }: UserItemsProps) {
  const {
    data: items,
    isLoading,
    isError,
    error,
  } = useQuery<Item[]>({
    queryKey: ["userItems", userId],
    queryFn: () => fetchWrapper(`items?userId=${userId}`),
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

  if (!items?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Нет объявлений
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
