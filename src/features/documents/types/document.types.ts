import type { AppCurrency, AppLanguage } from "@/features/settings/types/settings.types";

export type DocumentType = "quotation" | "invoice";
export type DocumentLanguage = AppLanguage;
export type DocumentCurrency = AppCurrency;
export type DocumentStatus = "draft" | "sent" | "accepted" | "rejected" | "paid";

export type DocumentCustomerSnapshot = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
};

export type DocumentItem = {
  id: string;
  productId: string;
  productCode: string;
  nameAr: string;
  nameEn: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  lineTotal: number;
};

export type DocumentTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export type BusinessDocument = DocumentTotals & {
  id: string;
  type: DocumentType;
  language: DocumentLanguage;
  number: string;
  customerId: string;
  customerSnapshot: DocumentCustomerSnapshot;
  items: DocumentItem[];
  notes: string;
  currency: DocumentCurrency;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};

export type DocumentDraft = DocumentTotals & {
  type: DocumentType;
  language: DocumentLanguage;
  number: string;
  customerId: string;
  customerSnapshot: DocumentCustomerSnapshot | null;
  items: DocumentItem[];
  notes: string;
  currency: DocumentCurrency;
  status: DocumentStatus;
};

export type CreateDocumentInput = Omit<
  BusinessDocument,
  "id" | "createdAt" | "updatedAt"
>;
