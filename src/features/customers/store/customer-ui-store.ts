import { create } from "zustand";

import type { Customer } from "@/features/customers/types/customer";

type CustomerDialogMode = "create" | "edit";

type CustomerUiState = {
  formDialogMode: CustomerDialogMode;
  isFormDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedCustomer: Customer | null;
  customerToDelete: Customer | null;
  openCreateDialog: () => void;
  openEditDialog: (customer: Customer) => void;
  closeFormDialog: () => void;
  openDeleteDialog: (customer: Customer) => void;
  closeDeleteDialog: () => void;
  selectCustomer: (customer: Customer | null) => void;
};

export const useCustomerUiStore = create<CustomerUiState>((set) => ({
  formDialogMode: "create",
  isFormDialogOpen: false,
  isDeleteDialogOpen: false,
  selectedCustomer: null,
  customerToDelete: null,
  openCreateDialog: () =>
    set({
      formDialogMode: "create",
      isFormDialogOpen: true,
      selectedCustomer: null,
    }),
  openEditDialog: (customer) =>
    set({
      formDialogMode: "edit",
      isFormDialogOpen: true,
      selectedCustomer: customer,
    }),
  closeFormDialog: () => set({ isFormDialogOpen: false }),
  openDeleteDialog: (customer) =>
    set({
      isDeleteDialogOpen: true,
      customerToDelete: customer,
    }),
  closeDeleteDialog: () =>
    set({
      isDeleteDialogOpen: false,
      customerToDelete: null,
    }),
  selectCustomer: (customer) => set({ selectedCustomer: customer }),
}));
