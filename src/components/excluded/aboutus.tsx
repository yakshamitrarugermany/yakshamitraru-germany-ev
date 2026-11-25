import aboutAsset from "@/assets/about.jpg.asset.json";
import heroAsset from "@/assets/hero.jpg.asset.json";
import { BrandCard } from "@/components/site/BrandCard";

import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { Stat } from "@/components/site/Stat";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Award,
  Calendar,
  Compass,
  Globe2,
  GraduationCap,
  Landmark,
  MessageCircle,
  Music4,
  Sparkles,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Yakshamitraru Germany e.V.",
  description:
    "The story, mission and ensemble behind Yakshamitraru Germany e.V. — a registered cultural organisation presenting  and promoting Yakshagana across Germany and Europe.",
  openGraph: {
    title: "About Yakshamitraru Germany e.V.",
    description:
      "Story, mission, vision and leadership of Yakshamitraru Germany e.V. — Yakshagana across Europe.",
    images: [{ url: aboutAsset.url }],
  },
  twitter: {
    card: "summary_large_image",
    images: [aboutAsset.url],
  },
};

const ACTIVITIES = [
  {
    icon: Music4,
    title: "Stage performances",
    body: "Full-length Yakshagana productions on European stages — from intimate halls to open-air festivals.",
  },
  {
    icon: Landmark,
    title: "Cultural events",
    body: "Curated evenings pairing performance with talks, food and craft — designed for first-time audiences.",
  },
  {
    icon: GraduationCap,
    title: "Workshops",
    body: "Hands-on residencies in vesha, chande and bhagavata for children and adults, in German and English.",
  },
  {
    icon: Users,
    title: "Community engagement",
    body: "A gathering point for the Kannada diaspora and a bridge for European audiences new to the form.",
  },
  {
    icon: Globe2,
    title: "Promotion of Yakshagana",
    body: "Editorial, film and documentation projects that carry the tradition into wider European culture.",
  },
];

const VALUES = [
  {
    icon: Landmark,
    title: "Tradition",
    body: "Faithful to a 400-year-old form — its music, its craft, its discipline.",
  },
  {
    icon: Sparkles,
    title: "Culture",
    body: "Presenting Yakshagana as living culture, never as museum artefact.",
  },
  {
    icon: Users,
    title: "Community",
    body: "A generous, welcoming ensemble — for artists and audiences alike.",
  },
  {
    icon: Award,
    title: "Excellence",
    body: "Considered production values, from costume to lighting to sound.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    body: "Passing craft and context to the next generation across Europe.",
  },
];

const WHY = [
  {
    n: "01",
    title: "The only registered Yakshagana e.V. in Germany",
    body: "A formal cultural association — transparent, accountable and accessible to public and private partners.",
  },
  {
    n: "02",
    title: "A resident ensemble, not a booking agency",
    body: "Every artist on stage belongs to Yakshamitraru Germany. One voice, one discipline, one aesthetic.",
  },
  {
    n: "03",
    title: "European-standard production",
    body: "Lighting, sound and stage design built for European venues — without compromising traditional craft.",
  },
  {
    n: "04",
    title: "Bridging two cultures",
    body: "Programmes designed in Kannada, English and German — welcoming both diaspora and first-time audiences.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        padY="tall"
        eyebrow="About the Association"
        title={
          <>
            About <em className="italic font-light">Yakshamitraru</em> Germany.
          </>
        }
        lede="A registered cultural association carrying Yakshagana — the four-hundred-year-old night theatre of Karnataka — onto European stages, with faithful craft and considered presentation."
        meta={
          <>
            <Stat n={2021} label="Founded" />
            <Stat n={20} label="Ensemble members" />
            <Stat n={26} label="European cities" />
            <Stat n={"e.V."} label="Registered association" />
          </>
        }
      />

      {/* 2. Our Story — image + text */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-sm media-zoom shadow-card">
              <Image
                src={heroAsset.url}
                alt="Yakshagana performance on a European stage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-forest-deep/10" />
            </div>
            <div
              aria-hidden
              className="hidden lg:block absolute -top-10 -left-8 font-serif text-[10rem] leading-none text-forest-deep/5 select-none pointer-events-none"
            >
              2018
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="eyebrow text-forest flex items-center gap-3">
              <span className="hairline bg-forest hairline-grow" />
              <span>Our Story</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] text-forest-deep text-balance">
              A tradition <em className="italic font-light">carried home</em>,
              on a new continent.
            </h2>
            <blockquote className="mt-10 border-l-2 border-saffron pl-6 font-serif italic text-xl md:text-2xl text-forest-deep leading-snug">
              &ldquo;We began with a drum, a crown and a few voices in a Berlin
              living room.&rdquo;
            </blockquote>
            <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
              Yakshamitraru Germany e.V. was founded in 2018 by a small circle
              of artists from Karnataka living in Germany — determined that
              Yakshagana would not fade in the diaspora, but flourish here.
            </p>
            <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
              Ten years on, we are a registered German cultural association with
              a resident ensemble, presenting Yakshagana across Europe and
              welcoming new audiences to a living, four-hundred-year-old form.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream" className="pt-0">
        <div className="mx-auto max-w-4xl">
          <div className="eyebrow text-forest flex items-center gap-3">
            <span className="hairline bg-forest hairline-grow" />
            <span>European Stage for Indian Art</span>
          </div>
          <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-3xl">
            The Joy and the Passion motivate the team not only to introduce
            Yakshagana to European audiences but also perform with pride.
            <br />
            <br />
            The team travels across Europe and introduces Yakshagana to European
            audiences.
            <br />
            <br />
            German cities such as Frankfurt, Munich, Berlin, Cologne, Hamburg
            and so on and France, Sweden, Poland, Netherlands, Switzerland,
            Spain, Denmark, and Finland have staged Yakshagana Performances
            between 2018 to 2025.
          </p>
        </div>
      </Section>

      <Section tone="cream" className="pt-0">
        <SectionHeader
          eyebrow="Annual Festival"
          title={
            <>
              Yaksha <em className="italic font-light">Sankranthi</em>.
            </>
          }
          lede="Yaksha Sankranthi, introduced in Frankfurt in 2023, celebrates the spirit of Yakshagana on European stages, bringing traditional performances to diverse audiences while recognising and honouring artists who present and promote Indian art forms across Europe through the Yaksha Mitra Award."
        />
      </Section>

      {/* 3. Mission & Vision */}
      <Section tone="cream" className="pt-0">
        <SectionHeader
          eyebrow="Mission & Vision"
          title={
            <>
              What we <em className="italic font-light">stand for</em>.
            </>
          }
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <BrandCard variant="cream" className="p-8 md:p-12 hover-lift">
            <div className="flex items-center gap-3 text-forest">
              <Compass className="h-5 w-5 text-saffron" />
              <span className="eyebrow">Our Mission</span>
            </div>
            <h3 className="mt-6 font-serif text-3xl md:text-4xl text-forest-deep leading-tight">
              To preserve and present Yakshagana faithfully — for Europe.
            </h3>
            <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
              We stage full-length productions, train new artists and open the
              tradition to European audiences without dilution — carrying the
              music, movement and story of Yakshagana into a wider cultural
              conversation.
            </p>
          </BrandCard>
          <BrandCard variant="forest" className="p-8 md:p-12 hover-lift">
            <div className="flex items-center gap-3 text-saffron">
              <Sparkles className="h-5 w-5" />
              <span className="eyebrow">Our Vision</span>
            </div>
            <h3 className="mt-6 font-serif text-3xl md:text-4xl text-cream leading-tight">
              A European home for the night theatre of Karnataka.
            </h3>
            <p className="mt-6 text-base md:text-lg text-cream/80 leading-relaxed">
              A permanent training studio, a youth ensemble and a touring
              circuit across Europe&apos;s cultural capitals — so Yakshagana
              lives here as it does on its coast: nightly, generously, in full
              voice.
            </p>
          </BrandCard>
        </div>
      </Section>

      {/* 5. What We Do */}
      <Section tone="cream" className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="eyebrow text-forest flex items-center gap-3">
              <span className="hairline bg-forest" />
              <span>What we do</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.05] text-forest-deep text-balance">
              Five ways we carry the tradition{" "}
              <em className="italic font-light">forward</em>.
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Our work spans the stage, the studio and the community — designed
              to present Yakshagana at European scale while keeping its craft
              intact.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ACTIVITIES.map((a) => (
              <BrandCard
                key={a.title}
                variant="cream"
                className="p-7 md:p-8 hover-lift"
              >
                <div className="grid place-items-center h-12 w-12 rounded-full bg-saffron/15 text-saffron">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-forest-deep leading-tight">
                  {a.title}
                </h3>
                <p className="mt-3 text-ink-soft leading-relaxed">{a.body}</p>
              </BrandCard>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. Values */}
      <Section tone="forest">
        <SectionHeader
          eyebrow="Our Values"
          title={
            <>
              The <em className="italic font-light">principles</em> we work by.
            </>
          }
          align="center"
          className="mx-auto text-cream [&_.eyebrow]:text-saffron [&_.hairline]:bg-saffron"
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-cream/10 bg-cream/4 p-7 hover:bg-cream/[0.07] transition-colors"
            >
              <div className="grid place-items-center h-12 w-12 rounded-full bg-saffron/20 text-saffron">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-cream leading-tight">
                {v.title}
              </h3>
              <p className="mt-3 text-sm text-cream/70 leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Why Yakshamitraru Germany */}
      <Section tone="cream" className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="eyebrow text-crimson flex items-center gap-3">
              <span className="hairline bg-crimson/60 hairline-grow" />
              <span>Why Yakshamitraru Germany</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] text-forest-deep text-balance">
              What makes this team <em className="italic font-light">unique</em>
              .
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
              We are not a booking agency, a festival or a temple programme. We
              are a resident ensemble, built for European stages, faithful to a
              Karnataka tradition.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {WHY.map((w) => (
              <div
                key={w.n}
                className="group flex gap-6 rounded-2xl border border-forest-deep/10 bg-cream p-7 md:p-8 hover:border-saffron/50 transition-colors"
              >
                <div className="font-mono text-sm text-saffron pt-1">{w.n}</div>
                <div>
                  <h3 className="font-serif text-2xl text-forest-deep leading-tight">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-ink-soft leading-relaxed">{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 9. Call to Action */}
      <Section tone="forest">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <div className="eyebrow text-saffron flex items-center gap-3">
              <span className="hairline bg-saffron/60" />
              <span>Come closer</span>
            </div>
            <h2 className="display-2 mt-6 text-cream">
              Step into a <em className="italic font-light">Yakshagana</em>{" "}
              night.
            </h2>
            <p className="lede mt-6 text-cream/80 max-w-xl">
              Attend a performance, invite the ensemble to your city, or simply
              write to us. Every conversation begins with an evening of story,
              drum and crown.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Button asChild variant="saffron" size="xl">
              <Link href="/events" className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Attend an event
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline-cream" size="xl">
              <Link
                href="/contact#booking"
                className="inline-flex items-center gap-2"
              >
                Book a performance
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline-cream" size="xl">
              <Link href="/contact" className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact us
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
