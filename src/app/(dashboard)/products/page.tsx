import { Package } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Product management screens will use this layout when the products feature is built."
      />
      <EmptyState
        title="Product catalog pending"
        description="Mock shell only. Product data and Firestore services will arrive in a later phase."
        icon={Package}
        actionLabel="Add Product"
      />
    </div>
  );
}
