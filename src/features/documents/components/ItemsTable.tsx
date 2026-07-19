"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DocumentItem } from "@/features/documents/types/document.types";

type ItemsTableProps = {
  items: DocumentItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateItem: (
    itemId: string,
    values: Partial<Pick<DocumentItem, "quantity" | "unitPrice" | "discountPercent">>,
  ) => void;
};

export function ItemsTable({
  items,
  onRemoveItem,
  onUpdateItem,
}: ItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Add products to start building the document.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="w-28">Quantity</TableHead>
            <TableHead className="w-32">Unit Price</TableHead>
            <TableHead className="w-32">Discount %</TableHead>
            <TableHead className="text-right">Line Total</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">
                    {item.productCode} · {item.nameEn}
                  </p>
                  <p className="text-xs text-muted-foreground" dir="rtl">
                    {item.nameAr}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={item.quantity}
                  onChange={(event) =>
                    onUpdateItem(item.id, {
                      quantity: Number(event.target.value),
                    })
                  }
                  aria-label={`Quantity for ${item.nameEn}`}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(event) =>
                    onUpdateItem(item.id, {
                      unitPrice: Number(event.target.value),
                    })
                  }
                  aria-label={`Unit price for ${item.nameEn}`}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={item.discountPercent}
                  onChange={(event) =>
                    onUpdateItem(item.id, {
                      discountPercent: Number(event.target.value),
                    })
                  }
                  aria-label={`Discount for ${item.nameEn}`}
                />
              </TableCell>
              <TableCell className="text-right font-medium">
                {item.lineTotal.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remove ${item.nameEn}`}
                >
                  <Trash2 className="size-4" aria-hidden />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
