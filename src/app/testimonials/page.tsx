import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { TestimonialsList } from "@/components/site/TestimonialCard";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { TestimonialForm } from "./TestimonialForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Reflections and reviews from audiences, theatre hosts, festival organisers and fellow artists across Europe on Yakshamitraru Germany e.V. performances.",
};

function sanitizeDbErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  return raw
    .replace(/postgres(?:ql)?:\/\/[^\s"'`]+/gi, "[REDACTED_URL]")
    .replace(/(password|pwd|secret|token)=[^\s&;"'`]+/gi, "$1=[REDACTED]")
    .replace(/\b[\w.-]+@[\w.-]+\.\w+\b/g, "[REDACTED_EMAIL]")
    .slice(0, 300);
}

async function getApprovedTestimonials(): Promise<Testimonial[]> {
  if (
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL === "PASTE_TRANSACTION_POOLER_URL_HERE"
  ) {
    return TESTIMONIALS;
  }

  try {
    // Select ONLY public fields — never select email
    const dbRows = await prisma.testimonial.findMany({
      where: { status: "APPROVED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        role: true,
        event: true,
        city: true,
        text: true,
        createdAt: true,
      },
    });

    const mappedDbRows: Testimonial[] = dbRows.map((row) => ({
      id: row.id,
      name: row.name.trim(),
      role: row.role || "Audience",
      event: row.event || undefined,
      city: row.city || undefined,
      text: row.text,
      lang: /[\u0C80-\u0CFF]/.test(row.text) ? "kn" : "en",
    }));

    return [...mappedDbRows, ...TESTIMONIALS];
  } catch (err) {
    console.error(
      "[testimonials] Failed to fetch approved testimonials from database, falling back to static data:",
      sanitizeDbErrorMessage(err),
    );
    return TESTIMONIALS;
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getApprovedTestimonials();

  return (
    <>
      <PageHero
        eyebrow="In Their Words · Testimonials"
        title={
          <>
            Words from our <em className="italic font-light">audiences</em> and{" "}
            <em className="italic font-light">hosts</em>
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
        <TestimonialsList items={testimonials} />
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
        <TestimonialForm />
      </Section>
    </>
  );
}
