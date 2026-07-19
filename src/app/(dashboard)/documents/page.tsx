import { FileText } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Quotation and invoice workflows will share one document model in a future phase."
      />
      <EmptyState
        title="Documents module not connected"
        description="The reusable shell is ready; document creation, PDF, print, and sharing will be added later."
        icon={FileText}
        actionLabel="Create Document"
      />
    </div>
  );
}
