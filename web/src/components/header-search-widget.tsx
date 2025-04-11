import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { Button } from "@/components/ui/button";
import ItemCard from "./item-card";
import { usePathname } from "next/navigation";

export function HeaderSearchWidget() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const pathname = usePathname();

  const { query, results, isLoading, handleInputChange, clearSearch } =
    useSearch("", {
      debounceMs: 300,
      minChars: 1,
    });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const SearchResults = () => (
    <div className="p-2 bg-background flex flex-col gap-4 max-h-[100vh - 10rem] min-h-max overflow-y-auto">
      {isLoading && query.length >= 1 && (
        <div className="py-6 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-2">Ищем...</p>
        </div>
      )}
      {!isLoading && query.length >= 1 && results.length === 0 && (
        <div className="py-6 text-center text-sm text-muted-foreground">
          Ничего не найдено
        </div>
      )}
      {query.length < 1 && results.length < 1 && (
        <div className="py-6 text-center text-sm text-muted-foreground">
          Начните печатать...
        </div>
      )}
      {results.length > 0 && (
        <>
          <div className="px-1 py-1.5 text-xs font-medium text-muted-foreground">
            {query.length >= 1 ? "Результаты" : "Недавние объявления"}
          </div>
          {results.map((item) => (
            <ItemCard key={item.id} item={item} variant="compact" />
          ))}
        </>
      )}
    </div>
  );

  return (
    <>
      <Button
        variant="outline"
        className="w-min justify-start gap-2 px-3 text-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span>Поиск</span>
      </Button>
      {open && (
        <div
          className="fixed inset-0 z-50 cursor-pointer *:cursor-default bg-background/50 flex flex-col h-screen w-full"
          onClick={handleBackgroundClick}
        >
          <div
            className="flex flex-col bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center min-h-16 border-b px-3 py-2">
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
              <div className="relative bottom-0 border-t">
                <Button
                  variant="ghost"
                  className="w-full rounded-none"
                  onClick={clearSearch}
                >
                  Очистить поиск
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
