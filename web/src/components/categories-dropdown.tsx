"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchWrapper } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CategoryResponse } from "@/shared/models";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CategoriesDropdownProps {
  onValueChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({
  onValueChange,
  value,
  placeholder = "Категория",
  disabled = false,
  className = "",
  required = false,
}) => {
  const { data, isLoading, error, refetch } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: () => fetchWrapper("/search/categories"),
    staleTime: 5 * 60 * 1000, 
    retry: 2,
  });

  if (isLoading) {
    return <Skeleton className={`h-10 w-full ${className}`} />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Не удалось загрузить категории.{" "}
          <button onClick={() => refetch()} className="underline font-medium">
            Повторить
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  const hasCategories = data && data.categories && data.categories.length > 0;

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || !hasCategories}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {hasCategories ? (
          data.categories.map((item) => (
            <SelectItem
              className="hover:cursor-pointer"
              key={item.id}
              value={item.id}
            >
              {item.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="empty" disabled>
            Нет доступных категорий
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default CategoriesDropdown;
