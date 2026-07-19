import { Users } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Customer CRUD workflows will be implemented in the customers feature phase."
      />
      <EmptyState
        title="No customers yet"
        description="Firestore-backed customer records are intentionally not connected in this phase."
        icon={Users}
        actionLabel="Add Customer"
      />
    </div>
  );
}
