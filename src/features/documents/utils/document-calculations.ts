import type {
  DocumentItem,
  DocumentTotals,
} from "@/features/documents/types/document.types";

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateLineTotal(
  quantity: number,
  unitPrice: number,
  discountPercent: number,
): number {
  const gross = Math.max(quantity, 0) * Math.max(unitPrice, 0);
  const discount = gross * (Math.min(Math.max(discountPercent, 0), 100) / 100);

  return roundMoney(gross - discount);
}

export function recalculateItem(item: DocumentItem): DocumentItem {
  return {
    ...item,
    lineTotal: calculateLineTotal(
      item.quantity,
      item.unitPrice,
      item.discountPercent,
    ),
  };
}

export function calculateDocumentTotals(
  items: DocumentItem[],
  shipping: number,
  tax: number,
): DocumentTotals {
  const subtotal = roundMoney(
    items.reduce((sum, item) => sum + item.lineTotal, 0),
  );
  const safeShipping = roundMoney(Math.max(shipping, 0));
  const safeTax = roundMoney(Math.max(tax, 0));

  return {
    subtotal,
    shipping: safeShipping,
    tax: safeTax,
    total: roundMoney(subtotal + safeShipping + safeTax),
  };
}
