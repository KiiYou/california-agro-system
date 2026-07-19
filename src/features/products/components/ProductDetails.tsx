import { Box, CircleDollarSign, ImageIcon, Package, Tags } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductStockBadge } from "@/features/products/components/ProductStockBadge";
import type { Product } from "@/features/products/types/product";

type ProductDetailsProps = {
  product: Product | null;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Select a product from the table to review pricing, stock, and
            bilingual descriptions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed bg-muted/40 p-6 text-sm text-muted-foreground">
            No product selected.
          </div>
        </CardContent>
      </Card>
    );
  }

  const details = [
    { label: "Code", value: product.code, icon: Package },
    { label: "Category", value: product.category || "Not set", icon: Tags },
    { label: "Unit", value: product.unit, icon: Box },
    {
      label: "Default Price",
      value: `${product.defaultPrice.toFixed(2)} ${product.currency}`,
      icon: CircleDollarSign,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>{product.nameEn}</CardTitle>
            <CardDescription>
              Updated {dateFormatter.format(product.updatedAt)}
            </CardDescription>
          </div>
          <ProductStockBadge product={product} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[12rem_1fr]">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border bg-muted/40">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.nameEn}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="size-8 text-muted-foreground" aria-hidden />
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {details.map((detail) => (
              <div className="rounded-lg border bg-muted/30 p-3" key={detail.label}>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <detail.icon className="size-3.5" aria-hidden />
                  {detail.label}
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {detail.value}
                </p>
              </div>
            ))}
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Current Stock
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {product.stockQuantity} {product.unit}
              </p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Minimum Stock
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {product.minimumStock} {product.unit}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              English Description
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {product.descriptionEn || "No English description recorded."}
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3" dir="rtl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Arabic Description
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {product.descriptionAr || "لا يوجد وصف عربي مسجل."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
