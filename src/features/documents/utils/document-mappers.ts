import type { Customer } from "@/features/customers/types/customer";
import type {
  BusinessDocument,
  DocumentCustomerSnapshot,
  DocumentItem,
} from "@/features/documents/types/document.types";
import type { Product } from "@/features/products/types/product";
import type { Timestamp } from "firebase/firestore";

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
    descriptionAr: product.descriptionAr,
    descriptionEn: product.descriptionEn,
    unit: product.unit,
    quantity: 1,
    unitPrice: product.defaultPrice,
    discountPercent: 0,
    lineTotal: product.defaultPrice,
  };
}

type FirestoreDocumentData = {
  type?: unknown;
  language?: unknown;
  number?: unknown;
  customerId?: unknown;
  customerSnapshot?: unknown;
  items?: unknown;
  subtotal?: unknown;
  shipping?: unknown;
  tax?: unknown;
  total?: unknown;
  notes?: unknown;
  currency?: unknown;
  status?: unknown;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
  createdBy?: unknown;
};

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function readNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
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

function readCustomerSnapshot(value: unknown): DocumentCustomerSnapshot {
  const snapshot = value && typeof value === "object" ? value as Record<string, unknown> : {};

  return {
    companyName: readString(snapshot.companyName),
    contactName: readString(snapshot.contactName),
    email: readString(snapshot.email),
    phone: readString(snapshot.phone),
    country: readString(snapshot.country),
    city: readString(snapshot.city),
    address: readString(snapshot.address),
  };
}

function readItems(value: unknown): DocumentItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((itemValue, index) => {
    const item = itemValue && typeof itemValue === "object" ? itemValue as Record<string, unknown> : {};

    return {
      id: readString(item.id) || `item-${index}`,
      productId: readString(item.productId),
      productCode: readString(item.productCode),
      nameAr: readString(item.nameAr),
      nameEn: readString(item.nameEn),
      descriptionAr: readString(item.descriptionAr),
      descriptionEn: readString(item.descriptionEn),
      unit: readString(item.unit),
      quantity: readNumber(item.quantity),
      unitPrice: readNumber(item.unitPrice),
      discountPercent: readNumber(item.discountPercent),
      lineTotal: readNumber(item.lineTotal),
    };
  });
}

export function mapDocumentDocument(
  id: string,
  data: FirestoreDocumentData,
): BusinessDocument {
  return {
    id,
    type: data.type === "invoice" ? "invoice" : "quotation",
    language: data.language === "ar" ? "ar" : "en",
    number: readString(data.number),
    customerId: readString(data.customerId),
    customerSnapshot: readCustomerSnapshot(data.customerSnapshot),
    items: readItems(data.items),
    subtotal: readNumber(data.subtotal),
    shipping: readNumber(data.shipping),
    tax: readNumber(data.tax),
    total: readNumber(data.total),
    notes: readString(data.notes),
    currency: data.currency === "EUR" || data.currency === "EGP" ? data.currency : "USD",
    status:
      data.status === "sent" ||
      data.status === "accepted" ||
      data.status === "rejected" ||
      data.status === "paid"
        ? data.status
        : "draft",
    createdAt: readDate(data.createdAt),
    updatedAt: readDate(data.updatedAt),
    createdBy: readString(data.createdBy),
  };
}
