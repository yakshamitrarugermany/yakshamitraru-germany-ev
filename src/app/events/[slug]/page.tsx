import { BookSection } from "@/components/site/BookSection";
import { BrandCard } from "@/components/site/BrandCard";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import {
  getPublicEventBySlug,
  type PublicEventItem,
} from "@/lib/public-events";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const e = await getPublicEventBySlug(resolvedParams.slug);
  if (!e) {
    return {
      title: "Event Not Found — Yakshamitraru Germany e.V.",
    };
  }
  const title = `${e.title} — ${e.location} · Yakshamitraru Germany e.V.`;
  const parts = [
    e.yakshaganaTitle,
    e.organisedBy ? `Organised by ${e.organisedBy}` : null,
    `${e.date} at ${e.location}`,
  ].filter(Boolean);
  const description = `${parts.join(". ")}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: e.image }],
    },
    twitter: {
      card: "summary_large_image",
      images: [e.image],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const event = await getPublicEventBySlug(resolvedParams.slug);
  if (!event) notFound();

  return (
    <>
      <main>
        <EventHero event={event} />
        <DateVenue event={event} />
        {event.artists && event.artists.length > 0 && (
          <ArtistsSection artists={event.artists} />
        )}
        <BookSection />
      </main>
    </>
  );
}

function EventHero({ event }: { event: PublicEventItem }) {
  const d = new Date(event.iso);
  const eyebrowText = event.organisedBy || event.organizer;
  return (
    <section className="relative min-h-[80svh] w-full overflow-hidden bg-forest-deep text-cream">
      <div className="absolute inset-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-forest-deep/80 via-forest-deep/40 to-forest-deep" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[10%] h-150 w-150 gold-radial opacity-25"
        />
      </div>

      <div className="relative container-page pt-32 md:pt-40 pb-16 md:pb-24 min-h-[80svh] flex flex-col">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-cream/70 hover:text-saffron text-sm w-fit"
        >
          <ArrowLeft className="h-4 w-4" /> All events
        </Link>

        <div className="mt-auto grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 md:gap-12 items-end">
          <div className="hidden lg:grid place-items-center h-32 w-32 rounded-3xl bg-cream text-forest-deep shadow-2xl">
            <div className="text-center leading-none">
              <div className="font-mono text-xs uppercase text-crimson tracking-widest">
                {d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" })}
              </div>
              <div className="font-serif text-6xl mt-2">{d.getUTCDate()}</div>
              <div className="font-mono text-xs text-forest-deep/60 mt-2 tabular-nums">
                {d.getUTCFullYear()}
              </div>
            </div>
          </div>
          <div className="max-w-4xl">
            {eyebrowText && (
              <div className="flex flex-wrap items-center gap-3 text-saffron">
                <span className="hairline bg-saffron hairline-grow" />
                <span className="eyebrow">{eyebrowText}</span>
              </div>
            )}
            <h1 className="mt-6 font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-none text-cream text-balance drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
              {event.title}
            </h1>
            {event.yakshaganaTitle && (
              <p className="mt-4 font-serif italic text-xl md:text-2xl text-saffron/90">
                {event.yakshaganaTitle}
              </p>
            )}

            {event.status === "upcoming" && (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild variant="saffron" size="pill">
                  <Link href="/contact#booking">Enquire / Reserve</Link>
                </Button>
              </div>
            )}

            <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 border-t border-cream/15 pt-8 max-w-4xl">
              <MetaItem k="Date" v={event.date} />
              <MetaItem k="Location" v={event.location} />
              {event.organisedBy && (
                <MetaItem k="Organised by" v={event.organisedBy} />
              )}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaItem({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="eyebrow text-saffron/80">{k}</div>
      <div className="mt-2 font-serif text-base md:text-lg text-cream">{v}</div>
    </div>
  );
}

function DateVenue({ event }: { event: PublicEventItem }) {
  return (
    <Section tone="cream">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <BrandCard variant="outline" className="p-8 md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-deep text-saffron">
              <Calendar className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="eyebrow text-forest-deep/60">When</div>
              <h3 className="heading-lg mt-2 text-forest-deep">{event.date}</h3>
              {event.yakshaganaTitle && (
                <div className="mt-3 text-sm text-forest-deep/75">
                  Yakshagana: {event.yakshaganaTitle}
                </div>
              )}
              {event.organisedBy && (
                <div className="mt-2 text-sm text-forest-deep/70">
                  Organised by: {event.organisedBy}
                </div>
              )}
            </div>
          </div>
        </BrandCard>

        <BrandCard variant="forest" className="p-8 md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream/10 text-saffron">
              <MapPin className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="eyebrow text-saffron">Where</div>
              <h3 className="heading-lg mt-2 text-cream">{event.location}</h3>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(event.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-cream/70 hover:text-saffron underline underline-offset-4"
                >
                  Open in maps ↗
                </a>
              </div>
            </div>
          </div>
        </BrandCard>
      </div>
    </Section>
  );
}

function ArtistsSection({ artists }: { artists: string[] }) {
  return (
    <Section tone="cream" id="artists" className="pt-0">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <SectionHeader
          eyebrow="On stage"
          title={
            <>
              Artists who <span className="italic">performed</span>
            </>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {artists.map((name) => (
          <BrandCard
            key={name}
            variant="outline"
            className="p-6 md:p-7 flex items-center gap-4"
          >
            <div className="min-w-0">
              <div className="font-serif text-lg text-forest-deep truncate">
                {name}
              </div>
            </div>
          </BrandCard>
        ))}
      </div>
    </Section>
  );
}
