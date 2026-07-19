import { z } from "zod";

export const productCurrencySchema = z.enum(["USD", "EUR", "EGP", "SAR", "AED"]);

export const productSchema = z.object({
  code: z
    .string()
    .min(1, "Product code is required.")
    .max(40, "Product code must be 40 characters or less."),
  nameAr: z
    .string()
    .min(1, "Arabic name is required.")
    .max(140, "Arabic name must be 140 characters or less."),
  nameEn: z
    .string()
    .min(1, "English name is required.")
    .max(140, "English name must be 140 characters or less."),
  descriptionAr: z
    .string()
    .max(600, "Arabic description must be 600 characters or less."),
  descriptionEn: z
    .string()
    .max(600, "English description must be 600 characters or less."),
  category: z.string().max(80, "Category must be 80 characters or less."),
  unit: z
    .string()
    .min(1, "Unit is required.")
    .max(40, "Unit must be 40 characters or less."),
  defaultPrice: z
    .number()
    .min(0, "Price cannot be negative.")
    .finite("Enter a valid price."),
  currency: productCurrencySchema,
  stockQuantity: z
    .number()
    .min(0, "Stock cannot be negative.")
    .finite("Enter a valid stock quantity."),
  minimumStock: z
    .number()
    .min(0, "Minimum stock cannot be negative.")
    .finite("Enter a valid minimum stock."),
  imageUrl: z.string().url("Image URL must be valid.").or(z.literal("")),
  isActive: z.boolean(),
});

export const productDefaultValues = {
  code: "",
  nameAr: "",
  nameEn: "",
  descriptionAr: "",
  descriptionEn: "",
  category: "",
  unit: "",
  defaultPrice: 0,
  currency: "USD",
  stockQuantity: 0,
  minimumStock: 0,
  imageUrl: "",
  isActive: true,
} satisfies z.infer<typeof productSchema>;
