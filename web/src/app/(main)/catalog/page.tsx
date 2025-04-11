"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import ItemCard from "@/components/item-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Item } from "@/shared/models";
import { CatalogFilters } from "./_sections/catalog-filters";

type LayoutType = "grid-1" | "grid-2" | "grid-3";

export default function CatalogPage() {
  const [layout, setLayout] = useState<LayoutType>("grid-2");
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  const getGridClasses = () => {
    switch (layout) {
      case "grid-1":
        return "grid-cols-1";
      case "grid-2":
        return "grid-cols-1 md:grid-cols-2";
      case "grid-3":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>
      <div className="flex flex-col gap-8">
        <CatalogFilters
          setLoading={(state) => setIsLoading(state)}
          setItems={(data) => {
            setItems(data);
          }}
          layout={layout}
          onLayoutChange={setLayout}
        />
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : items && items.length > 0 ? (
            <div className={`grid ${getGridClasses()} gap-4`}>
              {items.map((item: Item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  variant={layout === "grid-1" ? "compact" : "default"}
                />
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">Товары не найдены</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
