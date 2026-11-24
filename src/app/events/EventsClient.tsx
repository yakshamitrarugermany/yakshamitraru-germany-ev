"use client";

import { BrandCard } from "@/components/site/BrandCard";
import { EmptyState } from "@/components/site/EmptyState";
import { EventCard } from "@/components/site/EventCard";
import { FilterSelect } from "@/components/site/FilterSelect";
import { PageHero } from "@/components/site/PageHero";
import {
  Section,
  SectionHeader,
  SectionSeparator,
} from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import type { EventType } from "@/generated/prisma/enums";
import { EVENT_TYPE_LABELS, EVENT_TYPE_VALUES } from "@/lib/events-utils";
import type { PublicEventItem, PublicEventsWhen } from "@/lib/public-events";
import { ArrowUpRight, Calendar, Filter, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const WHEN_OPTIONS = ["Upcoming", "Past"] as const;
const ALL_TYPES_LABEL = "All types";
const TYPE_OPTIONS = [
  ALL_TYPES_LABEL,
  ...EVENT_TYPE_VALUES.map((value) => EVENT_TYPE_LABELS[value]),
] as const;

const LABEL_TO_EVENT_TYPE = Object.fromEntries(
  EVENT_TYPE_VALUES.map((value) => [EVENT_TYPE_LABELS[value], value]),
) as Record<string, EventType>;

interface EventsClientProps {
  events: PublicEventItem[];
  when: PublicEventsWhen;
  type?: EventType;
  hasPastEvents?: boolean;
}

export default function EventsClient({
  events,
  when,
  type,
  hasPastEvents = false,
}: EventsClientProps) {
  const router = useRouter();
  const [featured, ...restUpcoming] = when === "upcoming" ? events : [];

  const whenLabel = when === "past" ? "Past" : "Upcoming";
  const typeLabel = type ? EVENT_TYPE_LABELS[type] : ALL_TYPES_LABEL;

  function updateFilters(nextWhen: PublicEventsWhen, nextType?: EventType) {
    const params = new URLSearchParams();
    if (nextWhen === "past") {
      params.set("when", "past");
    } else {
      params.set("when", "upcoming");
    }
    if (nextType) {
      params.set("type", nextType);
    }
    const qs = params.toString();
    router.push(qs ? `/events?${qs}` : "/events", { scroll: false });
  }

  const filterControls = (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect
        label="Filter by timeframe"
        icon={<Calendar className="h-4 w-4" />}
        variant="filled"
        value={whenLabel}
        options={WHEN_OPTIONS}
        onChange={(label) => {
          updateFilters(label === "Past" ? "past" : "upcoming", type);
        }}
      />
      <FilterSelect
        label="Filter by event type"
        icon={<Filter className="h-4 w-4" />}
        variant="filled"
        value={typeLabel}
        options={TYPE_OPTIONS}
        onChange={(label) => {
          updateFilters(
            when,
            label === ALL_TYPES_LABEL ? undefined : LABEL_TO_EVENT_TYPE[label],
          );
        }}
      />
    </div>
  );

  return (
    <>
      <main>
        <EventsHero />

        {when === "upcoming" ? (
          <>
            <Section tone="cream" id="upcoming">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
                <SectionHeader
                  eyebrow="Upcoming"
                  title={
                    <>
                      Season <span className="italic">2026</span>
                    </>
                  }
                  lede="Programmed with theatres, museums and festival partners across Europe."
                />
                {filterControls}
              </div>
              {events.length === 0 ? (
                hasPastEvents ? (
                  <EmptyState
                    title="No upcoming events right now. Have a look at our past performances."
                    action={
                      <Button asChild variant="forest" size="lg">
                        <Link href="/events?when=past">
                          View past performances
                        </Link>
                      </Button>
                    }
                  />
                ) : (
                  <EmptyState title="Events will be announced soon." />
                )
              ) : (
                <>
                  {featured && <FeaturedEvent event={featured} />}
                  {restUpcoming.length > 0 && (
                    <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {restUpcoming.map((e) => (
                        <EventCard
                          key={e.slug}
                          href={`/events/${e.slug}`}
                          title={e.title}
                          date={e.date}
                          city={e.location}
                          venue={e.organizer || undefined}
                          image={e.image}
                          status={e.status}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </Section>

            <TourMap events={events} />
          </>
        ) : (
          <Section tone="muted" id="past">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
              <SectionHeader
                eyebrow="Archive"
                title={
                  <>
                    Past <span className="italic">productions</span>
                  </>
                }
                lede="A record of previous tours — from chamber sets in museums to full productions on European main stages."
              />
              {filterControls}
            </div>
            {events.length === 0 ? (
              <EmptyState
                title="No past dates listed."
                description="Previous performances will appear here."
              />
            ) : (
              <ol className="divide-y divide-forest-deep/10 border-y border-forest-deep/10">
                {events.map((e) => (
                  <PastRow key={e.slug} event={e} />
                ))}
              </ol>
            )}
          </Section>
        )}
        <SectionSeparator />
      </main>
    </>
  );
}

function EventsHero() {
  return (
    <PageHero
      padY="tall"
      eyebrow="Events & Tour"
      title={
        <>
          Where the{" "}
          <em className="italic font-light text-saffron">Yakshagana</em>
          <br />
          meets Europe.
        </>
      }
      lede="Every performance is programmed with a European host — a theatre, a museum, a festival. Browse the season, revisit the archive, or map our tour across the continent."
    />
  );
}

function FeaturedEvent({ event }: { event: PublicEventItem }) {
  return (
    <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
      <div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-forest-deep media-zoom">
        <div className="relative aspect-16/11 lg:aspect-4/3">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-forest-deep/70 via-transparent to-transparent"
        />
        <div className="absolute top-5 left-5 md:top-6 md:left-6 inline-flex items-center gap-2 rounded-full bg-cream/12 backdrop-blur-md border border-cream/20 px-3 py-1.5 text-[10px] tracking-[0.28em] uppercase text-cream">
          <span className="h-1.5 w-1.5 rounded-full bg-saffron soft-pulse" />
          Next up
        </div>
        <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 flex items-center gap-4 text-cream">
          <div className="grid place-items-center h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-cream text-forest-deep shadow-2xl">
            <div className="text-center leading-none">
              <div className="font-mono text-[10px] uppercase text-crimson">
                {new Date(event.iso).toLocaleString("en-GB", {
                  month: "short",
                  timeZone: "UTC",
                })}
              </div>
              <div className="font-serif text-3xl md:text-4xl mt-0.5">
                {new Date(event.iso).getUTCDate()}
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <div className="eyebrow text-saffron">{event.date}</div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col justify-center">
        {event.organizer && (
          <div className="eyebrow text-crimson">{event.organizer}</div>
        )}
        <Link
          href={`/events/${event.slug}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h3 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05] text-forest-deep text-balance">
            {event.title}
          </h3>
        </Link>
        {event.yakshaganaTitle && (
          <p className="mt-3 font-serif italic text-xl text-forest-deep/75">
            {event.yakshaganaTitle}
          </p>
        )}
        <div className="mt-6 flex items-center gap-2 text-forest-deep/70">
          <MapPin className="h-4 w-4 text-saffron shrink-0" />
          <span className="font-serif text-lg">{event.location}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="forest" size="lg">
            <Link href="/contact#booking">
              Reserve seats <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline-ink" size="lg">
            <Link href="#map">See tour map</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function PastRow({ event }: { event: PublicEventItem }) {
  return (
    <li className="group grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_auto] items-center gap-4 md:gap-8 py-5 md:py-7">
      <Link
        href={`/events/${event.slug}`}
        className="relative hidden md:block h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-forest-deep/10"
      >
        <Image
          src={event.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="min-w-0">
        <div className="font-mono text-xs text-forest-deep/50 tabular-nums">
          {event.date}
        </div>
        <Link href={`/events/${event.slug}`}>
          <div className="mt-1 font-serif text-xl md:text-2xl text-forest-deep hover:text-saffron leading-tight truncate transition-colors">
            {event.title}
          </div>
        </Link>
        {event.yakshaganaTitle && (
          <div className="font-serif italic text-sm text-forest-deep/65 truncate mt-0.5">
            {event.yakshaganaTitle}
          </div>
        )}
        <div className="md:hidden text-xs text-forest-deep/60 mt-1">
          {[event.organizer, event.location].filter(Boolean).join(" · ")}
        </div>
      </div>
      <div className="hidden md:block min-w-0 text-sm text-forest-deep/70">
        {event.organizer && <div className="truncate">{event.organizer}</div>}
        <div className="text-xs text-forest-deep/50 mt-1">{event.location}</div>
      </div>
      <div className="hidden md:block eyebrow text-forest-deep/40 text-[10px] whitespace-nowrap">
        Past
      </div>
    </li>
  );
}

const CITY_COORDS: Record<string, { x: number; y: number }> = {
  "Bonn-Lengsdorf": { x: 465, y: 245 },
  Helsinki: { x: 605, y: 155 },
};

function TourMap({ events }: { events: PublicEventItem[] }) {
  const points = events
    .map((e) => ({ ...e, coords: CITY_COORDS[e.city] }))
    .filter((e) => e.coords);

  return (
    <Section tone="forest" id="map">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <div className="max-w-2xl">
          <div className="eyebrow text-saffron flex items-center gap-3">
            <span className="hairline bg-saffron" />
            <span>Tour Map</span>
          </div>
          <h2 className="display-2 mt-5 text-cream">
            The season, <span className="italic text-saffron">plotted.</span>
          </h2>
          <p className="lede mt-6 text-cream/75">
            Each mark is a confirmed 2026 date. Cities appear as we announce
            them.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-cream/80 min-w-0">
          {points.slice(0, 6).map((p) => (
            <div key={p.slug} className="flex items-baseline gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron shrink-0 -translate-y-0.5" />
              <span className="font-serif text-cream truncate">{p.city}</span>
              <span className="ml-auto font-mono text-xs text-cream/50 tabular-nums">
                {p.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BrandCard variant="glass" className="p-4 md:p-8">
        <div className="relative w-full overflow-hidden rounded-2xl bg-forest-deep/60 ring-1 ring-cream/10">
          <svg
            viewBox="350 140 320 260"
            className="w-full h-auto"
            role="img"
            aria-label="Tour map across Europe"
          >
            <defs>
              <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="var(--saffron)"
                  stopOpacity="0.6"
                />
                <stop
                  offset="100%"
                  stopColor="var(--saffron)"
                  stopOpacity="0"
                />
              </radialGradient>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="color-mix(in oklab, var(--cream) 8%, transparent)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect x="350" y="140" width="320" height="260" fill="url(#grid)" />
            <path
              d="M 380 170 Q 410 155 445 170 T 520 165 Q 560 160 600 175 Q 640 190 655 220 Q 660 260 640 295 Q 620 330 600 345 Q 570 365 545 370 Q 510 380 480 375 Q 445 380 420 365 Q 390 350 375 320 Q 365 285 370 250 Q 372 210 380 170 Z"
              fill="color-mix(in oklab, var(--cream) 6%, transparent)"
              stroke="color-mix(in oklab, var(--cream) 22%, transparent)"
              strokeWidth="0.8"
            />
            {points.map((p) => (
              <g key={p.slug}>
                <circle
                  cx={p.coords.x}
                  cy={p.coords.y}
                  r="14"
                  fill="url(#pulse)"
                />
                <circle
                  cx={p.coords.x}
                  cy={p.coords.y}
                  r="4"
                  fill="var(--saffron)"
                />
                <text
                  x={p.coords.x + 8}
                  y={p.coords.y - 6}
                  fill="var(--cream)"
                  fontSize="7"
                  fontFamily="monospace"
                >
                  {p.city}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-cream/60">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-saffron" />
            <span>Confirmed 2026 date</span>
          </div>
          <Button asChild variant="outline-cream" size="sm">
            <Link href="/contact#booking">Bring us to your city</Link>
          </Button>
        </div>
      </BrandCard>
    </Section>
  );
}
