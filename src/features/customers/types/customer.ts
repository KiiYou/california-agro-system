export type Customer = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};

export type CustomerFormValues = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  notes: string;
};

export type CreateCustomerInput = CustomerFormValues & {
  createdBy: string;
};

export type UpdateCustomerInput = CustomerFormValues;

export type CustomerSortMode = "newest" | "oldest" | "recentlyAdded";

export type CustomerFilters = {
  search: string;
  country: string;
  sortMode: CustomerSortMode;
};
