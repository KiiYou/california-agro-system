import { CheckCircle2, Database, KeyRound, ShieldCheck } from "lucide-react";

const foundationItems = [
  {
    title: "Firebase Core",
    description: "Typed app, Auth, Firestore, and Storage clients.",
    icon: Database,
  },
  {
    title: "Authentication",
    description: "Email auth services and session observer setup.",
    icon: KeyRound,
  },
  {
    title: "Architecture",
    description: "Feature-first files with shared hooks and types.",
    icon: ShieldCheck,
  },
] as const;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-background px-6 py-16">
      <section className="w-full max-w-4xl space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Phase 1
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            California Agro Management System
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            The project foundation is ready for Firebase configuration,
            authentication state management, and future ERP modules.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {foundationItems.map((item) => (
            <article
              className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
              key={item.title}
            >
              <item.icon className="mb-4 size-5 text-primary" aria-hidden />
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-lg border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden />
          Add values to the root .env.local file before connecting to a real
          Firebase project.
        </div>
      </section>
    </main>
  );
}
