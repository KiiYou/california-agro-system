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
import type { BusinessDocument } from "@/features/documents/types/document.types";

type DeleteDocumentDialogProps = {
  document: BusinessDocument | null;
  isOpen: boolean;
  isDeleting: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
};

export function DeleteDocumentDialog({
  document,
  isOpen,
  isDeleting,
  onOpenChange,
  onConfirm,
}: DeleteDocumentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex size-11 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" aria-hidden />
          </div>
          <DialogTitle>Delete document</DialogTitle>
          <DialogDescription>
            This will permanently delete{" "}
            <span className="font-medium text-foreground">
              {document?.number ?? "this document"}
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
            disabled={isDeleting || !document}
            onClick={onConfirm}
          >
            {isDeleting ? "Deleting..." : "Delete Document"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
