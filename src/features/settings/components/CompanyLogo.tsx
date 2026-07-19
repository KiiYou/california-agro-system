import Image from "next/image";

export function CompanyLogo() {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
        <Image
          src="/logo.png"
          alt="Company logo"
          width={80}
          height={80}
          className="h-full w-full object-contain"
          priority
        />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Logo Preview</p>
        <p className="text-sm leading-6 text-muted-foreground">
          Loaded from <span className="font-mono">/logo.png</span>. Uploads are
          intentionally disabled on Firebase Spark.
        </p>
      </div>
    </div>
  );
}
