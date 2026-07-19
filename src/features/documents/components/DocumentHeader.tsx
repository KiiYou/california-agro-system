"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencySelector } from "@/features/documents/components/CurrencySelector";
import { LanguageSelector } from "@/features/documents/components/LanguageSelector";
import { StatusBadge } from "@/features/documents/components/StatusBadge";
import type {
  DocumentCurrency,
  DocumentLanguage,
  DocumentStatus,
  DocumentType,
} from "@/features/documents/types/document.types";

type DocumentHeaderProps = {
  type: DocumentType;
  language: DocumentLanguage;
  currency: DocumentCurrency;
  status: DocumentStatus;
  number: string;
  onTypeChange: (type: DocumentType) => void;
  onLanguageChange: (language: DocumentLanguage) => void;
  onCurrencyChange: (currency: DocumentCurrency) => void;
  onStatusChange: (status: DocumentStatus) => void;
};

const baseStatuses: DocumentStatus[] = ["draft", "sent", "accepted", "rejected"];

export function DocumentHeader({
  type,
  language,
  currency,
  status,
  number,
  onTypeChange,
  onLanguageChange,
  onCurrencyChange,
  onStatusChange,
}: DocumentHeaderProps) {
  const statuses = type === "invoice" ? [...baseStatuses, "paid"] : baseStatuses;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_12rem_12rem_12rem_12rem]">
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview Number
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {number}
        </p>
        <div className="mt-3">
          <StatusBadge status={status} />
        </div>
      </div>

      <HeaderField label="Type">
        <Select value={type} onValueChange={(value: DocumentType) => onTypeChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quotation">Quotation</SelectItem>
            <SelectItem value="invoice">Invoice</SelectItem>
          </SelectContent>
        </Select>
      </HeaderField>

      <HeaderField label="Language">
        <LanguageSelector value={language} onChange={onLanguageChange} />
      </HeaderField>

      <HeaderField label="Currency">
        <CurrencySelector value={currency} onChange={onCurrencyChange} />
      </HeaderField>

      <HeaderField label="Status">
        <Select value={status} onValueChange={(value: DocumentStatus) => onStatusChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((item) => (
              <SelectItem value={item} key={item}>
                {item[0].toUpperCase()}
                {item.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </HeaderField>
    </div>
  );
}

function HeaderField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}
