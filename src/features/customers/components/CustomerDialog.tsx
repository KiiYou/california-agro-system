"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerForm } from "@/features/customers/components/CustomerForm";
import type {
  Customer,
  CustomerFormValues,
} from "@/features/customers/types/customer";

type CustomerDialogProps = {
  mode: "create" | "edit";
  customer: Customer | null;
  isOpen: boolean;
  isSaving: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: CustomerFormValues) => Promise<void>;
};

export function CustomerDialog({
  mode,
  customer,
  isOpen,
  isSaving,
  onOpenChange,
  onSubmit,
}: CustomerDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Customer" : "Edit Customer"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new customer profile for quotations and invoices."
              : "Update customer profile information."}
          </DialogDescription>
        </DialogHeader>
        <CustomerForm
          mode={mode}
          customer={customer}
          isSubmitting={isSaving}
          onCancel={() => onOpenChange(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
