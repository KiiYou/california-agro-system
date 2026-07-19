"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  ImageIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductStockBadge } from "@/features/products/components/ProductStockBadge";
import type { Product } from "@/features/products/types/product";

type ProductsTableProps = {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export function ProductsTable({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="size-4 rounded border-input"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(event) =>
              table.toggleAllPageRowsSelected(event.target.checked)
            }
            aria-label="Select all products"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="size-4 rounded border-input"
            checked={row.getIsSelected()}
            onChange={(event) => row.toggleSelected(event.target.checked)}
            aria-label={`Select ${row.original.nameEn}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "imageUrl",
        header: "",
        cell: ({ row }) => (
          <div className="flex size-10 items-center justify-center overflow-hidden rounded-lg border bg-muted/40">
            {row.original.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={row.original.imageUrl}
                alt={row.original.nameEn}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="size-4 text-muted-foreground" aria-hidden />
            )}
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "code",
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Code
            <ArrowUpDown className="size-4" aria-hidden />
          </Button>
        ),
        cell: ({ row }) => (
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={() => onView(row.original)}
          >
            {row.original.code}
          </button>
        ),
      },
      {
        accessorKey: "nameEn",
        header: "English Name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-foreground">{row.original.nameEn}</p>
            <p className="text-xs text-muted-foreground" dir="rtl">
              {row.original.nameAr}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) =>
          row.original.category ? (
            <Badge variant="secondary">{row.original.category}</Badge>
          ) : (
            <span className="text-muted-foreground">Not set</span>
          ),
      },
      {
        accessorKey: "defaultPrice",
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="size-4" aria-hidden />
          </Button>
        ),
        cell: ({ row }) =>
          `${row.original.defaultPrice.toFixed(2)} ${row.original.currency}`,
      },
      {
        accessorKey: "stockQuantity",
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="size-4" aria-hidden />
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium">
              {row.original.stockQuantity} {row.original.unit}
            </p>
            <p className="text-xs text-muted-foreground">
              Min {row.original.minimumStock}
            </p>
          </div>
        ),
      },
      {
        id: "stockStatus",
        header: "Status",
        cell: ({ row }) => <ProductStockBadge product={row.original} />,
      },
      {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? "default" : "outline"}>
            {row.original.isActive ? "Active" : "Inactive"}
          </Badge>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => dateFormatter.format(row.original.createdAt),
        sortingFn: (firstRow, secondRow) =>
          firstRow.original.createdAt.getTime() -
          secondRow.original.createdAt.getTime(),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <MoreHorizontal className="size-4" aria-hidden />
                <span className="sr-only">Open product actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView(row.original)}>
                <Eye className="size-4" aria-hidden />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                <Pencil className="size-4" aria-hidden />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(row.original)}
              >
                <Trash2 className="size-4" aria-hidden />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onDelete, onEdit, onView],
  );

  // TanStack Table intentionally returns dynamic table APIs from this hook.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} selected
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline">
              Column Visibility
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllLeafColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(value === true)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-28 text-center text-muted-foreground"
                  colSpan={columns.length}
                >
                  No products match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
