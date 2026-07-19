export type ProductCurrency = "USD" | "EUR" | "EGP" | "SAR" | "AED";

export type Product = {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  unit: string;
  defaultPrice: number;
  currency: ProductCurrency;
  stockQuantity: number;
  minimumStock: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};

export type ProductFormValues = {
  code: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  unit: string;
  defaultPrice: number;
  currency: ProductCurrency;
  stockQuantity: number;
  minimumStock: number;
  imageUrl: string;
  isActive: boolean;
};

export type ProductImageUpload = {
  file: File;
  productCode: string;
};

export type CreateProductInput = ProductFormValues & {
  createdBy: string;
};

export type UpdateProductInput = ProductFormValues;

export type ProductStockFilter = "all" | "active" | "inactive" | "lowStock";

export type ProductSortMode = "newest" | "oldest";

export type ProductFilters = {
  search: string;
  category: string;
  stockFilter: ProductStockFilter;
  sortMode: ProductSortMode;
};
