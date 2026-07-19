"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/features/products/types/product";

type DeleteProductDialogProps = {
  product: Product | null;
  isOpen: boolean;
  isDeleting: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
};

export function DeleteProductDialog({
  product,
  isOpen,
  isDeleting,
  onOpenChange,
  onConfirm,
}: DeleteProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex size-11 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" aria-hidden />
          </div>
          <DialogTitle>Delete product</DialogTitle>
          <DialogDescription>
            This will permanently delete{" "}
            <span className="font-medium text-foreground">
              {product?.nameEn ?? "this product"}
            </span>
            . This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !product}
            onClick={onConfirm}
          >
            {isDeleting ? "Deleting..." : "Delete Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
