"use client";

import { RefreshCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  ProductFilters,
  ProductSortMode,
  ProductStockFilter,
} from "@/features/products/types/product";

type ProductToolbarProps = {
  filters: ProductFilters;
  categoryOptions: string[];
  isLoading: boolean;
  onFiltersChange: (filters: ProductFilters) => void;
  onRefresh: () => void;
};

const stockFilterOptions: Array<{ label: string; value: ProductStockFilter }> = [
  { label: "All Stock", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Low Stock", value: "lowStock" },
];

const sortOptions: Array<{ label: string; value: ProductSortMode }> = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export function ProductToolbar({
  filters,
  categoryOptions,
  isLoading,
  onFiltersChange,
  onRefresh,
}: ProductToolbarProps) {
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-[1fr_12rem_10rem_9rem]">
        <div className="relative min-w-0">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={filters.search}
            onChange={(event) =>
              onFiltersChange({ ...filters, search: event.target.value })
            }
            placeholder="Search code, Arabic name, English name, category..."
            className="pl-8"
            aria-label="Search products"
          />
        </div>
        <Select
          value={filters.category}
          onValueChange={(category) => onFiltersChange({ ...filters, category })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoryOptions.map((category) => (
              <SelectItem value={category} key={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.stockFilter}
          onValueChange={(stockFilter: ProductStockFilter) =>
            onFiltersChange({ ...filters, stockFilter })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            {stockFilterOptions.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.sortMode}
          onValueChange={(sortMode: ProductSortMode) =>
            onFiltersChange({ ...filters, sortMode })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onRefresh}
        disabled={isLoading}
      >
        <RefreshCcw className="size-4" aria-hidden />
        Refresh
      </Button>
    </div>
  );
}
