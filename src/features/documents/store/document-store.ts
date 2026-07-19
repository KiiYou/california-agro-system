import { create } from "zustand";

import type { Customer } from "@/features/customers/types/customer";
import type {
  BusinessDocument,
  DocumentCurrency,
  DocumentDraft,
  DocumentItem,
  DocumentLanguage,
  DocumentStatus,
  DocumentType,
} from "@/features/documents/types/document.types";
import { calculateDocumentTotals, recalculateItem } from "@/features/documents/utils/document-calculations";
import { mapCustomerToDocumentSnapshot } from "@/features/documents/utils/document-mappers";

type DocumentStore = {
  draft: DocumentDraft;
  setType: (type: DocumentType, number: string) => void;
  setLanguage: (language: DocumentLanguage) => void;
  setCurrency: (currency: DocumentCurrency) => void;
  setStatus: (status: DocumentStatus) => void;
  setCustomer: (customer: Customer) => void;
  setNumber: (number: string) => void;
  loadDocument: (document: BusinessDocument) => void;
  setNotes: (notes: string) => void;
  setShipping: (shipping: number) => void;
  setTax: (tax: number) => void;
  addItem: (item: DocumentItem) => void;
  removeItem: (itemId: string) => void;
  updateItem: (
    itemId: string,
    values: Partial<Pick<DocumentItem, "quantity" | "unitPrice" | "discountPercent">>,
  ) => void;
  resetDraft: (number: string) => void;
};

const initialDraft: DocumentDraft = {
  id: null,
  type: "quotation",
  language: "en",
  number: "QT-000001",
  customerId: "",
  customerSnapshot: null,
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  notes: "",
  currency: "USD",
  status: "draft",
};

function withTotals(draft: DocumentDraft): DocumentDraft {
  return {
    ...draft,
    ...calculateDocumentTotals(draft.items, draft.shipping, draft.tax),
  };
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  draft: initialDraft,
  setType: (type, number) =>
    set((state) => ({
      draft: {
        ...state.draft,
        type,
        number,
        status: type === "quotation" && state.draft.status === "paid" ? "draft" : state.draft.status,
      },
    })),
  setLanguage: (language) =>
    set((state) => ({ draft: { ...state.draft, language } })),
  setCurrency: (currency) =>
    set((state) => ({ draft: { ...state.draft, currency } })),
  setStatus: (status) => set((state) => ({ draft: { ...state.draft, status } })),
  setCustomer: (customer) =>
    set((state) => ({
      draft: {
        ...state.draft,
        customerId: customer.id,
        customerSnapshot: mapCustomerToDocumentSnapshot(customer),
      },
    })),
  setNumber: (number) => set((state) => ({ draft: { ...state.draft, number } })),
  loadDocument: (document) =>
    set({
      draft: {
        id: document.id,
        type: document.type,
        language: document.language,
        number: document.number,
        customerId: document.customerId,
        customerSnapshot: document.customerSnapshot,
        items: document.items,
        subtotal: document.subtotal,
        shipping: document.shipping,
        tax: document.tax,
        total: document.total,
        notes: document.notes,
        currency: document.currency,
        status: document.status,
      },
    }),
  setNotes: (notes) => set((state) => ({ draft: { ...state.draft, notes } })),
  setShipping: (shipping) =>
    set((state) => ({
      draft: withTotals({ ...state.draft, shipping }),
    })),
  setTax: (tax) =>
    set((state) => ({
      draft: withTotals({ ...state.draft, tax }),
    })),
  addItem: (item) =>
    set((state) => ({
      draft: withTotals({
        ...state.draft,
        items: [...state.draft.items, recalculateItem(item)],
      }),
    })),
  removeItem: (itemId) =>
    set((state) => ({
      draft: withTotals({
        ...state.draft,
        items: state.draft.items.filter((item) => item.id !== itemId),
      }),
    })),
  updateItem: (itemId, values) =>
    set((state) => ({
      draft: withTotals({
        ...state.draft,
        items: state.draft.items.map((item) =>
          item.id === itemId ? recalculateItem({ ...item, ...values }) : item,
        ),
      }),
    })),
  resetDraft: (number) =>
    set({
      draft: {
        ...initialDraft,
        id: null,
        number,
      },
    }),
}));
