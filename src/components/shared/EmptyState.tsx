import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel?: string;
};

export function EmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
}: EmptyStateProps) {
  return (
    <section className="flex min-h-[420px] items-center justify-center rounded-lg border border-dashed bg-card px-6 py-12 text-center shadow-sm">
      <div className="mx-auto max-w-md space-y-4">
        <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-6" aria-hidden />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        {actionLabel ? <Button type="button">{actionLabel}</Button> : null}
      </div>
    </section>
  );
}
