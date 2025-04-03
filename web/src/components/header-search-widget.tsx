import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Item } from "@radix-ui/react-dropdown-menu";
import ItemCard from "./item-card";

export function HeaderSearchWidget() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const { query, results, isLoading, handleInputChange, clearSearch } =
    useSearch("", {
      debounceMs: 300,
      minChars: 1,
    });

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-64 justify-start gap-2 px-3 text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="truncate">Поиск</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align={"center"}>
        <div className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Ищите объявлениия!"
              value={query}
              onChange={handleInputChange}
              className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto p-0">
            {isLoading && query.length >= 2 && (
              <div className="py-6 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">Ищем...</p>
              </div>
            )}

            {!isLoading && query.length >= 1 && results.count === 0 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Ничего не найдено
              </div>
            )}

            {query.length < 1 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Начните печатать...
              </div>
            )}

            {results.count > 0 && (
              <div className="p-2">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Результаты
                </div>
                {results.foundItems.map((item) => (
                  <ItemCard key={item.id} item={item} variant="compact" />
                ))}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
