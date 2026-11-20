"use client";
import { HOME_TESTIMONIAL_IDS, TESTIMONIALS } from "@/data/testimonials";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { BrandCard } from "./BrandCard";
import { Section, SectionHeader } from "./Section";

const HOME_TESTIMONIALS = HOME_TESTIMONIAL_IDS.map((id) =>
  TESTIMONIALS.find((t) => t.id === id),
).filter((t): t is NonNullable<typeof t> => Boolean(t));

export function Testimonials() {
  return (
    <Section tone="cream" id="testimonials">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8 md:mb-14">
        <SectionHeader
          eyebrow="In their words"
          title={
            <>
              Trusted by theatres,
              <br />
              <span className="italic">festivals and hosts.</span>
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

      <div className="relative mt-12 md:mt-16 -mx-6 md:mx-0">
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 px-6 md:px-0 pb-6 md:pb-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar items-stretch scroll-pl-6 md:scroll-pl-0 after:content-[''] after:w-px after:shrink-0 md:after:hidden">
          {HOME_TESTIMONIALS.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.2, 0.7, 0.2, 1],
                delay: i * 0.12,
              }}
              className="shrink-0 w-[85%] sm:w-[45%] md:w-auto snap-start h-auto flex flex-col"
            >
              <Link
                href={`/testimonials#${q.id}`}
                className="group flex flex-col h-full w-full flex-1 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8863B]"
              >
                <BrandCard
                  variant="outline"
                  interactive
                  className="relative p-6 md:p-8 flex flex-col h-full w-full flex-1"
                >
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
                    className="font-serif text-lg md:text-xl leading-relaxed text-forest-deep text-balance line-clamp-4 hyphens-auto"
                  >
                    <span className="text-saffron font-medium">“</span>
                    {q.text.replace(/\n\n/g, " ")}
                    <span className="text-saffron font-medium">”</span>
                  </blockquote>
                  <div className="mt-6 md:mt-auto pt-5 border-t border-border">
                    <div className="font-medium text-foreground text-sm md:text-base">
                      {q.name}
                    </div>
                    <div className="mt-0.5 text-[11px] md:text-xs text-ink-soft">
                      {[q.role, q.city ?? q.country].filter(Boolean).join(" · ")}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#7A1F2B] group-hover:text-[#B8863B] group-focus-visible:text-[#B8863B] group-focus-visible:underline underline-offset-4 transition-colors">
                      Read full review
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </BrandCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
