import aboutAsset from "@/assets/about.jpg.asset.json";
import { BrandCard } from "@/components/site/BrandCard";
import { PageContainer } from "@/components/site/PageContainer";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Calendar,
  Globe,
  MonitorPlay,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn — Yakshamitraru Germany e.V.",
  description:
    "Learn Yakshagana online across Europe. Join our online classes for beginners and experienced artists.",
};

const BENEFITS = [
  {
    icon: MonitorPlay,
    title: "Online Live Classes",
    body: "Learn from the comfort of your home anywhere in Europe through interactive live video sessions.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    body: "Receive guidance from experienced artists and seasoned practitioners of Yakshagana.",
  },
  {
    icon: Globe,
    title: "European Community",
    body: "Join a growing community of learners and enthusiasts across different European countries.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    body: "Weekend batches designed to accommodate working professionals and students in European timezones.",
  },
];

export default function LearnPage() {
  return (
    <PageContainer>
      {/* 1. Hero */}
      <PageHero
        padY="tall"
        eyebrow="Yakshagana Classes"
        title={
          <>
            Learn the <em className="italic font-light">Art Form</em>.
          </>
        }
        lede="We offer structured online Yakshagana training for enthusiasts across Europe, preserving the authenticity of the tradition while making it accessible remotely."
      />

      {/* 2. About the Classes */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm media-zoom shadow-[0_50px_120px_-40px_color-mix(in_oklab,var(--forest-deep)_60%,transparent)]">
              <Image
                src={aboutAsset.url}
                alt="Yakshagana artists backstage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-forest-deep/10" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="eyebrow text-forest flex items-center gap-3">
              <span className="hairline bg-forest hairline-grow" />
              <span>Curriculum</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] text-forest-deep text-balance">
              Rigorous training, <em className="italic font-light">modern</em>{" "}
              delivery.
            </h2>
            <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
              Our curriculum covers the foundational elements of Yakshagana —
              starting with the basic steps (Hejje) and body movements,
              progressing to complex dance sequences and emotional expression
              (Abhinaya).
            </p>
            <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
              Classes are conducted in Kannada and English, making them
              welcoming to both the diaspora wanting to connect with their roots
              and Europeans drawn to the theatre form.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Why join us */}
      <Section tone="forest" className="pt-24 pb-32">
        <SectionHeader
          eyebrow="Why Join Us"
          title={
            <>
              A bridge to{" "}
              <em className="italic font-light">coastal Karnataka</em>.
            </>
          }
          align="center"
          className="mx-auto text-cream [&_.eyebrow]:text-saffron [&_.hairline]:bg-saffron"
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 z-10 relative">
          {BENEFITS.map((b) => (
            <BrandCard
              key={b.title}
              variant="forest"
              className="p-8 hover-lift border border-cream/10 bg-cream/4"
            >
              <div className="grid place-items-center h-12 w-12 rounded-full bg-saffron/15 text-saffron">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-cream leading-tight">
                {b.title}
              </h3>
              <p className="mt-3 text-cream/70 leading-relaxed">{b.body}</p>
            </BrandCard>
          ))}
        </div>
      </Section>

      {/* 4. CTA */}
      <Section tone="cream" className="text-center py-32">
        <div className="max-w-2xl mx-auto">
          <div className="eyebrow text-saffron flex items-center justify-center gap-3">
            <span className="hairline bg-saffron/60" />
            <span>Enroll Today</span>
            <span className="hairline bg-saffron/60" />
          </div>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl text-forest-deep leading-tight">
            Begin your journey.
          </h2>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            New batches begin periodically. Reach out to us to express your
            interest and we will get back to you with the schedule and
            prerequisites.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="saffron" size="xl">
              <Link href="/contact" className="inline-flex items-center gap-2">
                Inquire about Classes
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
