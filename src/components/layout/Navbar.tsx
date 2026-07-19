"use client";

import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserMenu } from "@/components/layout/UserMenu";
import { Button } from "@/components/ui/button";
import { getNavigationTitle } from "@/constants/navigation";

type NavbarProps = {
  onMobileMenuOpen: () => void;
};

export function Navbar({ onMobileMenuOpen }: NavbarProps) {
  const pathname = usePathname();
  const title = getNavigationTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background/90 px-4 backdrop-blur md:px-6">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="lg:hidden"
        onClick={onMobileMenuOpen}
        aria-label="Open sidebar"
      >
        <Menu className="size-4" aria-hidden />
      </Button>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          California Agro
        </p>
        <h1 className="truncate text-lg font-semibold text-foreground">
          {title}
        </h1>
      </div>

      <div className="hidden w-full max-w-sm items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 md:flex">
        <Search className="size-4 text-muted-foreground" aria-hidden />
        <input
          type="search"
          placeholder="Search customers, products, documents..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Search"
        />
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Notifications"
      >
        <Bell className="size-4" aria-hidden />
      </Button>
      <ThemeToggle />
      <UserMenu />
    </header>
  );
}
