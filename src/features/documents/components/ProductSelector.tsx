"use client";

import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/features/products/types/product";

type ProductSelectorProps = {
  products: Product[];
  onAddProduct: (product: Product) => void;
};

export function ProductSelector({
  products,
  onAddProduct,
}: ProductSelectorProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) =>
      [product.code, product.nameAr, product.nameEn, product.category].some(
        (value) => value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [products, search]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          className="pl-8"
          aria-label="Search products"
        />
      </div>
      <div className="max-h-72 space-y-2 overflow-y-auto rounded-lg border bg-card p-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-muted/60"
              key={product.id}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {product.code} · {product.nameEn}
                </p>
                <p className="truncate text-xs text-muted-foreground" dir="rtl">
                  {product.nameAr}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onAddProduct(product)}
              >
                <Plus className="size-4" aria-hidden />
                Add
              </Button>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-sm text-muted-foreground">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
