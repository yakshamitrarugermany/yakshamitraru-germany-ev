import type { ReactNode } from "react";
import { BrandCard } from "./BrandCard";

/**
 * EmptyState — Editorial no-results / empty-list placeholder.
 */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <BrandCard variant="outline" className="p-10 md:p-14 text-center">
      <p className="font-serif text-2xl md:text-3xl text-forest-deep">{title}</p>
      {description && (
        <p className="mt-4 text-ink-soft max-w-md mx-auto leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-8 flex justify-center">{action}</div>}
    </BrandCard>
  );
}
