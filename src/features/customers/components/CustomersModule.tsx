"use client";

import { Plus, Users } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerDetails } from "@/features/customers/components/CustomerDetails";
import { CustomerDialog } from "@/features/customers/components/CustomerDialog";
import { CustomerToolbar } from "@/features/customers/components/CustomerToolbar";
import { CustomersLoadingSkeleton } from "@/features/customers/components/CustomersLoadingSkeleton";
import { CustomersTable } from "@/features/customers/components/CustomersTable";
import { DeleteCustomerDialog } from "@/features/customers/components/DeleteCustomerDialog";
import { useCustomers } from "@/features/customers/hooks/use-customers";
import { useCustomerUiStore } from "@/features/customers/store/customer-ui-store";
import type { CustomerFormValues } from "@/features/customers/types/customer";

export function CustomersModule() {
  const {
    customers,
    filteredCustomers,
    countryOptions,
    filters,
    isLoading,
    isSaving,
    isDeleting,
    error,
    setFilters,
    refreshCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  const {
    formDialogMode,
    isFormDialogOpen,
    isDeleteDialogOpen,
    selectedCustomer,
    customerToDelete,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
    openDeleteDialog,
    closeDeleteDialog,
    selectCustomer,
  } = useCustomerUiStore();

  async function handleSubmit(values: CustomerFormValues) {
    if (formDialogMode === "edit" && selectedCustomer) {
      await updateCustomer(selectedCustomer.id, values);
    } else {
      await createCustomer(values);
    }

    closeFormDialog();
  }

  async function handleDelete() {
    if (!customerToDelete) {
      return;
    }

    await deleteCustomer(customerToDelete);

    if (selectedCustomer?.id === customerToDelete.id) {
      selectCustomer(null);
    }

    closeDeleteDialog();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Manage buyer profiles used across quotations, invoices, exports, and reporting."
        actions={
          <Button type="button" onClick={openCreateDialog}>
            <Plus className="size-4" aria-hidden />
            New Customer
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Customers</CardTitle>
            <CardDescription>All customer records</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{customers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visible Results</CardTitle>
            <CardDescription>After search and filters</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{filteredCustomers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Countries</CardTitle>
            <CardDescription>Unique customer markets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{countryOptions.length}</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            Search, sort, filter, select rows, paginate, and control visible
            columns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CustomerToolbar
            filters={filters}
            countryOptions={countryOptions}
            isLoading={isLoading}
            onFiltersChange={setFilters}
            onRefresh={() => void refreshCustomers()}
          />

          {isLoading ? (
            <CustomersLoadingSkeleton />
          ) : error ? (
            <EmptyState
              title="Customers could not be loaded"
              description={error}
              icon={Users}
              actionLabel="Check Firebase Config"
            />
          ) : customers.length === 0 ? (
            <EmptyState
              title="No customers yet"
              description="Create your first customer to start preparing quotations and invoices."
              icon={Users}
              actionLabel="Add Customer"
            />
          ) : (
            <CustomersTable
              customers={filteredCustomers}
              onView={selectCustomer}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          )}
        </CardContent>
      </Card>

      <CustomerDetails customer={selectedCustomer} />

      <CustomerDialog
        mode={formDialogMode}
        customer={selectedCustomer}
        isOpen={isFormDialogOpen}
        isSaving={isSaving}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeFormDialog();
          }
        }}
        onSubmit={handleSubmit}
      />

      <DeleteCustomerDialog
        customer={customerToDelete}
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeDeleteDialog();
          }
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
