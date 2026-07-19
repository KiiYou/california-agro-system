import type {
  Customer,
  CustomerFilters,
} from "@/features/customers/types/customer";

const recentWindowInMs = 1000 * 60 * 60 * 24 * 30;

export function getCustomerCountries(customers: Customer[]): string[] {
  return Array.from(
    new Set(
      customers
        .map((customer) => customer.country.trim())
        .filter((country) => country.length > 0),
    ),
  ).sort((first, second) => first.localeCompare(second));
}

export function filterCustomers(
  customers: Customer[],
  filters: CustomerFilters,
): Customer[] {
  const normalizedSearch = filters.search.trim().toLowerCase();
  const now = Date.now();

  return customers
    .filter((customer) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          customer.companyName,
          customer.contactName,
          customer.phone,
          customer.email,
          customer.country,
        ].some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesCountry =
        filters.country === "all" || customer.country === filters.country;

      const matchesRecent =
        filters.sortMode !== "recentlyAdded" ||
        now - customer.createdAt.getTime() <= recentWindowInMs;

      return matchesSearch && matchesCountry && matchesRecent;
    })
    .toSorted((first, second) => {
      if (filters.sortMode === "oldest") {
        return first.createdAt.getTime() - second.createdAt.getTime();
      }

      return second.createdAt.getTime() - first.createdAt.getTime();
    });
}
