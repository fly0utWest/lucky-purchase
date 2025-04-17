import { useEffect, useRef } from "react";
import React from "react";
import { Input } from "@/components/ui/input";
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
import CategoriesDropdown from "@/components/categories-dropdown";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    query,
    handleInputChange,
    setSearchParam,
    searchParams: filterParams,
    results,
    isLoading,
    refetch,
    clearSearch,
  } = useSearch("", {
    minChars: 0,
  });

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSearchParam("category", categoryFromUrl);
    } else {
      clearSearch();
    }
    refetch();
  }, [searchParams, clearSearch, setSearchParam, refetch]);

  useEffect(() => {
    setLoading(isLoading);
    if (!isLoading && results.length >= 0) {
      setItems(results);
    }
  }, [results, isLoading, setItems, setLoading]);

  const handleCategoryChange = (categoryId: string) => {
    setSearchParam("category", categoryId);

    const currentUrl = new URL(window.location.href);
    if (categoryId) {
      currentUrl.searchParams.set("category", categoryId);
    } else {
      currentUrl.searchParams.delete("category");
    }

    router.push(currentUrl.toString());
  };

  return (
    <Card className="rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center">
        <div className="w-full sm:w-auto">
          <Input
            placeholder="Поиск товаров..."
            value={query}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Select
              value={filterParams.sortBy}
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
            <CategoriesDropdown
              isValueName
              value={filterParams.category}
              onValueChange={handleCategoryChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
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
