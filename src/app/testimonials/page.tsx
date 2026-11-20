import { BrandCard } from "@/components/site/BrandCard";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Reflections and reviews from audiences, theatre hosts, festival organisers and fellow artists across Europe on Yakshamitraru Germany e.V. performances.",
};

function TestimonialCard({ item }: { item: Testimonial }) {
  const paragraphs = item.text.split("\n\n");

  return (
    <BrandCard
      variant="cream"
      interactive
      className="mb-6 md:mb-8 break-inside-avoid p-6 sm:p-8 md:p-9 flex flex-col justify-between border border-forest-deep/10 shadow-[0_24px_60px_-35px_rgba(47,82,51,0.18)]"
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

        <blockquote className="mt-3 space-y-4 font-serif text-lg sm:text-xl md:text-[1.35rem] leading-relaxed text-forest-deep">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </blockquote>
      </div>

      <footer className="mt-7 pt-5 border-t border-border flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="font-serif text-lg md:text-xl font-medium text-[#7A1F2B]">
            {item.name}
          </div>
          {item.title && (
            <div className="mt-0.5 text-xs text-ink-soft">{item.title}</div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1 font-medium text-forest-deep">
            <Sparkles className="h-3.5 w-3.5 text-[#B8863B]" />
            {item.event}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[#7A1F2B]/70" />
            {item.city}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-ink-soft/70" />
            {item.date}
          </span>
        </div>
      </footer>
    </BrandCard>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="In Their Words · Testimonials"
        title={
          <>
            Words from our <em className="italic font-light">audiences</em> and
            hosts
          </>
        }
        lede="Reflections from theatre directors, festival curators, fellow artists and audience members who have experienced Yakshamitraru Germany across Europe."
        actions={
          <Button asChild variant="saffron" size="xl">
            <a href="#share-your-experience">Share your experience</a>
          </Button>
        }
      />

      <Section tone="cream">
        <div className="columns-1 md:columns-2 gap-6 md:gap-8">
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      <Section
        tone="muted"
        size="sm"
        id="share-your-experience"
        className="border-t border-border/60"
      >
        <SectionHeader
          eyebrow="Your Voice"
          title={
            <>
              Share your <em className="italic font-light">experience.</em>
            </>
          }
          lede="Were you in the audience or did you host a Yakshamitraru performance? Leave your reflections below."
        />
      </Section>

      <Section tone="forest" size="sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-cream/85 hover:text-saffron transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <Button asChild variant="saffron" size="xl">
            <Link
              href="/contact#booking"
              className="inline-flex items-center gap-2"
            >
              Book a performance
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
