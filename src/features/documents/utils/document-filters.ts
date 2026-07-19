import type {
  BusinessDocument,
  DocumentFilters,
} from "@/features/documents/types/document.types";

export function filterDocuments(
  documents: BusinessDocument[],
  filters: DocumentFilters,
): BusinessDocument[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return documents
    .filter((document) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        document.number.toLowerCase().includes(normalizedSearch) ||
        document.customerSnapshot.companyName
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesType = filters.type === "all" || document.type === filters.type;
      const matchesStatus =
        filters.status === "all" || document.status === filters.status;

      return matchesSearch && matchesType && matchesStatus;
    })
    .toSorted((first, second) => {
      if (filters.sortMode === "oldest") {
        return first.updatedAt.getTime() - second.updatedAt.getTime();
      }

      if (filters.sortMode === "number") {
        return first.number.localeCompare(second.number);
      }

      if (filters.sortMode === "customerName") {
        return first.customerSnapshot.companyName.localeCompare(
          second.customerSnapshot.companyName,
        );
      }

      if (filters.sortMode === "total") {
        return second.total - first.total;
      }

      return second.updatedAt.getTime() - first.updatedAt.getTime();
    });
}
