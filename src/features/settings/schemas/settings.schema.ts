import { z } from "zod";

export const languageSchema = z.enum(["ar", "en"]);
export const currencySchema = z.enum(["USD", "EUR", "EGP"]);

const optionalEmailSchema = z
  .string()
  .trim()
  .refine((value) => value.length === 0 || z.email().safeParse(value).success, {
    message: "Enter a valid email address.",
  });

const optionalWebsiteSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value.length === 0 ||
      z.url().safeParse(value).success ||
      z.url().safeParse(`https://${value}`).success,
    {
      message: "Enter a valid website URL.",
    },
  );

export const settingsSchema = z.object({
  companyNameAr: z
    .string()
    .max(160, "Arabic company name must be 160 characters or less."),
  companyNameEn: z
    .string()
    .max(160, "English company name must be 160 characters or less."),
  phone: z.string().max(40, "Phone must be 40 characters or less."),
  mobile: z.string().max(40, "Mobile must be 40 characters or less."),
  email: optionalEmailSchema,
  website: optionalWebsiteSchema,
  addressAr: z
    .string()
    .max(300, "Arabic address must be 300 characters or less."),
  addressEn: z
    .string()
    .max(300, "English address must be 300 characters or less."),
  taxId: z.string().max(80, "Tax ID must be 80 characters or less."),
  commercialRegister: z
    .string()
    .max(80, "Commercial register must be 80 characters or less."),
  quotationPrefix: z
    .string()
    .trim()
    .min(1, "Quotation prefix is required.")
    .max(12, "Quotation prefix must be 12 characters or less."),
  invoicePrefix: z
    .string()
    .trim()
    .min(1, "Invoice prefix is required.")
    .max(12, "Invoice prefix must be 12 characters or less."),
  quotationCounter: z
    .number()
    .int("Quotation counter must be a whole number.")
    .min(0, "Quotation counter cannot be negative."),
  invoiceCounter: z
    .number()
    .int("Invoice counter must be a whole number.")
    .min(0, "Invoice counter cannot be negative."),
  defaultLanguage: languageSchema,
  defaultCurrency: currencySchema,
  quotationTermsAr: z
    .string()
    .max(2000, "Arabic quotation terms must be 2000 characters or less."),
  quotationTermsEn: z
    .string()
    .max(2000, "English quotation terms must be 2000 characters or less."),
  invoiceTermsAr: z
    .string()
    .max(2000, "Arabic invoice terms must be 2000 characters or less."),
  invoiceTermsEn: z
    .string()
    .max(2000, "English invoice terms must be 2000 characters or less."),
});

export const defaultCompanySettings = {
  companyNameAr: "",
  companyNameEn: "",
  phone: "",
  mobile: "",
  email: "",
  website: "",
  addressAr: "",
  addressEn: "",
  taxId: "",
  commercialRegister: "",
  quotationPrefix: "QT",
  invoicePrefix: "INV",
  quotationCounter: 1,
  invoiceCounter: 1,
  defaultLanguage: "en",
  defaultCurrency: "USD",
  quotationTermsAr: "",
  quotationTermsEn: "",
  invoiceTermsAr: "",
  invoiceTermsEn: "",
} satisfies z.infer<typeof settingsSchema>;
