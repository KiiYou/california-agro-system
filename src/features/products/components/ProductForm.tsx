"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  productDefaultValues,
  productSchema,
} from "@/features/products/schemas/product-schema";
import type {
  Product,
  ProductCurrency,
  ProductFormValues,
} from "@/features/products/types/product";
import { mapProductToFormValues } from "@/features/products/utils/product-mappers";

type ProductFormProps = {
  mode: "create" | "edit";
  product?: Product | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues, imageFile: File | null) => Promise<void>;
};

const currencies: ProductCurrency[] = ["USD", "EUR", "EGP", "SAR", "AED"];

export function ProductForm({
  mode,
  product,
  isSubmitting,
  onCancel,
  onSubmit,
}: ProductFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValues,
  });

  const currency = useWatch({ control, name: "currency" });
  const isActive = useWatch({ control, name: "isActive" });
  const imageUrl = useWatch({ control, name: "imageUrl" });

  useEffect(() => {
    reset(product ? mapProductToFormValues(product) : productDefaultValues);
  }, [product, reset]);

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) => onSubmit(values, imageFile))}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Product Code" error={errors.code?.message} required>
          <Input
            placeholder="CITRUS-G1"
            aria-invalid={Boolean(errors.code)}
            disabled={isSubmitting || mode === "edit"}
            {...register("code")}
          />
        </FormField>
        <FormField label="Unit" error={errors.unit?.message} required>
          <Input
            placeholder="Carton, KG, Ton"
            aria-invalid={Boolean(errors.unit)}
            disabled={isSubmitting}
            {...register("unit")}
          />
        </FormField>
        <FormField label="Arabic Name" error={errors.nameAr?.message} required>
          <Input
            dir="rtl"
            placeholder="برتقال فاخر"
            aria-invalid={Boolean(errors.nameAr)}
            disabled={isSubmitting}
            {...register("nameAr")}
          />
        </FormField>
        <FormField label="English Name" error={errors.nameEn?.message} required>
          <Input
            placeholder="Premium Oranges"
            aria-invalid={Boolean(errors.nameEn)}
            disabled={isSubmitting}
            {...register("nameEn")}
          />
        </FormField>
        <FormField label="Category" error={errors.category?.message}>
          <Input
            placeholder="Citrus"
            aria-invalid={Boolean(errors.category)}
            disabled={isSubmitting}
            {...register("category")}
          />
        </FormField>
        <FormField label="Currency" error={errors.currency?.message} required>
          <Select
            value={currency}
            onValueChange={(value: ProductCurrency) => setValue("currency", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Default Price" error={errors.defaultPrice?.message} required>
          <Input
            type="number"
            step="0.01"
            min="0"
            aria-invalid={Boolean(errors.defaultPrice)}
            disabled={isSubmitting}
            {...register("defaultPrice", { valueAsNumber: true })}
          />
        </FormField>
        <FormField label="Current Stock" error={errors.stockQuantity?.message} required>
          <Input
            type="number"
            step="1"
            min="0"
            aria-invalid={Boolean(errors.stockQuantity)}
            disabled={isSubmitting}
            {...register("stockQuantity", { valueAsNumber: true })}
          />
        </FormField>
        <FormField label="Minimum Stock" error={errors.minimumStock?.message}>
          <Input
            type="number"
            step="1"
            min="0"
            aria-invalid={Boolean(errors.minimumStock)}
            disabled={isSubmitting}
            {...register("minimumStock", { valueAsNumber: true })}
          />
        </FormField>
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
          <input
            id="isActive"
            type="checkbox"
            className="size-4 rounded border-input"
            checked={isActive}
            disabled={isSubmitting}
            onChange={(event) => setValue("isActive", event.target.checked)}
          />
          <label htmlFor="isActive" className="text-sm font-medium text-foreground">
            Product is active
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Arabic Description" error={errors.descriptionAr?.message}>
          <Textarea
            dir="rtl"
            placeholder="وصف المنتج باللغة العربية"
            aria-invalid={Boolean(errors.descriptionAr)}
            disabled={isSubmitting}
            {...register("descriptionAr")}
          />
        </FormField>
        <FormField label="English Description" error={errors.descriptionEn?.message}>
          <Textarea
            placeholder="Product details, grade, packaging, or quality notes"
            aria-invalid={Boolean(errors.descriptionEn)}
            disabled={isSubmitting}
            {...register("descriptionEn")}
          />
        </FormField>
      </div>

      <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <ImagePlus className="size-4" aria-hidden />
          Product Image
        </div>
        <Input
          type="file"
          accept="image/*"
          disabled={isSubmitting}
          onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
        />
        <Input
          placeholder="Existing image URL"
          aria-invalid={Boolean(errors.imageUrl)}
          disabled={isSubmitting}
          {...register("imageUrl")}
        />
        {imageFile ? (
          <p className="text-xs text-muted-foreground">
            Selected image: {imageFile.name}
          </p>
        ) : imageUrl ? (
          <p className="text-xs text-muted-foreground">
            Existing image URL will be kept unless a new file is selected.
          </p>
        ) : null}
        {errors.imageUrl?.message ? (
          <p className="text-xs text-destructive">{errors.imageUrl.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create Product"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

function FormField({
  label,
  error,
  required = false,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
