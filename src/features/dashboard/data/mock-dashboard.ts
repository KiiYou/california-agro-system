import {
  DollarSign,
  FilePlus2,
  FileText,
  Package,
  Plus,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardMetric = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export type LatestDocument = {
  id: string;
  customer: string;
  type: "Quotation" | "Invoice";
  status: "Draft" | "Sent" | "Approved" | "Paid";
  total: string;
  date: string;
};

export type RecentActivity = {
  id: string;
  title: string;
  description: string;
  time: string;
};

export type QuickAction = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    title: "Total Customers",
    value: "128",
    change: "+12 this month",
    icon: Users,
  },
  {
    title: "Products",
    value: "46",
    change: "8 active categories",
    icon: Package,
  },
  {
    title: "Documents",
    value: "312",
    change: "24 awaiting action",
    icon: FileText,
  },
  {
    title: "Revenue",
    value: "$284.6K",
    change: "+18.2% estimated",
    icon: DollarSign,
  },
];

export const latestDocuments: LatestDocument[] = [
  {
    id: "Q-2026-041",
    customer: "Green Valley Imports",
    type: "Quotation",
    status: "Sent",
    total: "$18,450",
    date: "Jul 18, 2026",
  },
  {
    id: "INV-2026-018",
    customer: "Nile Fresh Trading",
    type: "Invoice",
    status: "Paid",
    total: "$42,100",
    date: "Jul 17, 2026",
  },
  {
    id: "Q-2026-040",
    customer: "Mediterranean Foods",
    type: "Quotation",
    status: "Draft",
    total: "$9,870",
    date: "Jul 16, 2026",
  },
  {
    id: "INV-2026-017",
    customer: "Atlas Produce Co.",
    type: "Invoice",
    status: "Approved",
    total: "$31,240",
    date: "Jul 15, 2026",
  },
];

export const recentActivities: RecentActivity[] = [
  {
    id: "activity-1",
    title: "Invoice marked paid",
    description: "INV-2026-018 was updated by finance.",
    time: "12 min ago",
  },
  {
    id: "activity-2",
    title: "Quotation shared",
    description: "Q-2026-041 was sent to Green Valley Imports.",
    time: "1 hr ago",
  },
  {
    id: "activity-3",
    title: "Product catalog updated",
    description: "Premium citrus packing options were revised.",
    time: "3 hrs ago",
  },
];

export const quickActions: QuickAction[] = [
  {
    title: "New Quotation",
    description: "Prepare export pricing for a customer.",
    icon: FilePlus2,
  },
  {
    title: "Add Customer",
    description: "Create a buyer profile for future documents.",
    icon: Plus,
  },
  {
    title: "Add Product",
    description: "Register a new crop, grade, or packaging option.",
    icon: Package,
  },
];
