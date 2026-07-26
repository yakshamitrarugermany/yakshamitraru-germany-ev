import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * FilterSelect — Rounded native select. Two variants map to the styles
 * previously duplicated on Events (filled) and Artists (minimal).
 */
export function FilterSelect({
  label,
  icon,
  value,
  onChange,
  options,
  variant = "minimal",
  className,
}: {
  label?: string;
  icon?: ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  variant?: "minimal" | "filled";
  className?: string;
}) {
  const filled =
    "appearance-none w-full md:w-56 rounded-full border border-forest-deep/15 bg-cream/60 pl-11 pr-10 py-3 text-sm text-forest-deep focus:border-forest-deep/40 focus:outline-none focus:bg-cream";
  const minimal =
    "appearance-none bg-transparent border border-ink/20 rounded-full pl-4 pr-9 py-2.5 text-sm text-forest-deep hover:border-forest-deep focus:outline-none focus:border-forest-deep transition-colors cursor-pointer";
  return (
    <label className={cn("relative inline-flex items-center", variant === "filled" && "flex", className)}>
      {label && <span className="sr-only">{label}</span>}
      {icon && (
        <span className="absolute left-4 text-forest-deep/60 pointer-events-none">{icon}</span>
      )}
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={variant === "filled" ? filled : minimal}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute",
          variant === "filled"
            ? "right-4 text-forest-deep/50"
            : "right-3 top-1/2 -translate-y-1/2 text-ink-soft text-xs",
        )}
      >
        ▾
      </span>
    </label>
  );
}
