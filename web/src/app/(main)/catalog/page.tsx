"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Item } from "@/shared/models";
import { Input } from "@/components/ui/input";
import ItemCard from "@/components/item-card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { env } from "@/env.mjs";
import { Card } from "@/components/ui/card";
import { LayoutGrid, Rows } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Функция форматирования цены
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

const ITEMS_PER_PAGE = 30;

type LayoutType = "grid-1" | "grid-2" | "grid-3";

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [layout, setLayout] = useState<LayoutType>("grid-3");
  const [maxPossiblePrice, setMaxPossiblePrice] = useState(10000);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Обработка поискового запроса с задержкой
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchItems = async ({ pageParam = 1 }) => {
    try {
      const baseUrl = `${env.NEXT_PUBLIC_API_BASE_URL}/item/get`;
      const params = new URLSearchParams();

      // Поиск
      if (debouncedSearch.trim()) {
        params.append("q", debouncedSearch.trim());
      }

      // Сортировка
      let sortParam = "";
      switch (sort) {
        case "newest":
          sortParam = "-createdAt";
          break;
        case "oldest":
          sortParam = "createdAt";
          break;
        case "expensive":
          sortParam = "-price";
          break;
        case "cheap":
          sortParam = "price";
          break;
      }

      if (sortParam) {
        params.append("orderBy", sortParam);
      }

      // Пагинация
      params.append("offset", ((pageParam - 1) * ITEMS_PER_PAGE).toString());
      params.append("limit", ITEMS_PER_PAGE.toString());

      const response = await fetch(
        `${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(errorData.message || "Ошибка при загрузке товаров");
      }

      const data = await response.json();
      console.log("API Response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["items", sort, debouncedSearch],
      queryFn: fetchItems,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.items || lastPage.items.length < ITEMS_PER_PAGE)
          return undefined;
        return pages.length + 1;
      },
    });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Обновление максимальной цены
  useEffect(() => {
    if (data?.pages[0]?.items) {
      const allPrices = data.pages.flatMap((page) =>
        page.items.map((item: Item) => item.price)
      );
      const maxPrice = Math.max(...allPrices);

      if (maxPrice > maxPossiblePrice) {
        setMaxPossiblePrice(maxPrice);
        setPriceRange((prev) => [prev[0], maxPrice]);
      }
    }
  }, [data?.pages, maxPossiblePrice]);

  // Фильтрация по цене на клиенте
  const filteredItems = useMemo(() => {
    const items = data?.pages.flatMap((page) => page.items) ?? [];
    return items.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
  }, [data?.pages, priceRange]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  const gridConfig = {
    "grid-1": "grid-cols-1",
    "grid-2": "grid-cols-1 sm:grid-cols-2",
    "grid-3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Фильтры */}
      <Card className="rounded-xl shadow-sm p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Поиск</label>
            <Input
              placeholder="Поиск товаров..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Сортировка</label>
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
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium mb-2 block">Цена</label>
            <div className="space-y-2">
              <Slider
                min={0}
                max={maxPossiblePrice}
                step={100}
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                className="my-4"
              />
              <div className="flex items-center justify-between text-sm">
                <span>{priceRange[0].toLocaleString()} ₽</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLayout("grid-1")}
                    className={cn(
                      layout === "grid-1" &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    <Rows className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLayout("grid-2")}
                    className={cn(
                      layout === "grid-2" &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLayout("grid-3")}
                    className={cn(
                      layout === "grid-3" &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
                <span>{priceRange[1].toLocaleString()} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Список товаров */}
      <div className="space-y-6">
        <div className={cn("grid gap-4", gridConfig[layout])}>
          {filteredItems.map((item, index) => (
            <ItemCard
              key={`${item.id}-${index}`}
              item={item}
              variant={layout === "grid-1" ? "compact" : "default"}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Товары не найдены
          </div>
        )}

        {/* Индикатор загрузки следующей страницы */}
        <div ref={loadMoreRef} className="py-4 text-center">
          {isFetchingNextPage ? (
            <div className="text-muted-foreground">Загрузка...</div>
          ) : hasNextPage ? (
            <div className="h-4" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
