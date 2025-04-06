import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { debounce } from "lodash";
import { ItemsResponse, ItemsResponseSchema } from "@/shared/models";

interface UseSearchOptions {
  debounceMs?: number;
  enabled?: boolean;
  minChars?: number;
}

export function useSearch(
  initialQuery: string = "",
  options?: UseSearchOptions
) {
  const { debounceMs = 500, enabled = true, minChars = 0 } = options || {};

  const [searchInput, setSearchInput] = useState<string>(initialQuery);

  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);

  const debouncedSetQuery = useRef(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, debounceMs)
  ).current;

  useEffect(() => {
    debouncedSetQuery(searchInput);
  }, [searchInput, debouncedSetQuery]);

  const shouldSearch = debouncedQuery.length >= minChars && enabled;

  const { data, isLoading, isError, error, refetch, isFetching } =
    useQuery<ItemsResponse>({
      queryKey: ["search", debouncedQuery],
      queryFn: () =>
        fetchWrapper(
          `/search?query=${encodeURIComponent(debouncedQuery)}`,
          undefined,
          ItemsResponseSchema
        ),
      enabled: shouldSearch,
      staleTime: 5 * 60 * 1000,
    });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    []
  );

  const setQuery = useCallback((query: string) => {
    setSearchInput(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchInput("");
    setDebouncedQuery("");
  }, []);

  return {
    query: searchInput,
    debouncedQuery,
    results: data || { items: [], count: 0 },

    isInitialLoading: isLoading,
    isFetching,
    isRefetching: !isLoading && isFetching,
    isLoading: isLoading || isFetching,
    isError,
    error,

    handleInputChange,
    setQuery,
    clearSearch,
    refetch,
  };
}
