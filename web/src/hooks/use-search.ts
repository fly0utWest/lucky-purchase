import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { debounce } from "lodash";
import { ItemsResponseSchema, SearchItemsResponse } from "@/shared/models";

interface SearchParams {
  query?: string;
  sortBy?: "newest" | "price" | "title";
  sortDirection?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  skip?: number;
  take?: number;
}

interface UseSearchOptions {
  debounceMs?: number;
  enabled?: boolean;
  minChars?: number;
  initialParams?: Omit<SearchParams, "query">;
}

export function useSearch(
  initialQuery: string = "",
  options?: UseSearchOptions
) {
  const {
    debounceMs = 500,
    enabled = true,
    minChars = 0,
    initialParams = {},
  } = options || {};

  const [searchInput, setSearchInput] = useState<string>(initialQuery);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: initialQuery,
    ...initialParams,
  });

  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);

  const debouncedSetQuery = useRef(
    debounce((value: string) => {
      setDebouncedQuery(value);
      setSearchParams((prev) => ({ ...prev, query: value }));
    }, debounceMs)
  ).current;

  useEffect(() => {
    debouncedSetQuery(searchInput);
  }, [searchInput, debouncedSetQuery]);

  const shouldSearch =
    (debouncedQuery.length >= minChars || debouncedQuery.length === 0) &&
    enabled;

  const buildQueryString = useCallback((params: SearchParams) => {
    const queryParams = new URLSearchParams();

    if (params.query) queryParams.set("query", params.query);
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortDirection)
      queryParams.set("sortDirection", params.sortDirection);
    if (params.minPrice !== undefined)
      queryParams.set("minPrice", params.minPrice.toString());
    if (params.maxPrice !== undefined)
      queryParams.set("maxPrice", params.maxPrice.toString());
    if (params.categoryId) queryParams.set("categoryId", params.categoryId);
    if (params.skip !== undefined)
      queryParams.set("skip", params.skip.toString());
    if (params.take !== undefined)
      queryParams.set("take", params.take.toString());

    return queryParams.toString();
  }, []);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useQuery<SearchItemsResponse>({
      queryKey: ["search", searchParams],
      queryFn: () =>
        fetchWrapper(
          `/search?${buildQueryString(searchParams)}`,
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
    setSearchParams((prev) => ({ ...prev, query: "" }));
  }, []);

  const setSearchParam = useCallback(
    (param: keyof SearchParams, value: any) => {
      setSearchParams((prev) => ({ ...prev, [param]: value }));
    },
    []
  );

  const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  const nextPage = useCallback(() => {
    if (data?.pagination && data.pagination.hasMore) {
      setSearchParams((prev) => ({
        ...prev,
        skip: (prev.skip || 0) + (prev.take || 20),
      }));
    }
  }, [data?.pagination]);

  const prevPage = useCallback(() => {
    setSearchParams((prev) => ({
      ...prev,
      skip: Math.max(0, (prev.skip || 0) - (prev.take || 20)),
    }));
  }, []);

  return {
    query: searchInput,
    debouncedQuery,
    searchParams,

    results: data?.items || [],
    pagination: data?.pagination || {
      total: 0,
      skip: 0,
      take: 20,
      hasMore: false,
    },

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
    setSearchParam,
    updateSearchParams,
    nextPage,
    prevPage,
  };
}
