import { z } from "zod";

export const customerSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required.")
    .max(120, "Company name must be 120 characters or less."),
  contactName: z
    .string()
    .min(1, "Contact name is required.")
    .max(120, "Contact name must be 120 characters or less."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .max(40, "Phone number must be 40 characters or less."),
  country: z.string().max(80, "Country must be 80 characters or less."),
  city: z.string().max(80, "City must be 80 characters or less."),
  address: z.string().max(240, "Address must be 240 characters or less."),
  notes: z.string().max(600, "Notes must be 600 characters or less."),
});

export const customerDefaultValues = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  notes: "",
} satisfies z.infer<typeof customerSchema>;
