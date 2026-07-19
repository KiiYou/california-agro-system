"use client";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  DocumentCurrency,
  DocumentTotals,
} from "@/features/documents/types/document.types";

type TotalsCardProps = DocumentTotals & {
  currency: DocumentCurrency;
  onShippingChange: (shipping: number) => void;
  onTaxChange: (tax: number) => void;
};

export function TotalsCard({
  subtotal,
  shipping,
  tax,
  total,
  currency,
  onShippingChange,
  onTaxChange,
}: TotalsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Totals</CardTitle>
        <CardDescription>Calculated instantly from document items.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TotalRow label="Subtotal" value={`${subtotal.toFixed(2)} ${currency}`} />
        <EditableTotalRow
          label="Shipping"
          value={shipping}
          onChange={onShippingChange}
        />
        <EditableTotalRow label="Tax" value={tax} onChange={onTaxChange} />
        <div className="flex items-center justify-between border-t pt-4 text-lg font-semibold">
          <span>Grand Total</span>
          <span>
            {total.toFixed(2)} {currency}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function EditableTotalRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid grid-cols-[1fr_9rem] items-center gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <Input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
