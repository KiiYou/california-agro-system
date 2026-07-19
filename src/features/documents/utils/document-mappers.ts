import type { Customer } from "@/features/customers/types/customer";
import type {
  DocumentCustomerSnapshot,
  DocumentItem,
} from "@/features/documents/types/document.types";
import type { Product } from "@/features/products/types/product";

export function mapCustomerToDocumentSnapshot(
  customer: Customer,
): DocumentCustomerSnapshot {
  return {
    companyName: customer.companyName,
    contactName: customer.contactName,
    email: customer.email,
    phone: customer.phone,
    country: customer.country,
    city: customer.city,
    address: customer.address,
  };
}

export function mapProductToDocumentItem(product: Product): DocumentItem {
  return {
    id: crypto.randomUUID(),
    productId: product.id,
    productCode: product.code,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    unit: product.unit,
    quantity: 1,
    unitPrice: product.defaultPrice,
    discountPercent: 0,
    lineTotal: product.defaultPrice,
  };
}
