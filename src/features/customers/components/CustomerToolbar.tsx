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
import type { CustomerFilters, CustomerSortMode } from "@/features/customers/types/customer";

type CustomerToolbarProps = {
  filters: CustomerFilters;
  countryOptions: string[];
  isLoading: boolean;
  onFiltersChange: (filters: CustomerFilters) => void;
  onRefresh: () => void;
};

const sortOptions: Array<{ label: string; value: CustomerSortMode }> = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Recently Added", value: "recentlyAdded" },
];

export function CustomerToolbar({
  filters,
  countryOptions,
  isLoading,
  onFiltersChange,
  onRefresh,
}: CustomerToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={filters.search}
            onChange={(event) =>
              onFiltersChange({ ...filters, search: event.target.value })
            }
            placeholder="Search company, contact, phone, email, country..."
            className="pl-8"
            aria-label="Search customers"
          />
        </div>
        <Select
          value={filters.country}
          onValueChange={(country) => onFiltersChange({ ...filters, country })}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countryOptions.map((country) => (
              <SelectItem value={country} key={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.sortMode}
          onValueChange={(sortMode: CustomerSortMode) =>
            onFiltersChange({ ...filters, sortMode })
          }
        >
          <SelectTrigger className="w-full sm:w-44">
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
