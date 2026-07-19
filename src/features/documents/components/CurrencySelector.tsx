"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DocumentCurrency } from "@/features/documents/types/document.types";

type CurrencySelectorProps = {
  value: DocumentCurrency;
  onChange: (value: DocumentCurrency) => void;
};

const currencies: DocumentCurrency[] = ["USD", "EUR", "EGP"];

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={(nextValue: DocumentCurrency) => onChange(nextValue)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem value={currency} key={currency}>
            {currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
