"use client";

import {
  HOME_TESTIMONIAL_IDS,
  TESTIMONIALS,
  type Testimonial,
} from "@/data/testimonials";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BrandCard } from "./BrandCard";
import { Section, SectionHeader } from "./Section";

const GROUP_SIZE = 3;
const ROTATION_INTERVAL_MS = 5000;
const CARD_TRANSITION_EASE: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

function buildOrderedTestimonials(
  allTestimonials: Testimonial[],
  featuredIds: string[],
): Testimonial[] {
  const featured = featuredIds
    .map((id) => allTestimonials.find((t) => t.id === id))
    .filter((t): t is Testimonial => Boolean(t));
  const featuredSet = new Set(featured.map((t) => t.id));
  const remaining = allTestimonials.filter((t) => !featuredSet.has(t.id));
  return [...featured, ...remaining];
}

function buildTestimonialGroups(
  items: Testimonial[],
  groupSize = GROUP_SIZE,
): Testimonial[][] {
  if (items.length === 0) return [];
  if (items.length <= groupSize) return [items];

  const groups: Testimonial[][] = [];
  for (let start = 0; start < items.length; start += groupSize) {
    const group: Testimonial[] = [];
    for (let offset = 0; offset < groupSize; offset++) {
      group.push(items[(start + offset) % items.length]);
    }
    groups.push(group);
  }
  return groups;
}

const TESTIMONIAL_GROUPS = buildTestimonialGroups(
  buildOrderedTestimonials(TESTIMONIALS, HOME_TESTIMONIAL_IDS),
  GROUP_SIZE,
);

export function Testimonials() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isPaused = isHovered || isFocused;
  const visibleTestimonials = TESTIMONIAL_GROUPS[groupIndex] ?? [];

  useEffect(() => {
    if (TESTIMONIAL_GROUPS.length <= 1 || isPaused) return;

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setGroupIndex((prev) => (prev + 1) % TESTIMONIAL_GROUPS.length);
      }
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const gridColsClass =
    visibleTestimonials.length === 1
      ? "md:grid-cols-1"
      : visibleTestimonials.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  const cardMotion = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          zIndex: 2,
          transition: { duration: 0.2, ease: "easeOut" as const },
        },
        exit: {
          opacity: 0,
          zIndex: 1,
          pointerEvents: "none" as const,
          transition: { duration: 0.15, ease: "easeIn" as const },
        },
      }
    : {
        initial: {
          opacity: 0,
          rotateY: 48,
          y: 16,
          z: -72,
          scale: 0.95,
          zIndex: 2,
        },
        animate: {
          opacity: 1,
          rotateY: 0,
          y: 0,
          z: 0,
          scale: 1,
          zIndex: 2,
          transition: {
            duration: 0.72,
            ease: CARD_TRANSITION_EASE,
            opacity: { duration: 0.56, ease: CARD_TRANSITION_EASE },
          },
        },
        exit: {
          opacity: 0,
          rotateY: -48,
          y: -10,
          z: -72,
          scale: 0.95,
          zIndex: 1,
          pointerEvents: "none" as const,
          transition: {
            duration: 0.68,
            ease: CARD_TRANSITION_EASE,
            opacity: { duration: 0.48, ease: [0.4, 0, 0.2, 1] as const },
          },
        },
      };

  return (
    <Section tone="cream" id="testimonials" className="p-0 overflow-x-clip">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8 md:mb-14">
        <SectionHeader
          eyebrow="In their words"
          title={
            <>
              From our <span className="italic">Audience</span>
              {/* <br /> */}
              <p className="italic text-xl md:text-2xl lg:text-3xl">
                Trusted by theatres, universities, hosts and festivals.
              </p>
            </>
          }
        />
        <Button
          asChild
          variant="forest"
          size="pill"
          className="self-start md:self-end"
        >
          <Link href="/testimonials">View All Testimonials</Link>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative mt-12 md:mt-16 -mx-6 md:mx-0"
        role="region"
        aria-roledescription="carousel"
        aria-label="Audience testimonials"
        aria-live="off"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setIsHovered(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setIsHovered(false);
        }}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsFocused(false);
          }
        }}
      >
        <div
          className={`flex md:grid ${gridColsClass} gap-4 md:gap-8 px-6 md:px-0 pb-6 md:pb-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar items-stretch scroll-pl-6 md:scroll-pl-0 after:content-[''] after:w-px after:shrink-0 md:after:hidden`}
        >
          {visibleTestimonials.map((q, slotIndex) => (
            <div
              key={`slot-${slotIndex}`}
              style={{
                perspective: "1400px",
                transformStyle: "preserve-3d",
              }}
              className="shrink-0 w-[85%] sm:w-[45%] md:w-auto min-w-0 snap-start grid min-h-[340px] md:min-h-[388px]"
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={`${groupIndex}-${q.id}`}
                  initial={cardMotion.initial}
                  animate={cardMotion.animate}
                  exit={cardMotion.exit}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    transformOrigin: "center center",
                  }}
                  className="[grid-area:1/1] flex flex-col min-w-0 w-full h-full will-change-transform"
                >
                  <Link
                    href={`/testimonials#${q.id}`}
                    className="group cursor-pointer flex flex-col h-full w-full flex-1 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8863B]"
                  >
                    <BrandCard
                      variant="outline"
                      interactive
                      className="relative flex flex-col h-full w-full flex-1 bg-[#FFFDF8] cursor-pointer transition-colors duration-200 group-hover:border-[#B8863B]/55"
                    >
                      <div className="flex-1 px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-6 bg-[#FFFDF8]">
                        <blockquote
                          lang={q.lang}
                          style={
                            q.lang === "kn"
                              ? {
                                  fontFamily:
                                    'var(--font-cormorant), "Noto Serif Kannada", "Noto Sans Kannada", "Tunga", "Nirmala UI", serif',
                                }
                              : undefined
                          }
                          className="font-serif text-lg md:text-xl leading-relaxed text-forest-deep text-balance line-clamp-6 min-h-[9.75em] hyphens-auto"
                        >
                          <span className="text-saffron font-medium">“</span>
                          {q.text.replace(/\n\n/g, " ")}
                          <span className="text-saffron font-medium">”</span>
                        </blockquote>
                      </div>
                      <div className="mt-auto px-6 pt-5 pb-6 md:px-8 md:pt-5 md:pb-8 border-t border-border bg-[#F1EBDD]">
                        <div className="font-medium text-foreground text-sm md:text-base">
                          {q.name}
                        </div>
                        <div className="mt-0.5 text-[11px] md:text-xs text-ink-soft">
                          {[q.role, q.city ?? q.country]
                            .filter(Boolean)
                            .join(" · ")}
                        </div>
                        <div className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#7A1F2B] group-hover:text-[#B8863B] group-focus-visible:text-[#B8863B] group-focus-visible:underline underline-offset-4 transition-colors">
                          Read full review
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </BrandCard>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
