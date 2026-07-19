"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  uploadProductImage,
} from "@/features/products/services/product-service";
import type {
  Product,
  ProductFilters,
  ProductFormValues,
} from "@/features/products/types/product";
import {
  filterProducts,
  getProductCategories,
} from "@/features/products/utils/product-filters";

const defaultFilters: ProductFilters = {
  search: "",
  category: "all",
  stockFilter: "all",
  sortMode: "newest",
};

function getFriendlyError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (loadError) {
      const message = getFriendlyError(loadError);
      setError(message);
      toast.error("Unable to load products", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadProducts();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadProducts]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters, products],
  );

  const categoryOptions = useMemo(
    () => getProductCategories(products),
    [products],
  );

  async function handleCreateProduct(
    values: ProductFormValues,
    imageFile: File | null,
  ) {
    setIsSaving(true);

    try {
      const imageUrl = imageFile
        ? await uploadProductImage({ file: imageFile, productCode: values.code })
        : values.imageUrl;

      await createProduct({
        ...values,
        imageUrl,
        createdBy: "system",
      });
      toast.success("Product created", {
        description: `${values.nameEn} was added successfully.`,
      });
      await loadProducts();
    } catch (createError) {
      const message = getFriendlyError(createError);
      toast.error("Unable to create product", {
        description: message,
      });
      throw createError;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdateProduct(
    productId: string,
    values: ProductFormValues,
    imageFile: File | null,
  ) {
    setIsSaving(true);

    try {
      const imageUrl = imageFile
        ? await uploadProductImage({ file: imageFile, productCode: values.code })
        : values.imageUrl;

      await updateProduct(productId, {
        ...values,
        imageUrl,
      });
      toast.success("Product updated", {
        description: `${values.nameEn} was updated successfully.`,
      });
      await loadProducts();
    } catch (updateError) {
      const message = getFriendlyError(updateError);
      toast.error("Unable to update product", {
        description: message,
      });
      throw updateError;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteProduct(product: Product) {
    setIsDeleting(true);

    try {
      await deleteProduct(product.id);
      toast.success("Product deleted", {
        description: `${product.nameEn} was removed successfully.`,
      });
      await loadProducts();
    } catch (deleteError) {
      const message = getFriendlyError(deleteError);
      toast.error("Unable to delete product", {
        description: message,
      });
      throw deleteError;
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    products,
    filteredProducts,
    categoryOptions,
    filters,
    isLoading,
    isSaving,
    isDeleting,
    error,
    setFilters,
    refreshProducts: loadProducts,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
}
