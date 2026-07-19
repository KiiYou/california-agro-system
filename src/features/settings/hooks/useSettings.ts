"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { defaultCompanySettings } from "@/features/settings/schemas/settings.schema";
import {
  getCompanySettings,
  updateCompanySettings,
} from "@/features/settings/services/settings.service";
import type { CompanySettings } from "@/features/settings/types/settings.types";

function getFriendlyError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function useSettings() {
  const [settings, setSettings] =
    useState<CompanySettings>(defaultCompanySettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedSettings = await getCompanySettings();
      setSettings(loadedSettings);
    } catch (loadError) {
      const message = getFriendlyError(loadError);
      setError(message);
      toast.error("Unable to load settings", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadSettings();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadSettings]);

  async function saveSettings(values: CompanySettings) {
    setIsSaving(true);

    try {
      await updateCompanySettings(values);
      setSettings(values);
      toast.success("Settings saved", {
        description: "Company settings were updated successfully.",
      });
      await loadSettings();
    } catch (saveError) {
      const message = getFriendlyError(saveError);
      toast.error("Unable to save settings", {
        description: message,
      });
      throw saveError;
    } finally {
      setIsSaving(false);
    }
  }

  return {
    settings,
    isLoading,
    isSaving,
    error,
    refreshSettings: loadSettings,
    saveSettings,
  };
}
