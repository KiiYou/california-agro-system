import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("flex-1 px-4 py-6 md:px-6 lg:px-8", className)}>
      <div className="mx-auto w-full max-w-7xl space-y-6">{children}</div>
    </main>
  );
}
