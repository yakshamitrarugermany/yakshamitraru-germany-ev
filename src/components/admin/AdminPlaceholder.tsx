import { Clock } from "lucide-react";

interface AdminPlaceholderProps {
  section: string;
  description: string;
}

export function AdminPlaceholder({ section, description }: AdminPlaceholderProps) {
  return (
    <section className="space-y-6">
      <div>
        <p className="eyebrow text-ink-soft">Admin / {section}</p>
        <h2 className="mt-1 font-serif text-3xl text-forest-deep">{section}</h2>
      </div>

      <div className="rounded-2xl border border-border bg-card p-10 md:p-14 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-forest-deep">
          <Clock className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-serif text-2xl text-forest-deep">
          Coming soon
        </h3>
        <p className="mt-2 mx-auto max-w-md text-sm text-ink-soft leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
