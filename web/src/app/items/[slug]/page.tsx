"use client";

import { useParams } from "next/navigation";
import { Item } from "@/shared/models";
import { fetchWrapper } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ItemBreadcrumbs } from "./_sections/item-breadcrumbs";
import { ItemGallery } from "./_sections/item-gallery";
import { ItemDetails } from "./_sections/item-description";
import { ItemSidebar } from "./_sections/item-sidebar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

export default function ItemPage() {
  const { slug } = useParams();

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery<Item>({
    queryKey: ["item", slug],
    queryFn: () => fetchWrapper(`item/${slug}`),
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="container mx-auto py-10">
        <ErrorMessage
          title="Ошибка загрузки товара"
          message={
            error instanceof Error
              ? error.message
              : "Не удалось загрузить информацию о товаре"
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto pb-16">
      <ItemBreadcrumbs item={item} />

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        {/* Main Content */}
        <div className="space-y-8">
          <ItemGallery images={item.images} title={item.title} />
          <ItemDetails item={item} />
        </div>

        {/* Sidebar */}
        <ItemSidebar item={item} />
      </div>
    </div>
  );
}
