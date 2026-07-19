import { User } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="User profile and preferences will connect to Firebase Authentication later."
      />
      <EmptyState
        title="Profile details pending"
        description="Authentication logic is not extended in this phase; this page confirms layout coverage."
        icon={User}
        actionLabel="Edit Profile"
      />
    </div>
  );
}
