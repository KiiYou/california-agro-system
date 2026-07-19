import { create } from "zustand";

import type { Product } from "@/features/products/types/product";

type ProductDialogMode = "create" | "edit";

type ProductUiState = {
  formDialogMode: ProductDialogMode;
  isFormDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedProduct: Product | null;
  productToDelete: Product | null;
  openCreateDialog: () => void;
  openEditDialog: (product: Product) => void;
  closeFormDialog: () => void;
  openDeleteDialog: (product: Product) => void;
  closeDeleteDialog: () => void;
  selectProduct: (product: Product | null) => void;
};

export const useProductUiStore = create<ProductUiState>((set) => ({
  formDialogMode: "create",
  isFormDialogOpen: false,
  isDeleteDialogOpen: false,
  selectedProduct: null,
  productToDelete: null,
  openCreateDialog: () =>
    set({
      formDialogMode: "create",
      isFormDialogOpen: true,
      selectedProduct: null,
    }),
  openEditDialog: (product) =>
    set({
      formDialogMode: "edit",
      isFormDialogOpen: true,
      selectedProduct: product,
    }),
  closeFormDialog: () => set({ isFormDialogOpen: false }),
  openDeleteDialog: (product) =>
    set({
      isDeleteDialogOpen: true,
      productToDelete: product,
    }),
  closeDeleteDialog: () =>
    set({
      isDeleteDialogOpen: false,
      productToDelete: null,
    }),
  selectProduct: (product) => set({ selectedProduct: product }),
}));
