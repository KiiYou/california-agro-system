"use client";

import { RefreshCcw, Settings } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { SettingsForm } from "@/features/settings/components/SettingsForm";
import { useSettings } from "@/features/settings/hooks/useSettings";

export function SettingsModule() {
  const {
    settings,
    isLoading,
    isSaving,
    error,
    refreshSettings,
    saveSettings,
  } = useSettings();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure company identity, document numbering, defaults, and bilingual terms."
        actions={
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => void refreshSettings()}
          >
            <RefreshCcw className="size-4" aria-hidden />
            Refresh
          </Button>
        }
      />

      {isLoading ? (
        <SettingsLoadingSkeleton />
      ) : error ? (
        <EmptyState
          title="Settings could not be loaded"
          description={error}
          icon={Settings}
          actionLabel="Check Firebase Config"
        />
      ) : (
        <SettingsForm
          settings={settings}
          isSaving={isSaving}
          onSubmit={saveSettings}
        />
      )}
    </div>
  );
}

function SettingsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className="h-48 animate-pulse rounded-lg border bg-muted/50"
          key={index}
        />
      ))}
    </div>
  );
}
