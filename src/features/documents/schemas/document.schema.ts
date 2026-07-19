import { z } from "zod";

export const documentTypeSchema = z.enum(["quotation", "invoice"]);
export const documentLanguageSchema = z.enum(["ar", "en"]);
export const documentCurrencySchema = z.enum(["USD", "EUR", "EGP"]);
export const documentStatusSchema = z.enum([
  "draft",
  "sent",
  "accepted",
  "rejected",
  "paid",
]);

export const documentItemSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  productCode: z.string().min(1),
  nameAr: z.string(),
  nameEn: z.string(),
  unit: z.string().min(1),
  quantity: z.number().min(0.01, "Quantity must be greater than zero."),
  unitPrice: z.number().min(0, "Unit price cannot be negative."),
  discountPercent: z
    .number()
    .min(0, "Discount cannot be negative.")
    .max(100, "Discount cannot exceed 100%."),
  lineTotal: z.number().min(0),
});

export const createDocumentSchema = z.object({
  type: documentTypeSchema,
  language: documentLanguageSchema,
  number: z.string().min(1, "Document number is required."),
  customerId: z.string().min(1, "Customer is required."),
  customerSnapshot: z.object({
    companyName: z.string(),
    contactName: z.string(),
    email: z.string(),
    phone: z.string(),
    country: z.string(),
    city: z.string(),
    address: z.string(),
  }),
  items: z.array(documentItemSchema).min(1, "Add at least one product."),
  subtotal: z.number().min(0),
  shipping: z.number().min(0, "Shipping cannot be negative."),
  tax: z.number().min(0, "Tax cannot be negative."),
  total: z.number().min(0),
  notes: z.string().max(1000, "Notes must be 1000 characters or less."),
  currency: documentCurrencySchema,
  status: documentStatusSchema,
  createdBy: z.string().min(1),
});
