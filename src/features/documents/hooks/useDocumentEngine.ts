"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getCustomers } from "@/features/customers/services/customer-service";
import type { Customer } from "@/features/customers/types/customer";
import {
  createDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from "@/features/documents/services/document.service";
import { useDocumentStore } from "@/features/documents/store/document-store";
import type {
  BusinessDocument,
  CreateDocumentInput,
  DocumentFilters,
  DocumentType,
} from "@/features/documents/types/document.types";
import { filterDocuments } from "@/features/documents/utils/document-filters";
import { generateDocumentNumber } from "@/features/documents/utils/document-numbering";
import { getProducts } from "@/features/products/services/product-service";
import type { Product } from "@/features/products/types/product";
import { getCompanySettings } from "@/features/settings/services/settings.service";
import type { CompanySettings } from "@/features/settings/types/settings.types";

const defaultFilters: DocumentFilters = {
  search: "",
  type: "all",
  status: "all",
  sortMode: "newest",
};

function getFriendlyError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function useDocumentEngine() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [documents, setDocuments] = useState<BusinessDocument[]>([]);
  const [filters, setFilters] = useState<DocumentFilters>(defaultFilters);
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const draft = useDocumentStore((state) => state.draft);
  const setType = useDocumentStore((state) => state.setType);
  const setNumber = useDocumentStore((state) => state.setNumber);
  const loadDocument = useDocumentStore((state) => state.loadDocument);
  const resetDraft = useDocumentStore((state) => state.resetDraft);

  const loadEngineData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [
        loadedCustomers,
        loadedProducts,
        loadedSettings,
        loadedDocuments,
      ] = await Promise.all([
        getCustomers(),
        getProducts(),
        getCompanySettings(),
        getDocuments(),
      ]);
      const previewNumber = generateDocumentNumber(
        draft.type,
        loadedSettings,
      );

      setCustomers(loadedCustomers);
      setProducts(loadedProducts.filter((product) => product.isActive));
      setSettings(loadedSettings);
      setDocuments(loadedDocuments);

      if (!draft.id) {
        setNumber(previewNumber);
      }
    } catch (loadError) {
      const message = getFriendlyError(loadError);
      setError(message);
      toast.error("Unable to load documents", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [draft.id, draft.type, setNumber]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadEngineData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadEngineData]);

  function updateDocumentType(type: DocumentType) {
    if (!settings) {
      setType(type, draft.number);
      return;
    }

    setType(type, generateDocumentNumber(type, settings));
  }

  const customerOptions = useMemo(
    () =>
      customers.toSorted((first, second) =>
        first.companyName.localeCompare(second.companyName),
      ),
    [customers],
  );

  const productOptions = useMemo(
    () =>
      products.toSorted((first, second) =>
        first.nameEn.localeCompare(second.nameEn),
      ),
    [products],
  );

  const filteredDocuments = useMemo(
    () => filterDocuments(documents, filters),
    [documents, filters],
  );

  async function saveDraft() {
    if (!draft.customerSnapshot) {
      toast.error("Customer is required", {
        description: "Select a customer before saving the document.",
      });
      return;
    }

    setIsSaving(true);

    try {
      const input: CreateDocumentInput = {
        type: draft.type,
        language: draft.language,
        number: draft.number,
        customerId: draft.customerId,
        customerSnapshot: draft.customerSnapshot,
        items: draft.items,
        subtotal: draft.subtotal,
        shipping: draft.shipping,
        tax: draft.tax,
        total: draft.total,
        notes: draft.notes,
        currency: draft.currency,
        status: draft.status,
        createdBy: "system",
      };

      if (draft.id) {
        await updateDocument(draft.id, input);
        toast.success("Document updated", {
          description: `${draft.number} was updated in Firestore.`,
        });
      } else {
        await createDocument(input);
        toast.success("Document draft created", {
          description: `${draft.number} was saved to Firestore.`,
        });
      }

      resetDraft(settings ? generateDocumentNumber(draft.type, settings) : draft.number);
      await loadEngineData();
    } catch (saveError) {
      const message = getFriendlyError(saveError);
      toast.error("Unable to save document", {
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function removeDocument(documentId: string) {
    setIsSaving(true);

    try {
      await deleteDocument(documentId);
      toast.success("Document deleted", {
        description: "The document was removed from Firestore.",
      });

      if (draft.id === documentId) {
        resetDraft(settings ? generateDocumentNumber(draft.type, settings) : draft.number);
      }

      await loadEngineData();
    } catch (deleteError) {
      const message = getFriendlyError(deleteError);
      toast.error("Unable to delete document", {
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  }

  return {
    customers: customerOptions,
    products: productOptions,
    documents,
    filteredDocuments,
    filters,
    settings,
    draft,
    isLoading,
    isSaving,
    error,
    refresh: loadEngineData,
    setFilters,
    setType: updateDocumentType,
    loadDocument,
    saveDraft,
    deleteDocument: removeDocument,
  };
}
