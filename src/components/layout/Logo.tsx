import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  isCollapsed?: boolean;
  className?: string;
};

export function Logo({ isCollapsed = false, className }: LogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "flex h-14 items-center gap-3 rounded-lg px-2 text-foreground",
        className,
      )}
      aria-label="California Agro dashboard"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
        CA
      </span>
      {!isCollapsed ? (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">
            California Agro
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            Management System
          </span>
        </span>
      ) : null}
    </Link>
  );
}
