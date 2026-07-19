import { cn } from "@/lib/utils";

type SettingsSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function SettingsSection({
  children,
  className,
}: SettingsSectionProps) {
  return <div className={cn("grid gap-4 md:grid-cols-2", className)}>{children}</div>;
}
