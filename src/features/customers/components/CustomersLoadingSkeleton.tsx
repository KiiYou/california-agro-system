export function CustomersLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="h-24 animate-pulse rounded-lg border bg-muted/50"
            key={index}
          />
        ))}
      </div>
      <div className="h-[420px] animate-pulse rounded-lg border bg-muted/50" />
    </div>
  );
}
