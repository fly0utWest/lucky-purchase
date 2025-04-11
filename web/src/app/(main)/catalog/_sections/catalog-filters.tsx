import { useEffect } from "react";

import React from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { LayoutGrid, Rows } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/use-search";
import { Item } from "@/shared/models";

type LayoutType = "grid-1" | "grid-2" | "grid-3";

interface CatalogFiltersProps {
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  setLoading: (isLoading: boolean) => void;
  setItems: (data: Item[]) => void;
}

export function CatalogFilters({
  layout,
  onLayoutChange,
  setItems,
  setLoading,
}: CatalogFiltersProps) {
  const { query, handleInputChange, setSearchParam, searchParams, refetch } =
    useSearch("", {
      minChars: 0,
    });

  const applyFilters = () => {
    setLoading(true);
    refetch()
      .then((response) => {
        const searchResults = response?.data?.items || [];
        setItems(searchResults);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    refetch()
      .then((response) => {
        const searchResults = response?.data?.items || [];
        setItems(searchResults);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  
  return (
    <Card className="rounded-xl shadow-sm p-6">
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Поиск</label>
          <Input
            placeholder="Поиск товаров..."
            value={query}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Сортировка</label>
          <Select
            value={searchParams.sortBy}
            onValueChange={(value) => setSearchParam("sortBy", value)}
          >
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

        <div>
          <label className="text-sm font-medium mb-2 block">Цена</label>
          <div className="space-y-2">
            <Slider
              min={0}
              max={100000000}
              step={100}
              value={[
                searchParams.minPrice || 0,
                searchParams.maxPrice || 100000000,
              ]}
              onValueChange={(value) => {
                setSearchParam("minPrice", value[0]);
                setSearchParam("maxPrice", value[1]);
              }}
              className="my-4"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{searchParams.minPrice?.toLocaleString() || 0} ₽</span>
              <span>
                {searchParams.maxPrice?.toLocaleString() || 100000000} ₽
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={applyFilters} className="bg-primary text-white">
            Отфильтровать
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onLayoutChange("grid-1")}
            className={cn(
              layout === "grid-1" && "bg-primary text-primary-foreground"
            )}
          >
            <Rows className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onLayoutChange("grid-2")}
            className={cn(
              layout === "grid-2" && "bg-primary text-primary-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onLayoutChange("grid-3")}
            className={cn(
              layout === "grid-3" && "bg-primary text-primary-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
