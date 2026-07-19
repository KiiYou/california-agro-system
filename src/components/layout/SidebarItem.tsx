"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
  title: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
  isCollapsed?: boolean;
  onNavigate?: () => void;
};

export function SidebarItem({
  title,
  href,
  icon: Icon,
  isActive = false,
  isCollapsed = false,
  onNavigate,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        isActive && "bg-primary/10 text-primary ring-1 ring-primary/15",
        isCollapsed && "justify-center px-0",
      )}
      aria-current={isActive ? "page" : undefined}
      title={isCollapsed ? title : undefined}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      {!isCollapsed ? <span className="truncate">{title}</span> : null}
    </Link>
  );
}
