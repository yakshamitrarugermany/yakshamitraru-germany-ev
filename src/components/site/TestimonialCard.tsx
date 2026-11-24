"use client";

import { BrandCard } from "@/components/site/BrandCard";
import type { Testimonial } from "@/data/testimonials";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function extractHashTargetId(rawHash: string): string | null {
  if (!rawHash || rawHash.length <= 1) return null;
  // Next.js 16 segment cache can concatenate a cached hash with a newly navigated
  // hash (e.g. "#first-id#second-id"), so always read the last non-empty segment.
  const segments = rawHash.split("#").filter(Boolean);
  if (segments.length === 0) return null;
  const latestSegment = segments[segments.length - 1];
  try {
    return decodeURIComponent(latestSegment);
  } catch {
    return latestSegment;
  }
}

export function TestimonialCard({
  item,
  expanded = false,
  highlighted = false,
  onToggleExpand,
}: {
  item: Testimonial;
  expanded?: boolean;
  highlighted?: boolean;
  onToggleExpand?: () => void;
}) {
  const paragraphs = item.text.split("\n\n");
  const isLong = item.text.length > 360 || paragraphs.length > 2;
  const isActive = expanded;

  const locationText = [item.city, item.country].filter(Boolean).join(", ");
  const isKannada = item.lang === "kn";

  const borderAndSurfaceClass = isActive
    ? "border-2 border-[#B8863B] hover:border-[#B8863B] bg-[#FCF7EC]"
    : "border border-forest-deep/10 hover:border-[#B8863B]/60 bg-[#FFFDF8]";

  const bodySurfaceClass = isActive ? "bg-[#FCF7EC]" : "bg-[#FFFDF8]";
  const authorSurfaceClass = isActive ? "bg-[#EDE3CE]" : "bg-[#F1EBDD]";

  return (
    <BrandCard
      id={item.id}
      variant="cream"
      interactive
      data-expanded={isActive ? "true" : "false"}
      className={`scroll-mt-28 mb-6 md:mb-8 break-inside-avoid p-6 sm:p-8 md:p-9 flex flex-col justify-between shadow-[0_24px_60px_-35px_rgba(47,82,51,0.18)] transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out ${borderAndSurfaceClass} ${
        highlighted
          ? "ring-2 ring-[#B8863B] ring-offset-2 ring-offset-[#FAF6EE]"
          : "ring-0 ring-transparent"
      }`}
    >
      <div
        className={`px-6 pt-6 pb-7 sm:px-8 sm:pt-8 sm:pb-7 md:px-9 md:pt-9 md:pb-7 transition-colors duration-200 ease-out ${bodySurfaceClass}`}
      >
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
            onClick={onToggleExpand}
            aria-expanded={expanded}
            className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#7A1F2B] hover:text-[#B8863B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8863B]"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <footer
        className={`px-6 pt-5 pb-6 sm:px-8 sm:pt-5 sm:pb-8 md:px-9 md:pt-5 md:pb-9 border-t border-border flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 transition-colors duration-200 ease-out ${authorSurfaceClass}`}
      >
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
  const pathname = usePathname();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  useEffect(() => {
    let handledTargetId: string | null = null;
    let rafCheckId: number | null = null;

    const applyHashFromLocation = () => {
      const rawHash = window.location.hash;
      const targetId = extractHashTargetId(rawHash);
      if (!targetId) return;

      const matched = items.some((item) => item.id === targetId);
      if (!matched) return;

      if (rawHash.indexOf("#", 1) !== -1) {
        const normalizedUrl = `${window.location.pathname}${window.location.search}#${encodeURIComponent(targetId)}`;
        window.history.replaceState(window.history.state, "", normalizedUrl);
      }

      if (handledTargetId === targetId) return;
      handledTargetId = targetId;

      setExpandedId(targetId);
      setHighlightedId(targetId);
      setPendingScrollId(targetId);
    };

    const handleExternalHashEvent = () => {
      handledTargetId = null;
      applyHashFromLocation();
    };

    applyHashFromLocation();
    // Re-check on the next animation frame in case client-side routing updates
    // window.location.hash immediately after mount.
    rafCheckId = window.requestAnimationFrame(() => {
      applyHashFromLocation();
    });

    window.addEventListener("hashchange", handleExternalHashEvent);
    window.addEventListener("popstate", handleExternalHashEvent);
    return () => {
      window.removeEventListener("hashchange", handleExternalHashEvent);
      window.removeEventListener("popstate", handleExternalHashEvent);
      if (rafCheckId) window.cancelAnimationFrame(rafCheckId);
    };
  }, [items, pathname]);

  useEffect(() => {
    if (!highlightedId) return;

    const timerId = window.setTimeout(() => {
      setHighlightedId((current) =>
        current === highlightedId ? null : current,
      );
    }, 2000);

    return () => window.clearTimeout(timerId);
  }, [highlightedId]);

  useEffect(() => {
    if (!pendingScrollId || expandedId !== pendingScrollId) return;

    let raf1: number | null = null;
    let raf2: number | null = null;
    let settleTimer: number | null = null;

    const scrollToTarget = (behavior: ScrollBehavior) => {
      const el = document.getElementById(pendingScrollId);
      if (!el) return;
      el.scrollIntoView({ behavior, block: "start" });
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        scrollToTarget(prefersReducedMotion ? "instant" : "smooth");
        settleTimer = window.setTimeout(() => {
          const el = document.getElementById(pendingScrollId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < 0 || rect.top > window.innerHeight * 0.5) {
              scrollToTarget("instant");
            }
          }
          setPendingScrollId(null);
        }, 650);
      });
    });

    return () => {
      if (raf1) window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, [pendingScrollId, expandedId]);

  const handleToggleExpand = (id: string) => {
    setHighlightedId(null);
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="columns-1 md:columns-2 gap-6 md:gap-8">
      {items.map((item) => (
        <TestimonialCard
          key={item.id}
          item={item}
          expanded={expandedId === item.id}
          highlighted={highlightedId === item.id}
          onToggleExpand={() => handleToggleExpand(item.id)}
        />
      ))}
    </div>
  );
}
