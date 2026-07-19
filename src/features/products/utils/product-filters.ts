import type {
  Product,
  ProductFilters,
} from "@/features/products/types/product";

export function getProductCategories(products: Product[]): string[] {
  return Array.from(
    new Set(
      products
        .map((product) => product.category.trim())
        .filter((category) => category.length > 0),
    ),
  ).sort((first, second) => first.localeCompare(second));
}

export function isLowStock(product: Product): boolean {
  return product.stockQuantity < product.minimumStock;
}

export function getStockStatus(product: Product): "low" | "available" {
  return isLowStock(product) ? "low" : "available";
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return products
    .filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.code, product.nameAr, product.nameEn, product.category].some(
          (value) => value.toLowerCase().includes(normalizedSearch),
        );

      const matchesCategory =
        filters.category === "all" || product.category === filters.category;

      const matchesStockFilter =
        filters.stockFilter === "all" ||
        (filters.stockFilter === "active" && product.isActive) ||
        (filters.stockFilter === "inactive" && !product.isActive) ||
        (filters.stockFilter === "lowStock" && isLowStock(product));

      return matchesSearch && matchesCategory && matchesStockFilter;
    })
    .toSorted((first, second) => {
      if (filters.sortMode === "oldest") {
        return first.createdAt.getTime() - second.createdAt.getTime();
      }

      return second.createdAt.getTime() - first.createdAt.getTime();
    });
}
