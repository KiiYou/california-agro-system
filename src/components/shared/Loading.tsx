export function Loading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className="h-32 animate-pulse rounded-lg border bg-muted/50"
          key={index}
        />
      ))}
    </div>
  );
}
