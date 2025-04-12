"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { debounce } from "lodash";
import { ItemsResponseSchema, SearchItemsResponse } from "@/shared/models";

interface SearchParams {
  query?: string;
  sortBy?: "newest" | "oldest" | "expensive" | "cheap";
  sortDirection?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  category?: string;
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
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: initialQuery,
    ...initialParams,
  });

  const debouncedSetQuery = useRef(
    debounce((value: string) => {
      setDebouncedQuery(value);
      setSearchParams((prev) => ({ ...prev, query: value }));
    }, debounceMs)
  ).current;

  useEffect(() => {
    debouncedSetQuery(searchInput);

    return () => {
      debouncedSetQuery.cancel();
    };
  }, [searchInput, debouncedSetQuery]);

  const shouldSearch =
    (debouncedQuery.length >= minChars || debouncedQuery.length === 0) &&
    enabled;

  const buildQueryString = useCallback((params: SearchParams) => {
    const queryParams = new URLSearchParams();

    if (params.query)
      queryParams.set("query", encodeURIComponent(params.query));

    if (params.sortBy) {
      queryParams.set("sortBy", params.sortBy);
    }

    if (params.sortDirection) {
      queryParams.set("sortDirection", params.sortDirection);
    }

    if (params.minPrice !== undefined) {
      const minPrice = Number(params.minPrice);
      if (!isNaN(minPrice)) {
        queryParams.set("minPrice", minPrice.toString());
      }
    }
    if (params.maxPrice !== undefined) {
      const maxPrice = Number(params.maxPrice);
      if (!isNaN(maxPrice)) {
        queryParams.set("maxPrice", maxPrice.toString());
      }
    }

    if (params.category)
      queryParams.set("category", encodeURIComponent(params.category));
    if (params.skip !== undefined) queryParams.set("skip", String(params.skip));
    if (params.take !== undefined) queryParams.set("take", String(params.take));

    return queryParams.toString();
  }, []);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useQuery<SearchItemsResponse>({
      queryKey: ["search", searchParams],
      queryFn: () => {
        const params = {
          ...searchParams,
          minPrice: searchParams.minPrice
            ? Number(searchParams.minPrice)
            : undefined,
          maxPrice: searchParams.maxPrice
            ? Number(searchParams.maxPrice)
            : undefined,
        };

        return fetchWrapper(
          `/search?${buildQueryString(params)}`,
          undefined,
          ItemsResponseSchema
        );
      },
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
      if (param === "sortBy") {
        const direction = value === "expensive" ? "desc" : "asc";
        setSearchParams((prev) => ({
          ...prev,
          [param]: value,
          sortDirection: direction,
        }));
      } else {
        setSearchParams((prev) => ({ ...prev, [param]: value }));
      }
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
