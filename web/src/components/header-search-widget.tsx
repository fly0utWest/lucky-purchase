import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import ItemCard from "./item-card";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { SearchItem } from "@/shared/models";

export function HeaderSearchWidget() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const { query, results, isLoading, handleInputChange, clearSearch } =
    useSearch("", {
      debounceMs: 300,
      minChars: 1,
    });

  // Close search when route changes
  useEffect(() => {
    // This will run when pathname changes
    setOpen(false);
  }, [pathname]);

  // Focus input when search opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // On mobile, lock scroll when search is open
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, open]);

  // Wrapped ItemCard with close functionality
  const SearchItemCard = ({
    item,
    variant,
  }: {
    item: SearchItem;
    variant: "compact" | "default" | undefined;
  }) => (
    <div onClick={() => setOpen(false)} className="cursor-pointer">
      <ItemCard key={item.id} item={item} variant={variant} />
    </div>
  );

  // Search Results Content - shared between mobile and desktop
  const SearchResults = () => (
    <>
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
            <SearchItemCard key={item.id} item={item} variant="compact" />
          ))}
        </div>
      )}
    </>
  );

  // For mobile, render a separate fullscreen component
  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="w-min justify-start gap-2 px-3 text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
        </Button>

        {open && (
          <div className="fixed inset-0 z-50 bg-background flex flex-col h-screen w-screen">
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
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 ml-2"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-grow overflow-y-auto p-0">
              <SearchResults />
            </div>

            {query && (
              <div className="mt-auto border-t p-2">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={clearSearch}
                >
                  Очистить поиск
                </Button>
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  // For desktop, use the Popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-min md:w-32 lg:w-64 justify-start gap-2 px-3 text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="hidden md:inline truncate">Поиск</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-full rounded-lg border-2"
        align="center"
        side="bottom"
        sideOffset={4}
      >
        <div className="rounded-lg border shadow-md p-2">
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
            <SearchResults />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
