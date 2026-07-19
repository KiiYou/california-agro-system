import {
  BarChart3,
  FileText,
  Home,
  LogOut,
  Package,
  Settings,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const primaryNavigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export const logoutNavigationItem: NavigationItem = {
  title: "Logout",
  href: "/",
  icon: LogOut,
};

export function getNavigationTitle(pathname: string): string {
  const activeItem = primaryNavigationItems.find((item) =>
    pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return activeItem?.title ?? "Dashboard";
}
