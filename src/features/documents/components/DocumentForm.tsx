"use client";

import { FileText, RefreshCcw, Save } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CustomerSelector } from "@/features/documents/components/CustomerSelector";
import { DocumentHeader } from "@/features/documents/components/DocumentHeader";
import { ItemsTable } from "@/features/documents/components/ItemsTable";
import { ProductSelector } from "@/features/documents/components/ProductSelector";
import { TotalsCard } from "@/features/documents/components/TotalsCard";
import { useDocumentEngine } from "@/features/documents/hooks/useDocumentEngine";
import { useDocumentStore } from "@/features/documents/store/document-store";
import { mapProductToDocumentItem } from "@/features/documents/utils/document-mappers";

export function DocumentForm() {
  const {
    customers,
    products,
    draft,
    isLoading,
    isSaving,
    error,
    refresh,
    setType,
    saveDraft,
  } = useDocumentEngine();

  const setLanguage = useDocumentStore((state) => state.setLanguage);
  const setCurrency = useDocumentStore((state) => state.setCurrency);
  const setStatus = useDocumentStore((state) => state.setStatus);
  const setCustomer = useDocumentStore((state) => state.setCustomer);
  const setNotes = useDocumentStore((state) => state.setNotes);
  const setShipping = useDocumentStore((state) => state.setShipping);
  const setTax = useDocumentStore((state) => state.setTax);
  const addItem = useDocumentStore((state) => state.addItem);
  const removeItem = useDocumentStore((state) => state.removeItem);
  const updateItem = useDocumentStore((state) => state.updateItem);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Create quotation and invoice drafts with live customer, product, and total calculations."
        actions={
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => void refresh()}
            >
              <RefreshCcw className="size-4" aria-hidden />
              Refresh
            </Button>
            <Button type="button" disabled={isSaving} onClick={() => void saveDraft()}>
              <Save className="size-4" aria-hidden />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <DocumentLoadingSkeleton />
      ) : error ? (
        <EmptyState
          title="Document engine could not be loaded"
          description={error}
          icon={FileText}
          actionLabel="Check Firebase Rules"
        />
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Document Header</CardTitle>
              <CardDescription>
                Choose document type, language, currency, status, and preview
                number.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentHeader
                type={draft.type}
                language={draft.language}
                currency={draft.currency}
                status={draft.status}
                number={draft.number}
                onTypeChange={setType}
                onLanguageChange={setLanguage}
                onCurrencyChange={setCurrency}
                onStatusChange={setStatus}
              />
            </CardContent>
          </Card>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Customer Selector</CardTitle>
                <CardDescription>
                  Search and select a Firestore customer snapshot.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerSelector
                  customers={customers}
                  selectedCustomerId={draft.customerId}
                  onSelect={setCustomer}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Selector</CardTitle>
                <CardDescription>
                  Search active products and add them as document items.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductSelector
                  products={products}
                  onAddProduct={(product) => addItem(mapProductToDocumentItem(product))}
                />
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.8fr_24rem]">
            <Card>
              <CardHeader>
                <CardTitle>Document Items</CardTitle>
                <CardDescription>
                  Update quantity, unit price, and discount to recalculate
                  totals instantly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ItemsTable
                  items={draft.items}
                  onRemoveItem={removeItem}
                  onUpdateItem={updateItem}
                />
              </CardContent>
            </Card>

            <TotalsCard
              subtotal={draft.subtotal}
              shipping={draft.shipping}
              tax={draft.tax}
              total={draft.total}
              currency={draft.currency}
              onShippingChange={setShipping}
              onTaxChange={setTax}
            />
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>
                Internal or customer-facing notes for this draft.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={draft.notes}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-28"
                placeholder="Add document notes..."
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function DocumentLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-40 animate-pulse rounded-lg border bg-muted/50" />
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="h-80 animate-pulse rounded-lg border bg-muted/50" />
        <div className="h-80 animate-pulse rounded-lg border bg-muted/50" />
      </div>
      <div className="h-96 animate-pulse rounded-lg border bg-muted/50" />
    </div>
  );
}
