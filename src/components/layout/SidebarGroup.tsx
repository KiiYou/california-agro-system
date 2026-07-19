type SidebarGroupProps = {
  label?: string;
  isCollapsed?: boolean;
  children: React.ReactNode;
};

export function SidebarGroup({
  label,
  isCollapsed = false,
  children,
}: SidebarGroupProps) {
  return (
    <div className="space-y-2">
      {label && !isCollapsed ? (
        <p className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      ) : null}
      <div className="space-y-1">{children}</div>
    </div>
  );
}
