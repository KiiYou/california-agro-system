"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  DocumentFilters,
  DocumentSortMode,
  DocumentStatusFilter,
  DocumentTypeFilter,
} from "@/features/documents/types/document.types";

type DocumentsToolbarProps = {
  filters: DocumentFilters;
  onFiltersChange: (filters: DocumentFilters) => void;
};

const typeOptions: Array<{ label: string; value: DocumentTypeFilter }> = [
  { label: "All Types", value: "all" },
  { label: "Quotations", value: "quotation" },
  { label: "Invoices", value: "invoice" },
];

const statusOptions: Array<{ label: string; value: DocumentStatusFilter }> = [
  { label: "All Statuses", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Sent", value: "sent" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "Paid", value: "paid" },
];

const sortOptions: Array<{ label: string; value: DocumentSortMode }> = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Document Number", value: "number" },
  { label: "Customer Name", value: "customerName" },
  { label: "Total", value: "total" },
];

export function DocumentsToolbar({
  filters,
  onFiltersChange,
}: DocumentsToolbarProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_11rem_11rem_12rem]">
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
          placeholder="Search document number or customer name..."
          className="pl-8"
          aria-label="Search documents"
        />
      </div>
      <Select
        value={filters.type}
        onValueChange={(type: DocumentTypeFilter) =>
          onFiltersChange({ ...filters, type })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.status}
        onValueChange={(status: DocumentStatusFilter) =>
          onFiltersChange({ ...filters, status })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.sortMode}
        onValueChange={(sortMode: DocumentSortMode) =>
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
  );
}
