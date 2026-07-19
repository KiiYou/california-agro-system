"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DocumentLanguage } from "@/features/documents/types/document.types";

type LanguageSelectorProps = {
  value: DocumentLanguage;
  onChange: (value: DocumentLanguage) => void;
};

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={(nextValue: DocumentLanguage) => onChange(nextValue)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ar">Arabic</SelectItem>
      </SelectContent>
    </Select>
  );
}
