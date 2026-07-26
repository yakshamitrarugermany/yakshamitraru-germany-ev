import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Chip — Pill-shaped selectable filter chip.
 * Extracted from gallery.tsx.
 */
export function Chip({
  active = false,
  children,
  className,
  ...props
}: {
  active?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "whitespace-nowrap rounded-full px-4 py-2 text-sm border transition-colors",
        active
          ? "bg-forest-deep text-cream border-forest-deep"
          : "bg-transparent text-ink-soft border-ink/15 hover:border-forest-deep hover:text-forest-deep",
        className,
      )}
    >
      {children}
    </button>
  );
}
