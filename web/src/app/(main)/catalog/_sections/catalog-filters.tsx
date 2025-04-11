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
import CategoriesDropdown from "@/components/categories-dropdown";
import { useRouter, useSearchParams } from "next/navigation"; // Import router and search params

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
    refetch,
  } = useSearch("", {
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

  // Extract category from URL when component mounts
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSearchParam("category", categoryFromUrl);
    }
  }, [searchParams, setSearchParam]);

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
  }, [filterParams]);

  const handleCategoryChange = (categoryId: string) => {
    setSearchParam("category", categoryId);

    const currentUrl = new URL(window.location.href);
    if (categoryId) {
      currentUrl.searchParams.set("category", categoryId);
    } else {
      currentUrl.searchParams.delete("category");
    }

    // Use router.push or router.replace depending on your navigation preference
    router.push(currentUrl.toString());
  };

  return (
    <Card className="rounded-xl flex items-center shadow-sm p-6">
      <div className="gap-6 items-center flex">
        <Input
          placeholder="Поиск товаров..."
          value={query}
          onChange={handleInputChange}
        />

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
