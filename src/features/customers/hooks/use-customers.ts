"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "@/features/customers/services/customer-service";
import { filterCustomers, getCustomerCountries } from "@/features/customers/utils/customer-filters";
import type {
  Customer,
  CustomerFilters,
  CustomerFormValues,
} from "@/features/customers/types/customer";

const defaultFilters: CustomerFilters = {
  search: "",
  country: "all",
  sortMode: "newest",
};

function getFriendlyError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filters, setFilters] = useState<CustomerFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const customerList = await getCustomers();
      setCustomers(customerList);
    } catch (loadError) {
      const message = getFriendlyError(loadError);
      setError(message);
      toast.error("Unable to load customers", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadCustomers();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadCustomers]);

  const filteredCustomers = useMemo(
    () => filterCustomers(customers, filters),
    [customers, filters],
  );

  const countryOptions = useMemo(
    () => getCustomerCountries(customers),
    [customers],
  );

  async function handleCreateCustomer(values: CustomerFormValues) {
    setIsSaving(true);

    try {
      await createCustomer({
        ...values,
        createdBy: "system",
      });
      toast.success("Customer created", {
        description: `${values.companyName} was added successfully.`,
      });
      await loadCustomers();
    } catch (createError) {
      const message = getFriendlyError(createError);
      toast.error("Unable to create customer", {
        description: message,
      });
      throw createError;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdateCustomer(
    customerId: string,
    values: CustomerFormValues,
  ) {
    setIsSaving(true);

    try {
      await updateCustomer(customerId, values);
      toast.success("Customer updated", {
        description: `${values.companyName} was updated successfully.`,
      });
      await loadCustomers();
    } catch (updateError) {
      const message = getFriendlyError(updateError);
      toast.error("Unable to update customer", {
        description: message,
      });
      throw updateError;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteCustomer(customer: Customer) {
    setIsDeleting(true);

    try {
      await deleteCustomer(customer.id);
      toast.success("Customer deleted", {
        description: `${customer.companyName} was removed successfully.`,
      });
      await loadCustomers();
    } catch (deleteError) {
      const message = getFriendlyError(deleteError);
      toast.error("Unable to delete customer", {
        description: message,
      });
      throw deleteError;
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    customers,
    filteredCustomers,
    countryOptions,
    filters,
    isLoading,
    isSaving,
    isDeleting,
    error,
    setFilters,
    refreshCustomers: loadCustomers,
    createCustomer: handleCreateCustomer,
    updateCustomer: handleUpdateCustomer,
    deleteCustomer: handleDeleteCustomer,
  };
}
