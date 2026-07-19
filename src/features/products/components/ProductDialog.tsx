"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/features/products/components/ProductForm";
import type {
  Product,
  ProductFormValues,
} from "@/features/products/types/product";

type ProductDialogProps = {
  mode: "create" | "edit";
  product: Product | null;
  isOpen: boolean;
  isSaving: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: ProductFormValues, imageFile: File | null) => Promise<void>;
};

export function ProductDialog({
  mode,
  product,
  isOpen,
  isSaving,
  onOpenChange,
  onSubmit,
}: ProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Product" : "Edit Product"}
          </DialogTitle>
          <DialogDescription>
            Products created here will later be selectable in quotations and
            invoices.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          key={`${mode}-${product?.id ?? "new"}`}
          mode={mode}
          product={product}
          isSubmitting={isSaving}
          onCancel={() => onOpenChange(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
