import type {
  DocumentStatus,
  DocumentType,
} from "@/features/documents/types/document.types";

const quotationTransitions: Record<DocumentStatus, DocumentStatus[]> = {
  draft: ["sent"],
  sent: ["accepted", "rejected"],
  accepted: [],
  rejected: [],
  paid: [],
};

const invoiceTransitions: Record<DocumentStatus, DocumentStatus[]> = {
  draft: ["sent"],
  sent: ["paid"],
  accepted: [],
  rejected: [],
  paid: [],
};

export function getAllowedStatuses(type: DocumentType): DocumentStatus[] {
  return type === "invoice"
    ? ["draft", "sent", "paid"]
    : ["draft", "sent", "accepted", "rejected"];
}

export function canTransitionStatus(
  type: DocumentType,
  currentStatus: DocumentStatus,
  nextStatus: DocumentStatus,
): boolean {
  if (currentStatus === nextStatus) {
    return true;
  }

  const transitions =
    type === "invoice" ? invoiceTransitions : quotationTransitions;

  return transitions[currentStatus]?.includes(nextStatus) ?? false;
}

export function assertValidStatusTransition(
  type: DocumentType,
  currentStatus: DocumentStatus,
  nextStatus: DocumentStatus,
) {
  if (!getAllowedStatuses(type).includes(nextStatus)) {
    throw new Error(`Status ${nextStatus} is not valid for ${type}s.`);
  }

  if (!canTransitionStatus(type, currentStatus, nextStatus)) {
    throw new Error(
      `Cannot change status from ${currentStatus} to ${nextStatus}.`,
    );
  }
}
