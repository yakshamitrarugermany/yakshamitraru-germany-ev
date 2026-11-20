"use client";

import { BrandCard } from "@/components/site/BrandCard";
import type { Testimonial } from "@/data/testimonials";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function TestimonialCard({
  item,
  forceExpanded = false,
  highlighted = false,
}: {
  item: Testimonial;
  forceExpanded?: boolean;
  highlighted?: boolean;
}) {
  const paragraphs = item.text.split("\n\n");
  const isLong = item.text.length > 360 || paragraphs.length > 2;
  const [expanded, setExpanded] = useState(forceExpanded);

  useEffect(() => {
    if (forceExpanded) {
      setExpanded(true);
    }
  }, [forceExpanded]);

  const locationText = [item.city, item.country].filter(Boolean).join(", ");
  const isKannada = item.lang === "kn";

  return (
    <BrandCard
      id={item.id}
      variant="cream"
      interactive
      className={`scroll-mt-28 mb-6 md:mb-8 break-inside-avoid p-6 sm:p-8 md:p-9 flex flex-col justify-between border border-forest-deep/10 shadow-[0_24px_60px_-35px_rgba(47,82,51,0.18)] transition-all duration-500 ${
        highlighted
          ? "ring-2 ring-[#B8863B] ring-offset-2 ring-offset-[#FAF6EE]"
          : "ring-0 ring-transparent"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="font-serif text-5xl md:text-6xl leading-none text-[#B8863B] select-none"
          >
            &ldquo;
          </span>
          <span className="inline-flex items-center rounded-full border border-[#B8863B]/35 bg-[#B8863B]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A1F2B]">
            {item.role}
          </span>
        </div>

        <blockquote
          lang={item.lang}
          style={
            isKannada
              ? {
                  fontFamily:
                    'var(--font-cormorant), "Noto Serif Kannada", "Noto Sans Kannada", "Tunga", "Nirmala UI", serif',
                }
              : undefined
          }
          className={`mt-3 space-y-4 font-serif text-lg sm:text-xl md:text-[1.35rem] leading-relaxed text-forest-deep hyphens-auto ${
            isLong && !expanded ? "line-clamp-6" : ""
          }`}
        >
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </blockquote>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#7A1F2B] hover:text-[#B8863B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8863B]"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <footer className="mt-7 pt-5 border-t border-border flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-serif text-lg md:text-xl font-medium text-[#7A1F2B]">
            {item.name}
          </div>
          {item.title && (
            <div className="mt-0.5 text-xs text-ink-soft leading-relaxed">
              {item.title}
            </div>
          )}
        </div>

        {(item.event || locationText || item.date) && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft shrink-0">
            {item.event && (
              <span className="inline-flex items-center gap-1 font-medium text-forest-deep">
                <Sparkles className="h-3.5 w-3.5 text-[#B8863B]" />
                {item.event}
              </span>
            )}
            {item.event && (locationText || item.date) && (
              <span aria-hidden="true">·</span>
            )}
            {locationText && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#7A1F2B]/70" />
                {locationText}
              </span>
            )}
            {locationText && item.date && <span aria-hidden="true">·</span>}
            {item.date && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-ink-soft/70" />
                {item.date}
              </span>
            )}
          </div>
        )}
      </footer>
    </BrandCard>
  );
}

export function TestimonialsList({ items }: { items: Testimonial[] }) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    let highlightTimer: number | null = null;
    let scrollTimer: number | null = null;

    const handleHash = () => {
      const rawHash = window.location.hash;
      if (!rawHash || rawHash.length <= 1) return;
      const targetId = decodeURIComponent(rawHash.slice(1));
      const matched = items.some((item) => item.id === targetId);
      if (!matched) return;

      setExpandedIds((prev) => ({ ...prev, [targetId]: true }));
      setHighlightedId(targetId);

      if (scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);

      if (highlightTimer) window.clearTimeout(highlightTimer);
      highlightTimer = window.setTimeout(() => {
        setHighlightedId((current) => (current === targetId ? null : current));
      }, 2000);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      if (highlightTimer) window.clearTimeout(highlightTimer);
      if (scrollTimer) window.clearTimeout(scrollTimer);
    };
  }, [items]);

  return (
    <div className="columns-1 md:columns-2 gap-6 md:gap-8">
      {items.map((item) => (
        <TestimonialCard
          key={item.id}
          item={item}
          forceExpanded={Boolean(expandedIds[item.id])}
          highlighted={highlightedId === item.id}
        />
      ))}
    </div>
  );
}
