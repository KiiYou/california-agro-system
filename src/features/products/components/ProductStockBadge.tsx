import { Badge } from "@/components/ui/badge";
import type { Product } from "@/features/products/types/product";
import { getStockStatus } from "@/features/products/utils/product-filters";

type ProductStockBadgeProps = {
  product: Product;
};

export function ProductStockBadge({ product }: ProductStockBadgeProps) {
  const status = getStockStatus(product);

  if (status === "low") {
    return <Badge variant="destructive">Low Stock</Badge>;
  }

  return <Badge className="bg-emerald-600 text-white">Available</Badge>;
}
