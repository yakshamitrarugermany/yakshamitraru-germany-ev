"use client";
import { Section, SectionHeader } from "./Section";
import { BrandCard } from "./BrandCard";
import { motion } from "framer-motion";

const QUOTES = [
  {
    quote:
      "A revelation. Yakshamitraru brought a form most of our audience had never seen — and held them for two hours without a word of German.",
    name: "Dr. Katharina Vogel",
    role: "Programme Director, Haus der Kulturen",
    city: "Berlin",
  },
  {
    quote:
      "Impeccably prepared, generous with context, and utterly compelling on stage. We would host them again tomorrow.",
    name: "Marco Bellini",
    role: "Artistic Lead, Festival Oriente",
    city: "Milano",
  },
  {
    quote:
      "The rider was clean, the ensemble punctual, and the performance singular. A pleasure from first email to curtain call.",
    name: "Anouk Meijer",
    role: "Head of Programming, Muziekgebouw",
    city: "Amsterdam",
  },
];

export function Testimonials() {
  return (
    <Section tone="cream" id="testimonials">
      <SectionHeader
        eyebrow="In their words"
        title={
          <>
            Trusted by theatres,
            <br />
            <span className="italic">festivals and hosts.</span>
          </>
        }
        align="center"
        className="mx-auto"
      />
      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {QUOTES.map((q, i) => (
          <motion.div
            key={q.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.12 }}
            className="h-full"
          >
            <BrandCard
              variant="outline"
              interactive
              className="relative p-8 md:p-10 flex flex-col overflow-hidden h-full"
            >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 -right-2 font-serif text-[10rem] leading-none text-saffron/10 select-none"
            >
              &rdquo;
            </div>
            <div className="relative font-serif text-5xl leading-none text-saffron" aria-hidden>
              &ldquo;
            </div>
            <blockquote className="relative mt-4 font-serif text-xl md:text-2xl leading-snug text-forest-deep text-balance">
              {q.quote}
            </blockquote>
            <div className="relative mt-8 pt-6 border-t border-border">
              <div className="font-medium text-foreground">{q.name}</div>
              <div className="mt-1 text-sm text-ink-soft">
                {q.role} · {q.city}
              </div>
            </div>
            </BrandCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}