"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Customer } from "@/features/customers/types/customer";

type CustomerSelectorProps = {
  customers: Customer[];
  selectedCustomerId: string;
  onSelect: (customer: Customer) => void;
};

export function CustomerSelector({
  customers,
  selectedCustomerId,
  onSelect,
}: CustomerSelectorProps) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return customers;
    }

    return customers.filter((customer) =>
      [
        customer.companyName,
        customer.contactName,
        customer.email,
        customer.phone,
        customer.country,
      ].some((value) => value.toLowerCase().includes(normalizedSearch)),
    );
  }, [customers, search]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search customers..."
          className="pl-8"
          aria-label="Search customers"
        />
      </div>
      <div className="max-h-72 space-y-2 overflow-y-auto rounded-lg border bg-card p-2">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <Button
              type="button"
              variant={customer.id === selectedCustomerId ? "secondary" : "ghost"}
              className="h-auto w-full justify-start p-3 text-left"
              key={customer.id}
              onClick={() => onSelect(customer)}
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">
                  {customer.companyName}
                </span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">
                  {customer.contactName} · {customer.email || customer.phone}
                </span>
              </span>
            </Button>
          ))
        ) : (
          <p className="p-4 text-center text-sm text-muted-foreground">
            No customers found.
          </p>
        )}
      </div>
    </div>
  );
}
