"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Item } from "@/shared/models";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ItemCard from "@/components/item-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { env } from "@/env.mjs";
import { Card } from "@/components/ui/card";

// Функция форматирования цены
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

interface FilterState {
  search: string;
  sortBy: "price_asc" | "price_desc" | "date_desc" | "date_asc" | "default";
  priceRange: [number, number];
  layout: "grid-2" | "grid-3" | "grid-4" | "list";
  page: number;
}

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data: itemsData, isLoading } = useQuery<{ items: Item[] }>({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/item/get`);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке товаров");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  if (!itemsData?.items.length) {
    return (
      <div className="container py-8">
        <div className="text-center">Нет доступных товаров</div>
      </div>
    );
  }

  const filteredItems = itemsData.items
    .filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());
      item.description.toLowerCase().includes(search.toLowerCase());
      const matchesMinPrice = !minPrice || item.price >= parseInt(minPrice);
      const matchesMaxPrice = !maxPrice || item.price <= parseInt(maxPrice);
      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      if (sort === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sort === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      if (sort === "expensive") return b.price - a.price;
      if (sort === "cheap") return a.price - b.price;
      return 0;
    });

  return (
    <div className="container py-8 space-y-6">
      <div className="bg-card rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Поиск товаров..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Сначала новые</SelectItem>
              <SelectItem value="oldest">Сначала старые</SelectItem>
              <SelectItem value="expensive">Сначала дорогие</SelectItem>
              <SelectItem value="cheap">Сначала дешевые</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Мин. цена"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Макс. цена"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{item.price} ₽</span>
              <span className="text-sm text-muted-foreground">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
