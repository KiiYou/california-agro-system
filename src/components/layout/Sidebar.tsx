"use client";

import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/layout/Logo";
import { SidebarGroup } from "@/components/layout/SidebarGroup";
import { SidebarItem } from "@/components/layout/SidebarItem";
import { Button } from "@/components/ui/button";
import {
  logoutNavigationItem,
  primaryNavigationItems,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCollapsedChange: (isCollapsed: boolean) => void;
  onMobileOpenChange: (isOpen: boolean) => void;
};

export function Sidebar({
  isCollapsed,
  isMobileOpen,
  onCollapsedChange,
  onMobileOpenChange,
}: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <Logo isCollapsed={isCollapsed} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex"
          onClick={() => onCollapsedChange(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="size-4" aria-hidden />
          ) : (
            <PanelLeftClose className="size-4" aria-hidden />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => onMobileOpenChange(false)}
          aria-label="Close sidebar"
        >
          <X className="size-4" aria-hidden />
        </Button>
      </div>

      <nav className="flex flex-1 flex-col justify-between gap-6">
        <SidebarGroup label="Workspace" isCollapsed={isCollapsed}>
          {primaryNavigationItems.map((item) => (
            <SidebarItem
              key={item.href}
              title={item.title}
              href={item.href}
              icon={item.icon}
              isCollapsed={isCollapsed}
              isActive={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              }
              onNavigate={() => onMobileOpenChange(false)}
            />
          ))}
        </SidebarGroup>

        <SidebarGroup isCollapsed={isCollapsed}>
          <SidebarItem
            title={logoutNavigationItem.title}
            href={logoutNavigationItem.href}
            icon={logoutNavigationItem.icon}
            isCollapsed={isCollapsed}
            onNavigate={() => onMobileOpenChange(false)}
          />
        </SidebarGroup>
      </nav>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r bg-sidebar px-3 py-4 text-sidebar-foreground transition-[width] duration-200 lg:block",
          isCollapsed ? "w-20" : "w-72",
        )}
      >
        {content}
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => onMobileOpenChange(false)}
            aria-label="Close navigation overlay"
          />
          <aside className="relative h-full w-80 max-w-[86vw] border-r bg-sidebar px-3 py-4 text-sidebar-foreground shadow-xl">
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
}
