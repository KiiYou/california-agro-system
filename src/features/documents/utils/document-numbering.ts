import type { DocumentType } from "@/features/documents/types/document.types";
import type { CompanySettings } from "@/features/settings/types/settings.types";

export function generateDocumentNumber(
  type: DocumentType,
  settings: CompanySettings,
): string {
  const prefix =
    type === "quotation" ? settings.quotationPrefix : settings.invoicePrefix;
  const counter =
    type === "quotation" ? settings.quotationCounter : settings.invoiceCounter;

  return `${prefix}-${String(counter).padStart(6, "0")}`;
}
