"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CompanyLogo } from "@/features/settings/components/CompanyLogo";
import { SettingsCard } from "@/features/settings/components/SettingsCard";
import { SettingsSection } from "@/features/settings/components/SettingsSection";
import {
  defaultCompanySettings,
  settingsSchema,
} from "@/features/settings/schemas/settings.schema";
import type {
  AppCurrency,
  AppLanguage,
  CompanySettings,
} from "@/features/settings/types/settings.types";

type SettingsFormProps = {
  settings: CompanySettings;
  isSaving: boolean;
  onSubmit: (values: CompanySettings) => Promise<void>;
};

const languageOptions: Array<{ label: string; value: AppLanguage }> = [
  { label: "English", value: "en" },
  { label: "Arabic", value: "ar" },
];

const currencyOptions: AppCurrency[] = ["USD", "EUR", "EGP"];

export function SettingsForm({
  settings,
  isSaving,
  onSubmit,
}: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CompanySettings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultCompanySettings,
  });

  const defaultLanguage = useWatch({ control, name: "defaultLanguage" });
  const defaultCurrency = useWatch({ control, name: "defaultCurrency" });

  useEffect(() => {
    reset(settings);
  }, [reset, settings]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <SettingsCard
        title="Company Information"
        description="Bilingual company names and logo preview used across documents."
      >
        <div className="space-y-4">
          <CompanyLogo />
          <SettingsSection>
            <FormField
              label="Company Name Arabic"
              error={errors.companyNameAr?.message}
            >
              <Input
                dir="rtl"
                placeholder="اسم الشركة"
                disabled={isSaving}
                aria-invalid={Boolean(errors.companyNameAr)}
                {...register("companyNameAr")}
              />
            </FormField>
            <FormField
              label="Company Name English"
              error={errors.companyNameEn?.message}
            >
              <Input
                placeholder="California Agro"
                disabled={isSaving}
                aria-invalid={Boolean(errors.companyNameEn)}
                {...register("companyNameEn")}
              />
            </FormField>
          </SettingsSection>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Contact Information"
        description="Public communication details printed on quotations and invoices."
      >
        <SettingsSection>
          <FormField label="Phone" error={errors.phone?.message}>
            <Input
              placeholder="+1 555 0100"
              disabled={isSaving}
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
          </FormField>
          <FormField label="Mobile" error={errors.mobile?.message}>
            <Input
              placeholder="+1 555 0110"
              disabled={isSaving}
              aria-invalid={Boolean(errors.mobile)}
              {...register("mobile")}
            />
          </FormField>
          <FormField label="Email" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="info@example.com"
              disabled={isSaving}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </FormField>
          <FormField label="Website" error={errors.website?.message}>
            <Input
              placeholder="https://example.com"
              disabled={isSaving}
              aria-invalid={Boolean(errors.website)}
              {...register("website")}
            />
          </FormField>
        </SettingsSection>
      </SettingsCard>

      <SettingsCard
        title="Business Information"
        description="Legal identifiers and bilingual addresses."
      >
        <div className="space-y-4">
          <SettingsSection>
            <FormField label="Tax ID" error={errors.taxId?.message}>
              <Input
                placeholder="Tax registration number"
                disabled={isSaving}
                aria-invalid={Boolean(errors.taxId)}
                {...register("taxId")}
              />
            </FormField>
            <FormField
              label="Commercial Register"
              error={errors.commercialRegister?.message}
            >
              <Input
                placeholder="Commercial register"
                disabled={isSaving}
                aria-invalid={Boolean(errors.commercialRegister)}
                {...register("commercialRegister")}
              />
            </FormField>
          </SettingsSection>
          <SettingsSection>
            <FormField label="Address Arabic" error={errors.addressAr?.message}>
              <Textarea
                dir="rtl"
                placeholder="العنوان باللغة العربية"
                disabled={isSaving}
                aria-invalid={Boolean(errors.addressAr)}
                {...register("addressAr")}
              />
            </FormField>
            <FormField
              label="Address English"
              error={errors.addressEn?.message}
            >
              <Textarea
                placeholder="Address in English"
                disabled={isSaving}
                aria-invalid={Boolean(errors.addressEn)}
                {...register("addressEn")}
              />
            </FormField>
          </SettingsSection>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Document Numbering"
        description="Prefixes and counters used to generate quotation and invoice numbers."
      >
        <SettingsSection>
          <FormField
            label="Quotation Prefix"
            error={errors.quotationPrefix?.message}
            required
          >
            <Input
              placeholder="QT"
              disabled={isSaving}
              aria-invalid={Boolean(errors.quotationPrefix)}
              {...register("quotationPrefix")}
            />
          </FormField>
          <FormField
            label="Invoice Prefix"
            error={errors.invoicePrefix?.message}
            required
          >
            <Input
              placeholder="INV"
              disabled={isSaving}
              aria-invalid={Boolean(errors.invoicePrefix)}
              {...register("invoicePrefix")}
            />
          </FormField>
          <FormField
            label="Quotation Counter"
            error={errors.quotationCounter?.message}
          >
            <Input
              type="number"
              min="0"
              step="1"
              disabled={isSaving}
              aria-invalid={Boolean(errors.quotationCounter)}
              {...register("quotationCounter", { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="Invoice Counter"
            error={errors.invoiceCounter?.message}
          >
            <Input
              type="number"
              min="0"
              step="1"
              disabled={isSaving}
              aria-invalid={Boolean(errors.invoiceCounter)}
              {...register("invoiceCounter", { valueAsNumber: true })}
            />
          </FormField>
        </SettingsSection>
      </SettingsCard>

      <SettingsCard
        title="Default Preferences"
        description="Defaults used when creating documents."
      >
        <SettingsSection>
          <FormField
            label="Default Language"
            error={errors.defaultLanguage?.message}
          >
            <Select
              value={defaultLanguage}
              disabled={isSaving}
              onValueChange={(value: AppLanguage) =>
                setValue("defaultLanguage", value, { shouldDirty: true })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Default language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem value={option.value} key={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField
            label="Default Currency"
            error={errors.defaultCurrency?.message}
          >
            <Select
              value={defaultCurrency}
              disabled={isSaving}
              onValueChange={(value: AppCurrency) =>
                setValue("defaultCurrency", value, { shouldDirty: true })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Default currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map((currency) => (
                  <SelectItem value={currency} key={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </SettingsSection>
      </SettingsCard>

      <SettingsCard
        title="Terms & Conditions"
        description="Bilingual default terms printed on quotations and invoices."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <FormField
            label="Quotation Terms Arabic"
            error={errors.quotationTermsAr?.message}
          >
            <Textarea
              dir="rtl"
              className="min-h-36"
              placeholder="شروط عرض السعر"
              disabled={isSaving}
              aria-invalid={Boolean(errors.quotationTermsAr)}
              {...register("quotationTermsAr")}
            />
          </FormField>
          <FormField
            label="Quotation Terms English"
            error={errors.quotationTermsEn?.message}
          >
            <Textarea
              className="min-h-36"
              placeholder="Quotation terms"
              disabled={isSaving}
              aria-invalid={Boolean(errors.quotationTermsEn)}
              {...register("quotationTermsEn")}
            />
          </FormField>
          <FormField
            label="Invoice Terms Arabic"
            error={errors.invoiceTermsAr?.message}
          >
            <Textarea
              dir="rtl"
              className="min-h-36"
              placeholder="شروط الفاتورة"
              disabled={isSaving}
              aria-invalid={Boolean(errors.invoiceTermsAr)}
              {...register("invoiceTermsAr")}
            />
          </FormField>
          <FormField
            label="Invoice Terms English"
            error={errors.invoiceTermsEn?.message}
          >
            <Textarea
              className="min-h-36"
              placeholder="Invoice terms"
              disabled={isSaving}
              aria-invalid={Boolean(errors.invoiceTermsEn)}
              {...register("invoiceTermsEn")}
            />
          </FormField>
        </div>
      </SettingsCard>

      <div className="sticky bottom-4 z-10 flex justify-end rounded-lg border bg-background/95 p-3 shadow-lg backdrop-blur">
        <Button type="submit" disabled={isSaving || !isDirty}>
          <Save className="size-4" aria-hidden />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}

function FormField({
  label,
  error,
  required = false,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
