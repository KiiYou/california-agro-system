import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  dashboardMetrics,
  latestDocuments,
  quickActions,
  recentActivities,
} from "@/features/dashboard/data/mock-dashboard";

const statusVariant = {
  Draft: "secondary",
  Sent: "outline",
  Approved: "default",
  Paid: "default",
} as const;

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Operational overview for customers, products, export documents, and revenue activity."
        actions={
          <Button type="button">
            New Document
            <ArrowUpRight className="size-4" aria-hidden />
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader>
              <CardTitle>{metric.title}</CardTitle>
              <CardAction>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <metric.icon className="size-5" aria-hidden />
                </span>
              </CardAction>
              <CardDescription>{metric.change}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight">
                {metric.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Latest Documents</CardTitle>
            <CardDescription>
              Recent quotations and invoices prepared by the team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          {document.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {document.date}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{document.customer}</TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[document.status]}>
                        {document.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {document.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Mock activity stream until Firestore is connected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div className="flex gap-3" key={activity.id}>
                  <span className="mt-1 size-2 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-foreground">
                        {activity.title}
                      </p>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common actions are staged here before module workflows are built.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {quickActions.map((action) => (
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto justify-start gap-3 p-4 text-left"
                  key={action.title}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <action.icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{action.title}</span>
                    <span className="mt-1 block text-wrap text-xs leading-5 text-muted-foreground">
                      {action.description}
                    </span>
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
