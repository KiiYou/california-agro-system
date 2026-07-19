"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  customerDefaultValues,
  customerSchema,
} from "@/features/customers/schemas/customer-schema";
import type {
  Customer,
  CustomerFormValues,
} from "@/features/customers/types/customer";
import { mapCustomerToFormValues } from "@/features/customers/utils/customer-mappers";

type CustomerFormProps = {
  mode: "create" | "edit";
  customer?: Customer | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: CustomerFormValues) => Promise<void>;
};

type FieldConfig = {
  name: keyof CustomerFormValues;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
};

const fieldConfigs: FieldConfig[] = [
  {
    name: "companyName",
    label: "Company Name",
    placeholder: "Green Valley Imports",
    required: true,
  },
  {
    name: "contactName",
    label: "Contact Name",
    placeholder: "Sarah Johnson",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "contact@example.com",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "+1 555 0198",
    type: "tel",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "United States",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Los Angeles",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Street, building, postal code",
  },
];

export function CustomerForm({
  mode,
  customer,
  isSubmitting,
  onCancel,
  onSubmit,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerDefaultValues,
  });

  useEffect(() => {
    reset(customer ? mapCustomerToFormValues(customer) : customerDefaultValues);
  }, [customer, reset]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {fieldConfigs.map((field) => (
          <div
            className={field.name === "address" ? "space-y-2 sm:col-span-2" : "space-y-2"}
            key={field.name}
          >
            <label className="text-sm font-medium text-foreground" htmlFor={field.name}>
              {field.label}
              {field.required ? <span className="text-destructive"> *</span> : null}
            </label>
            <Input
              id={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              aria-invalid={Boolean(errors[field.name])}
              disabled={isSubmitting}
              {...register(field.name)}
            />
            {errors[field.name]?.message ? (
              <p className="text-xs text-destructive">
                {errors[field.name]?.message}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="notes">
          Notes
        </label>
        <Textarea
          id="notes"
          placeholder="Payment preferences, shipping notes, or special requirements"
          aria-invalid={Boolean(errors.notes)}
          disabled={isSubmitting}
          {...register("notes")}
        />
        {errors.notes?.message ? (
          <p className="text-xs text-destructive">{errors.notes.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create Customer"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
