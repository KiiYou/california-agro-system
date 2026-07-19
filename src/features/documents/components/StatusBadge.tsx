import { Badge } from "@/components/ui/badge";
import type { DocumentStatus } from "@/features/documents/types/document.types";

type StatusBadgeProps = {
  status: DocumentStatus;
};

const statusLabels: Record<DocumentStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  rejected: "Rejected",
  paid: "Paid",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "accepted" || status === "paid") {
    return <Badge className="bg-emerald-600 text-white">{statusLabels[status]}</Badge>;
  }

  if (status === "rejected") {
    return <Badge variant="destructive">{statusLabels[status]}</Badge>;
  }

  return (
    <Badge variant={status === "draft" ? "secondary" : "outline"}>
      {statusLabels[status]}
    </Badge>
  );
}
