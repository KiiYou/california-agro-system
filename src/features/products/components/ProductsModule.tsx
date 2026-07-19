"use client";

import { Package, Plus } from "lucide-react";

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
import { DeleteProductDialog } from "@/features/products/components/DeleteProductDialog";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductDialog } from "@/features/products/components/ProductDialog";
import { ProductToolbar } from "@/features/products/components/ProductToolbar";
import { ProductsLoadingSkeleton } from "@/features/products/components/ProductsLoadingSkeleton";
import { ProductsTable } from "@/features/products/components/ProductsTable";
import { useProducts } from "@/features/products/hooks/use-products";
import { useProductUiStore } from "@/features/products/store/product-ui-store";
import type { ProductFormValues } from "@/features/products/types/product";
import { isLowStock } from "@/features/products/utils/product-filters";

export function ProductsModule() {
  const {
    products,
    filteredProducts,
    categoryOptions,
    filters,
    isLoading,
    isSaving,
    isDeleting,
    error,
    setFilters,
    refreshProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const {
    formDialogMode,
    isFormDialogOpen,
    isDeleteDialogOpen,
    selectedProduct,
    productToDelete,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
    openDeleteDialog,
    closeDeleteDialog,
    selectProduct,
  } = useProductUiStore();

  const activeCount = products.filter((product) => product.isActive).length;
  const lowStockCount = products.filter(isLowStock).length;

  async function handleSubmit(
    values: ProductFormValues,
    imageFile: File | null,
  ) {
    if (formDialogMode === "edit" && selectedProduct) {
      await updateProduct(selectedProduct.id, values, imageFile);
    } else {
      await createProduct(values, imageFile);
    }

    closeFormDialog();
  }

  async function handleDelete() {
    if (!productToDelete) {
      return;
    }

    await deleteProduct(productToDelete);

    if (selectedProduct?.id === productToDelete.id) {
      selectProduct(null);
    }

    closeDeleteDialog();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage export-ready agricultural products for future quotations and invoices."
        actions={
          <Button type="button" onClick={openCreateDialog}>
            <Plus className="size-4" aria-hidden />
            New Product
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Total Products" description="All catalog records" value={products.length} />
        <MetricCard title="Active Products" description="Selectable later in documents" value={activeCount} />
        <MetricCard title="Low Stock" description="Below minimum stock" value={lowStockCount} />
        <MetricCard title="Categories" description="Unique product groups" value={categoryOptions.length} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>
            Search, filter, sort, paginate, select rows, and control visible
            columns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProductToolbar
            filters={filters}
            categoryOptions={categoryOptions}
            isLoading={isLoading}
            onFiltersChange={setFilters}
            onRefresh={() => void refreshProducts()}
          />

          {isLoading ? (
            <ProductsLoadingSkeleton />
          ) : error ? (
            <EmptyState
              title="Products could not be loaded"
              description={error}
              icon={Package}
              actionLabel="Check Firebase Config"
            />
          ) : products.length === 0 ? (
            <EmptyState
              title="No products yet"
              description="Create your first product to prepare the catalog for quotations and invoices."
              icon={Package}
              actionLabel="Add Product"
            />
          ) : (
            <ProductsTable
              products={filteredProducts}
              onView={selectProduct}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          )}
        </CardContent>
      </Card>

      <ProductDetails product={selectedProduct} />

      <ProductDialog
        mode={formDialogMode}
        product={selectedProduct}
        isOpen={isFormDialogOpen}
        isSaving={isSaving}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeFormDialog();
          }
        }}
        onSubmit={handleSubmit}
      />

      <DeleteProductDialog
        product={productToDelete}
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeDeleteDialog();
          }
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function MetricCard({
  title,
  description,
  value,
}: {
  title: string;
  description: string;
  value: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
