import { BarChart3 } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Operational and financial reporting placeholders are ready for future analytics."
      />
      <EmptyState
        title="Reports coming soon"
        description="Report queries and Firestore aggregations are intentionally outside this phase."
        icon={BarChart3}
        actionLabel="Create Report"
      />
    </div>
  );
}
