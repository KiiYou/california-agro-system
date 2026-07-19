import type { Timestamp } from "firebase/firestore";

import type {
  Product,
  ProductCurrency,
  ProductFormValues,
} from "@/features/products/types/product";

type FirestoreProductData = {
  code?: unknown;
  nameAr?: unknown;
  nameEn?: unknown;
  descriptionAr?: unknown;
  descriptionEn?: unknown;
  category?: unknown;
  unit?: unknown;
  defaultPrice?: unknown;
  currency?: unknown;
  stockQuantity?: unknown;
  minimumStock?: unknown;
  imageUrl?: unknown;
  isActive?: unknown;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
  createdBy?: unknown;
};

const currencies: ProductCurrency[] = ["USD", "EUR", "EGP", "SAR", "AED"];

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function readNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function readCurrency(value: unknown): ProductCurrency {
  return currencies.includes(value as ProductCurrency)
    ? (value as ProductCurrency)
    : "USD";
}

function readDate(value: Timestamp | Date | null | undefined): Date {
  if (value instanceof Date) {
    return value;
  }

  if (value && "toDate" in value) {
    return value.toDate();
  }

  return new Date();
}

export function mapProductDocument(
  id: string,
  data: FirestoreProductData,
): Product {
  return {
    id,
    code: readString(data.code),
    nameAr: readString(data.nameAr),
    nameEn: readString(data.nameEn),
    descriptionAr: readString(data.descriptionAr),
    descriptionEn: readString(data.descriptionEn),
    category: readString(data.category),
    unit: readString(data.unit),
    defaultPrice: readNumber(data.defaultPrice),
    currency: readCurrency(data.currency),
    stockQuantity: readNumber(data.stockQuantity),
    minimumStock: readNumber(data.minimumStock),
    imageUrl: readString(data.imageUrl),
    isActive: typeof data.isActive === "boolean" ? data.isActive : true,
    createdAt: readDate(data.createdAt),
    updatedAt: readDate(data.updatedAt),
    createdBy: readString(data.createdBy),
  };
}

export function mapProductToFormValues(product: Product): ProductFormValues {
  return {
    code: product.code,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    descriptionAr: product.descriptionAr,
    descriptionEn: product.descriptionEn,
    category: product.category,
    unit: product.unit,
    defaultPrice: product.defaultPrice,
    currency: product.currency,
    stockQuantity: product.stockQuantity,
    minimumStock: product.minimumStock,
    imageUrl: product.imageUrl,
    isActive: product.isActive,
  };
}
