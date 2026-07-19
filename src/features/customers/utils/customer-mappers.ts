import type { Timestamp } from "firebase/firestore";

import type { Customer, CustomerFormValues } from "@/features/customers/types/customer";

type FirestoreCustomerData = {
  companyName?: unknown;
  contactName?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  city?: unknown;
  address?: unknown;
  notes?: unknown;
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
  createdBy?: unknown;
};

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function readDate(value: Timestamp | Date | null | undefined): Date {
  if (value instanceof Date) {
    return value;
  }

  if (value && "toDate" in value) {
    return value.toDate();
  }

  return new Date();
}

export function mapCustomerDocument(
  id: string,
  data: FirestoreCustomerData,
): Customer {
  return {
    id,
    companyName: readString(data.companyName),
    contactName: readString(data.contactName),
    email: readString(data.email),
    phone: readString(data.phone),
    country: readString(data.country),
    city: readString(data.city),
    address: readString(data.address),
    notes: readString(data.notes),
    createdAt: readDate(data.createdAt),
    updatedAt: readDate(data.updatedAt),
    createdBy: readString(data.createdBy),
  };
}

export function mapCustomerToFormValues(customer: Customer): CustomerFormValues {
  return {
    companyName: customer.companyName,
    contactName: customer.contactName,
    email: customer.email,
    phone: customer.phone,
    country: customer.country,
    city: customer.city,
    address: customer.address,
    notes: customer.notes,
  };
}
