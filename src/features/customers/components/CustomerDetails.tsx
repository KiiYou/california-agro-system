import { Building2, Mail, MapPin, Phone, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Customer } from "@/features/customers/types/customer";

type CustomerDetailsProps = {
  customer: Customer | null;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  if (!customer) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>
            Select a customer from the table to review profile details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed bg-muted/40 p-6 text-sm text-muted-foreground">
            No customer selected.
          </div>
        </CardContent>
      </Card>
    );
  }

  const details = [
    { label: "Company", value: customer.companyName, icon: Building2 },
    { label: "Contact", value: customer.contactName, icon: User },
    { label: "Email", value: customer.email, icon: Mail },
    { label: "Phone", value: customer.phone, icon: Phone },
    {
      label: "Location",
      value: [customer.city, customer.country].filter(Boolean).join(", ") || "Not set",
      icon: MapPin,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{customer.companyName}</CardTitle>
        <CardDescription>
          Created {dateFormatter.format(customer.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {details.map((detail) => (
            <div className="rounded-lg border bg-muted/30 p-3" key={detail.label}>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <detail.icon className="size-3.5" aria-hidden />
                {detail.label}
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                {detail.value || "Not set"}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Address
          </p>
          <p className="mt-2 text-sm text-foreground">
            {customer.address || "No address recorded."}
          </p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Notes
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground">
            {customer.notes || "No notes recorded."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
