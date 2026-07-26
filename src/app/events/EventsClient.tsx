"use client";
import { useMemo, useState } from "react";
import { PageContainer } from "@/components/site/PageContainer";
import { BookSection } from "@/components/site/BookSection";
import { Section, SectionHeader } from "@/components/site/Section";
import { EventCard } from "@/components/site/EventCard";
import { BrandCard } from "@/components/site/BrandCard";
import { EmptyState } from "@/components/site/EmptyState";
import { FilterSelect } from "@/components/site/FilterSelect";
import { PageHero } from "@/components/site/PageHero";
import { Stat } from "@/components/site/Stat";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Filter, ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import aboutAsset from "@/assets/about.jpg.asset.json";

type EventItem = {
  title: string;
  date: string;
  iso: string;
  city: string;
  country: string;
  venue: string;
  image: string;
  format: "Full production" | "Concert set" | "Workshop";
  status: "upcoming" | "past";
  slug: string;
};

const EVENTS: EventItem[] = [
  { slug: "devi-mahatme-berlin", title: "Devi Mahatme — Premiere", date: "Sat, 12 Sep 2026 · 19:30", iso: "2026-09-12", city: "Berlin", country: "Germany", venue: "Haus der Kulturen der Welt", image: perf1.url, format: "Full production", status: "upcoming" },
  { slug: "ornament-and-origin", title: "Ornament & Origin", date: "Fri, 03 Oct 2026 · 20:00", iso: "2026-10-03", city: "Zürich", country: "Switzerland", venue: "Kunsthaus Zürich", image: perf2.url, format: "Concert set", status: "upcoming" },
  { slug: "himmela-concert", title: "Himmela — Concert set", date: "Sun, 26 Oct 2026 · 18:00", iso: "2026-10-26", city: "Amsterdam", country: "Netherlands", venue: "Muziekgebouw", image: perf3.url, format: "Concert set", status: "upcoming" },
  { slug: "krishna-sandhana", title: "Krishna Sandhana", date: "Sat, 14 Nov 2026 · 19:00", iso: "2026-11-14", city: "München", country: "Germany", venue: "Muffatwerk", image: aboutAsset.url, format: "Full production", status: "upcoming" },
  { slug: "rhythm-of-the-chende", title: "Rhythm of the Chende — Workshop", date: "Sat, 28 Nov 2026 · 14:00", iso: "2026-11-28", city: "Paris", country: "France", venue: "Musée Guimet", image: perf1.url, format: "Workshop", status: "upcoming" },
  { slug: "abhimanyu-kalaga", title: "Abhimanyu Kalaga", date: "Sat, 12 Dec 2026 · 20:00", iso: "2026-12-12", city: "Wien", country: "Austria", venue: "MuseumsQuartier Halle E", image: perf2.url, format: "Full production", status: "upcoming" },
  { slug: "sudhanva-vijaya", title: "Sudhanva Vijaya", date: "Sat, 22 Mar 2025 · 19:30", iso: "2025-03-22", city: "Hamburg", country: "Germany", venue: "Kampnagel", image: perf3.url, format: "Full production", status: "past" },
  { slug: "panchavati-chamber", title: "Panchavati — Chamber set", date: "Fri, 06 Jun 2025 · 20:00", iso: "2025-06-06", city: "Brussels", country: "Belgium", venue: "BOZAR", image: perf1.url, format: "Concert set", status: "past" },
  { slug: "karna-parva", title: "Karna Parva", date: "Sat, 18 Oct 2025 · 19:00", iso: "2025-10-18", city: "Frankfurt", country: "Germany", venue: "Mousonturm", image: perf2.url, format: "Full production", status: "past" },
  { slug: "bhasmasura-mohini", title: "Bhasmasura Mohini", date: "Sun, 23 Nov 2025 · 18:00", iso: "2025-11-23", city: "Köln", country: "Germany", venue: "Comedia Theater", image: aboutAsset.url, format: "Full production", status: "past" },
  { slug: "ritual-to-stage", title: "Ritual to Stage — Workshop", date: "Sat, 07 Feb 2026 · 14:00", iso: "2026-02-07", city: "Stuttgart", country: "Germany", venue: "Theater Rampe", image: perf3.url, format: "Workshop", status: "past" },
];

const FORMATS = ["All formats", "Full production", "Concert set", "Workshop"] as const;
const COUNTRIES = ["All countries", "Germany", "Switzerland", "Netherlands", "France", "Austria", "Belgium"] as const;

export default function EventsClient() {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("All formats");
  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>("All countries");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EVENTS.filter((e) => {
      if (format !== "All formats" && e.format !== format) return false;
      if (country !== "All countries" && e.country !== country) return false;
      if (!q) return true;
      return [e.title, e.city, e.country, e.venue].some((f) => f.toLowerCase().includes(q));
    });
  }, [query, format, country]);

  const upcoming = filtered.filter((e) => e.status === "upcoming");
  const past = filtered.filter((e) => e.status === "past");
  const [featured, ...restUpcoming] = upcoming;

  return (
    <PageContainer>
      <main>
        <EventsHero />
        <SearchFilters
          query={query}
          setQuery={setQuery}
          format={format}
          setFormat={setFormat}
          country={country}
          setCountry={setCountry}
          total={filtered.length}
        />

        <Section tone="cream" id="upcoming">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
            <SectionHeader
              eyebrow="Upcoming"
              title={<>Season <span className="italic">2026</span></>}
              lede="Programmed with theatres, museums and festival partners across Europe."
            />
            <div className="eyebrow text-forest-deep/60">{upcoming.length} date{upcoming.length === 1 ? "" : "s"}</div>
          </div>
          {upcoming.length === 0 ? (
            <EmptyState
              title="No upcoming dates match these filters."
              description="Try clearing filters or a different search term."
            />
          ) : (
            <>
              {featured && <FeaturedEvent event={featured} />}
              {restUpcoming.length > 0 && (
                <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {restUpcoming.map((e) => (
                    <EventCard key={e.title + e.iso} href={`/events/${e.slug}`} {...e} />
                  ))}
                </div>
              )}
            </>
          )}
        </Section>

        <TourMap events={upcoming} />

        <Section tone="muted" id="past">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
            <SectionHeader
              eyebrow="Archive"
              title={<>Past <span className="italic">productions</span></>}
              lede="A record of previous tours — from chamber sets in museums to full productions on European main stages."
            />
            <div className="eyebrow text-forest-deep/60">{past.length} date{past.length === 1 ? "" : "s"}</div>
          </div>
          {past.length === 0 ? (
            <EmptyState
              title="No past dates match these filters."
              description="Try clearing filters or a different search term."
            />
          ) : (
            <ol className="divide-y divide-forest-deep/10 border-y border-forest-deep/10">
              {past.map((e) => (
                <PastRow key={e.title + e.iso} event={e} />
              ))}
            </ol>
          )}
        </Section>

        <BookSection />
      </main>
    </PageContainer>
  );
}

function EventsHero() {
  return (
    <PageHero
      padY="tall"
      eyebrow="Events & Tour"
      title={
        <>
          Where the <em className="italic font-light text-saffron">chende</em>
          <br />
          meets Europe.
        </>
      }
      lede="Every performance is programmed with a European host — a theatre, a museum, a festival. Browse the season, revisit the archive, or map our tour across the continent."
      meta={
        <>
          <Stat n={6} label="Upcoming dates" />
          <Stat n={7} label="Countries" />
          <Stat n={5} label="Past productions" />
        </>
      }
    />
  );
}

function SearchFilters({
  query,
  setQuery,
  format,
  setFormat,
  country,
  setCountry,
  total,
}: {
  query: string;
  setQuery: (v: string) => void;
  format: (typeof FORMATS)[number];
  setFormat: (v: (typeof FORMATS)[number]) => void;
  country: (typeof COUNTRIES)[number];
  setCountry: (v: (typeof COUNTRIES)[number]) => void;
  total: number;
}) {
  return (
    <section className="sticky top-16 md:top-20 z-40 bg-cream/90 backdrop-blur-xl border-b border-forest-deep/10">
      <div className="container-page py-4 md:py-5">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <label className="relative flex items-center flex-1 min-w-0">
            <Search className="absolute left-0 h-4 w-4 text-forest-deep/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, city or venue…"
              className="w-full bg-transparent border-0 border-b border-forest-deep/15 pl-7 pr-4 py-3 text-base text-forest-deep placeholder:text-forest-deep/40 focus:outline-none focus:border-forest-deep transition-colors"
            />
          </label>
          <div className="flex items-center gap-2 md:gap-3">
            <FilterSelect icon={<Filter className="h-4 w-4" />} value={format} onChange={(v) => setFormat(v as typeof format)} options={FORMATS as readonly string[]} />
            <FilterSelect icon={<MapPin className="h-4 w-4" />} value={country} onChange={(v) => setCountry(v as typeof country)} options={COUNTRIES as readonly string[]} />
            <div className="hidden lg:flex items-center gap-2 text-xs text-forest-deep/60 pl-4 border-l border-forest-deep/10">
              <Calendar className="h-4 w-4 text-saffron" />
              <span className="tabular-nums font-mono">{total}</span>
              <span>result{total === 1 ? "" : "s"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedEvent({ event }: { event: EventItem }) {
  const [dayLine, timeLine] = event.date.split(" · ");
  return (
    <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
      <div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-forest-deep media-zoom">
        <div className="relative aspect-[16/11] lg:aspect-[4/3]">
          <Image src={event.image} alt={event.title} fill className="object-cover" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
        <div className="absolute top-5 left-5 md:top-6 md:left-6 inline-flex items-center gap-2 rounded-full bg-cream/12 backdrop-blur-md border border-cream/20 px-3 py-1.5 text-[10px] tracking-[0.28em] uppercase text-cream">
          <span className="h-1.5 w-1.5 rounded-full bg-saffron soft-pulse" />
          Next up · {event.format}
        </div>
        <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 flex items-center gap-4 text-cream">
          <div className="grid place-items-center h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-cream text-forest-deep shadow-2xl">
            <div className="text-center leading-none">
              <div className="font-mono text-[10px] uppercase text-crimson">{new Date(event.iso).toLocaleString("en-GB", { month: "short" })}</div>
              <div className="font-serif text-3xl md:text-4xl mt-0.5">{new Date(event.iso).getDate()}</div>
            </div>
          </div>
          <div className="min-w-0">
            <div className="eyebrow text-saffron">{dayLine}</div>
            {timeLine && <div className="mt-1 text-sm text-cream/80 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{timeLine}</div>}
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="eyebrow text-crimson">Featured performance</div>
        <Link href={`/events/${event.slug}`} className="hover:opacity-80 transition-opacity">
          <h3 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05] text-forest-deep text-balance">
            {event.title}
          </h3>
        </Link>
        <div className="mt-6 flex items-center gap-2 text-forest-deep/70">
          <MapPin className="h-4 w-4 text-saffron shrink-0" />
          <span className="font-serif text-lg">{event.venue}</span>
          <span className="text-forest-deep/30">·</span>
          <span className="text-sm">{event.city}, {event.country}</span>
        </div>
        <p className="mt-6 text-forest-deep/75 leading-relaxed max-w-lg">
          A signature evening from the {new Date(event.iso).getFullYear()} season — programmed with our European host partner and staged for a continental audience.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="forest" size="lg">
            <Link href="/contact#booking">Reserve seats <ArrowUpRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline-ink" size="lg">
            <Link href="#map">See tour map</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function PastRow({ event }: { event: EventItem }) {
  const d = new Date(event.iso);
  return (
    <li className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] items-center gap-4 md:gap-8 py-5 md:py-7">
      <Link href={`/events/${event.slug}`} className="relative hidden md:block h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-forest-deep/10">
        <Image src={event.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="min-w-0">
        <div className="font-mono text-xs text-forest-deep/50 tabular-nums">
          {d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        </div>
        <Link href={`/events/${event.slug}`}>
          <div className="mt-1 font-serif text-xl md:text-2xl text-forest-deep hover:text-saffron leading-tight truncate transition-colors">
            {event.title}
          </div>
        </Link>
      </div>
      <div className="hidden md:block min-w-0 text-sm text-forest-deep/70">
        <div className="truncate">{event.venue}</div>
        <div className="text-xs text-forest-deep/50 mt-1">{event.city}, {event.country}</div>
      </div>
      <div className="eyebrow text-forest-deep/40 text-[10px] whitespace-nowrap">
        {event.format}
      </div>
    </li>
  );
}

const CITY_COORDS: Record<string, { x: number; y: number }> = {
  Berlin: { x: 545, y: 210 },
  Zürich: { x: 470, y: 340 },
  Amsterdam: { x: 445, y: 200 },
  München: { x: 520, y: 310 },
  Paris: { x: 405, y: 290 },
  Wien: { x: 585, y: 305 },
  Hamburg: { x: 505, y: 180 },
  Brussels: { x: 425, y: 245 },
  Frankfurt: { x: 485, y: 265 },
  Köln: { x: 465, y: 240 },
  Stuttgart: { x: 490, y: 300 },
};

function TourMap({ events }: { events: EventItem[] }) {
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
            Each mark is a confirmed 2026 date. Cities appear as we announce them.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-cream/80 min-w-0">
          {points.slice(0, 6).map((p) => (
            <div key={p.title + p.iso} className="flex items-baseline gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron shrink-0 translate-y-[-2px]" />
              <span className="font-serif text-cream truncate">{p.city}</span>
              <span className="ml-auto font-mono text-xs text-cream/50 tabular-nums">
                {p.iso.slice(5).replace("-", "/")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BrandCard variant="glass" className="p-4 md:p-8">
        <div className="relative w-full overflow-hidden rounded-2xl bg-forest-deep/60 ring-1 ring-cream/10">
          <svg viewBox="350 140 320 260" className="w-full h-auto" role="img" aria-label="Tour map across Europe">
            <defs>
              <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--saffron)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--saffron)" stopOpacity="0" />
              </radialGradient>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="color-mix(in oklab, var(--cream) 8%, transparent)" strokeWidth="0.5" />
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
              <g key={p.title + p.iso}>
                <circle cx={p.coords.x} cy={p.coords.y} r="14" fill="url(#pulse)" />
                <circle cx={p.coords.x} cy={p.coords.y} r="4" fill="var(--saffron)" />
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
          {points.length === 0 && (
            <div className="absolute inset-0 grid place-items-center text-cream/60 text-sm">
              No dates match the current filters.
            </div>
          )}
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
