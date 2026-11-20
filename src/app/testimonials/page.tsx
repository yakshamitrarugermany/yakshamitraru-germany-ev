import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { TestimonialsList } from "@/components/site/TestimonialCard";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/data/testimonials";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Reflections and reviews from audiences, theatre hosts, festival organisers and fellow artists across Europe on Yakshamitraru Germany e.V. performances.",
};

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
        <TestimonialsList items={TESTIMONIALS} />
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
