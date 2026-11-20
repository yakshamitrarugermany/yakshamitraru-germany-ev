"use client";
import { TESTIMONIALS } from "@/data/testimonials";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { BrandCard } from "./BrandCard";
import { Section, SectionHeader } from "./Section";

const HOME_TESTIMONIALS = TESTIMONIALS.slice(0, 3);

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
              <BrandCard
                variant="outline"
                interactive
                className="relative p-6 md:p-8 flex flex-col h-full w-full flex-1"
              >
                <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-forest-deep text-balance">
                  <span className="text-saffron font-medium">“</span>
                  {q.text}
                  <span className="text-saffron font-medium">”</span>
                </blockquote>
                <div className="mt-6 md:mt-auto pt-5 border-t border-border">
                  <div className="font-medium text-foreground text-sm md:text-base">
                    {q.name}
                  </div>
                  <div className="mt-0.5 text-[11px] md:text-xs text-ink-soft">
                    {q.title ?? q.role} · {q.city}
                  </div>
                </div>
              </BrandCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
