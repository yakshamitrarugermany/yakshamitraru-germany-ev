"use client";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export type FAQItem = { q: string; a: string };

/**
 * FAQAccordion — Two visual variants:
 *  - "bold"     : large serif question (Contact page)
 *  - "numbered" : compact numbered list (Event detail page)
 */
export function FAQAccordion({
  items,
  variant = "bold",
  defaultOpen = 0,
  className,
}: {
  items: FAQItem[];
  variant?: "bold" | "numbered";
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  if (variant === "numbered") {
    return (
      <ul
        className={cn(
          "divide-y divide-forest-deep/10 border-t border-b border-forest-deep/10",
          className,
        )}
      >
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full py-6 flex items-start gap-6 text-left group cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="mt-1 font-mono text-xs text-saffron tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif text-lg md:text-xl text-forest-deep group-hover:text-saffron transition-colors">
                  {f.q}
                </span>
                <span className="mt-1 shrink-0 grid h-8 w-8 place-items-center rounded-full border border-forest-deep/20 text-forest-deep">
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="pb-6 pl-11 pr-14 text-forest-deep/75 leading-relaxed">
                  {f.a}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div
      className={cn("divide-y divide-border border-y border-border", className)}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-xl md:text-2xl text-forest-deep leading-snug">
                {item.q}
              </span>
              <span
                className={cn(
                  "shrink-0 grid place-items-center h-9 w-9 rounded-full border transition-all",
                  isOpen
                    ? "bg-forest-deep text-cream border-forest-deep rotate-180"
                    : "bg-transparent text-forest-deep border-ink/20",
                )}
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100 pb-6 md:pb-8"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-ink-soft max-w-2xl leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
