import { Settings } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Company profile, logo, language, and tax settings will live here."
      />
      <EmptyState
        title="Settings are not configured"
        description="This phase only establishes the shared ERP workspace layout."
        icon={Settings}
        actionLabel="Open Settings"
      />
    </div>
  );
}
