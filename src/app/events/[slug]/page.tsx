import { PageContainer } from "@/components/site/PageContainer";
import { BookSection } from "@/components/site/BookSection";
import { Section, SectionHeader } from "@/components/site/Section";
import { BrandCard } from "@/components/site/BrandCard";
import { EventCard } from "@/components/site/EventCard";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Ticket, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import aboutAsset from "@/assets/about.jpg.asset.json";

type Artist = { name: string; role: string };
type ScheduleItem = { time: string; label: string };
type Faq = { q: string; a: string };
type RelatedRef = { slug: string; title: string; date: string; city: string; venue: string; image: string };

type EventDetail = {
  slug: string;
  title: string;
  subtitle: string;
  synopsis: string;
  date: string;
  iso: string;
  doors: string;
  duration: string;
  city: string;
  country: string;
  venue: string;
  address: string;
  format: string;
  language: string;
  ticketFrom: string;
  ticketUrl: string;
  hero: string;
  schedule: ScheduleItem[];
  artists: Artist[];
  gallery: { src: string; caption: string }[];
  faq: Faq[];
  related: RelatedRef[];
};

const EVENTS: Record<string, EventDetail> = {
  "devi-mahatme-berlin": {
    slug: "devi-mahatme-berlin",
    title: "Devi Mahatme",
    subtitle: "European Premiere — full production",
    synopsis:
      "A night-long Yakshagana prasanga staged for European audiences in a two-hour concert form. Crown, chende, song and story converge around the eternal battle between light and shadow.",
    date: "Sat, 12 Sep 2026",
    iso: "2026-09-12",
    doors: "19:00 · Show 19:30",
    duration: "2h 10min · one interval",
    city: "Berlin",
    country: "Germany",
    venue: "Haus der Kulturen der Welt",
    address: "John-Foster-Dulles-Allee 10, 10557 Berlin",
    format: "Full production",
    language: "Kannada with German & English surtitles",
    ticketFrom: "€ 28",
    ticketUrl: "/contact#booking",
    hero: perf1.url,
    schedule: [
      { time: "19:00", label: "Doors open · foyer music" },
      { time: "19:30", label: "Purvaranga — invocation & rhythm" },
      { time: "19:50", label: "Act I — Devi's descent" },
      { time: "20:40", label: "Interval" },
      { time: "21:00", label: "Act II — Mahishasura Mardini" },
      { time: "21:40", label: "Bows · meet the ensemble" },
    ],
    artists: [
      { name: "Ravi Bhat", role: "Bhagavata · lead vocals" },
      { name: "Anantha Padmanabha", role: "Chende" },
      { name: "Sujay Hegde", role: "Maddale" },
      { name: "Prabha Kamath", role: "Stri-vesha · Devi" },
      { name: "Kiran Shastri", role: "Pundu-vesha · Mahishasura" },
      { name: "Vinaya Rao", role: "Costume & crown design" },
    ],
    gallery: [
      { src: perf1.url, caption: "Devi's entry — Act I" },
      { src: perf2.url, caption: "Chende & maddale" },
      { src: perf3.url, caption: "The crown, close" },
      { src: aboutAsset.url, caption: "Rehearsal, Berlin" },
    ],
    faq: [
      {
        q: "Do I need to know Kannada or the story to enjoy the show?",
        a: "No. Full German and English surtitles run above the stage, and the programme booklet outlines the story, characters and musical form.",
      },
      {
        q: "How long is the performance?",
        a: "Two hours and ten minutes with one twenty-minute interval. Latecomers are admitted between scenes.",
      },
      {
        q: "Is the venue accessible?",
        a: "Yes — Haus der Kulturen der Welt is fully step-free with reserved wheelchair spaces and induction loops. Please note requirements at checkout.",
      },
      {
        q: "Can I photograph the performance?",
        a: "Photography is welcome during the bows only. Please put phones away during the show — the light disturbs both artists and audience.",
      },
      {
        q: "Is there a pre-show introduction?",
        a: "Yes. A twenty-minute talk in the foyer at 19:00 introduces the form, the story and the ensemble.",
      },
    ],
    related: [
      { slug: "ornament-and-origin-zurich", title: "Ornament & Origin", date: "Fri, 03 Oct 2026", city: "Zürich", venue: "Kunsthaus Zürich", image: perf2.url },
      { slug: "himmela-amsterdam", title: "Himmela — Concert set", date: "Sun, 26 Oct 2026", city: "Amsterdam", venue: "Muziekgebouw", image: perf3.url },
      { slug: "krishna-sandhana-munich", title: "Krishna Sandhana", date: "Sat, 14 Nov 2026", city: "München", venue: "Muffatwerk", image: aboutAsset.url },
    ],
  },
};

const FALLBACK: EventDetail = {
  ...EVENTS["devi-mahatme-berlin"],
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const e = EVENTS[resolvedParams.slug] ?? FALLBACK;
  const title = `${e.title} — ${e.city} · Yakshamitraru Germany e.V.`;
  const description = `${e.subtitle}. ${e.date} at ${e.venue}, ${e.city}. Book tickets or enquire about a European tour date.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: e.hero }],
    },
    twitter: {
      card: "summary_large_image",
      images: [e.hero],
    },
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const event = EVENTS[resolvedParams.slug] ?? FALLBACK;
  if (!event) notFound();

  return (
    <PageContainer>
      <main>
        <EventHero event={event} />
        <DateVenue event={event} />
        <ScheduleSection items={event.schedule} />
        <ArtistsSection artists={event.artists} />
        <GallerySection images={event.gallery} />
        <FAQSection faq={event.faq} />
        <RelatedSection related={event.related} />
        <BookSection />
      </main>
    </PageContainer>
  );
}

function EventHero({ event }: { event: EventDetail }) {
  const d = new Date(event.iso);
  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden bg-forest-deep text-cream">
      <div className="absolute inset-0">
        <Image src={event.hero} alt={event.title} fill className="object-cover object-center opacity-70" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/40 to-forest-deep" />
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[10%] h-[600px] w-[600px] gold-radial opacity-25" />
      </div>

      <div className="relative container-page pt-32 md:pt-40 pb-16 md:pb-24 min-h-[92svh] flex flex-col">
        <Link href="/events" className="inline-flex items-center gap-2 text-cream/70 hover:text-saffron text-sm w-fit">
          <ArrowLeft className="h-4 w-4" /> All events
        </Link>

        <div className="mt-auto grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 md:gap-12 items-end">
          <div className="hidden lg:grid place-items-center h-32 w-32 rounded-3xl bg-cream text-forest-deep shadow-2xl">
            <div className="text-center leading-none">
              <div className="font-mono text-xs uppercase text-crimson tracking-widest">{d.toLocaleString("en-GB", { month: "short" })}</div>
              <div className="font-serif text-6xl mt-2">{d.getDate()}</div>
              <div className="font-mono text-xs text-forest-deep/60 mt-2 tabular-nums">{d.getFullYear()}</div>
            </div>
          </div>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-saffron">
              <span className="hairline bg-saffron hairline-grow" />
              <span className="eyebrow">{event.format}</span>
              <span className="text-cream/40">·</span>
              <span className="eyebrow text-cream/70">{event.city}, {event.country}</span>
            </div>
            <h1 className="mt-6 font-serif text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] text-cream text-balance drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
              {event.title}
            </h1>
            <p className="mt-6 max-w-2xl font-serif italic text-xl md:text-2xl text-cream/80">
              {event.subtitle}
            </p>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-cream/70 leading-relaxed">
              {event.synopsis}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="saffron" size="pill">
              <Link href={event.ticketUrl}>Tickets from {event.ticketFrom}</Link>
            </Button>
            <Button asChild variant="outline-cream" size="pill">
              <Link href="#schedule">See the schedule</Link>
            </Button>
            </div>

            <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-cream/15 pt-8 max-w-4xl">
              <MetaItem k="Date" v={event.date} />
              <MetaItem k="Doors" v={event.doors} />
              <MetaItem k="Runtime" v={event.duration} />
              <MetaItem k="Language" v={event.language} />
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

function DateVenue({ event }: { event: EventDetail }) {
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
              <div className="mt-3 text-sm text-forest-deep/70 flex items-center gap-2">
                <Clock className="h-4 w-4 text-saffron" /> {event.doors} · {event.duration}
              </div>
              <div className="mt-1 text-sm text-forest-deep/70">{event.language}</div>
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
              <h3 className="heading-lg mt-2 text-cream">{event.venue}</h3>
              <p className="mt-3 text-sm text-cream/70">{event.address}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button asChild variant="saffron" size="sm">
                  <Link href={event.ticketUrl}><Ticket className="h-4 w-4" /> Tickets · from {event.ticketFrom}</Link>
                </Button>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(`${event.venue}, ${event.address}`)}`}
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

function ScheduleSection({ items }: { items: ScheduleItem[] }) {
  return (
    <Section tone="muted" id="schedule">
      <SectionHeader
        eyebrow="Schedule"
        title={<>Evening <span className="italic">unfolds</span></>}
        lede="From foyer music to the last bow — a Yakshagana night, condensed for a European stage."
      />
      <ol className="mt-12 md:mt-16 max-w-3xl">
        {items.map((s, i) => (
          <li key={s.time + s.label} className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-6 border-t border-forest-deep/10 first:border-t-0">
            <div className="font-mono text-lg md:text-xl tabular-nums text-saffron">{s.time}</div>
            <div className="font-serif text-lg md:text-xl text-forest-deep flex items-baseline gap-4">
              <span className="text-forest-deep/40 font-mono text-xs tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s.label}</span>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function ArtistsSection({ artists }: { artists: Artist[] }) {
  return (
    <Section tone="cream" id="artists">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <SectionHeader
          eyebrow="On stage"
          title={<>The <span className="italic">ensemble</span></>}
          lede="Every artist on this bill is a member of Yakshamitraru Germany e.V."
        />
        <div className="eyebrow text-forest-deep/60 flex items-center gap-2">
          <Users className="h-4 w-4 text-saffron" />
          <span className="font-mono tabular-nums">{artists.length}</span>
          <span>artists</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {artists.map((a) => (
          <BrandCard key={a.name} variant="outline" interactive className="p-6 md:p-7 flex items-center gap-4">
            <div
              aria-hidden
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-forest-deep font-serif text-cream text-lg"
            >
              {a.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0">
              <div className="font-serif text-lg text-forest-deep truncate">{a.name}</div>
              <div className="text-xs eyebrow text-forest-deep/60 mt-1">{a.role}</div>
            </div>
          </BrandCard>
        ))}
      </div>
    </Section>
  );
}

function GallerySection({ images }: { images: { src: string; caption: string }[] }) {
  return (
    <Section tone="forest" id="gallery">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <div className="max-w-2xl">
          <div className="eyebrow text-saffron flex items-center gap-3">
            <span className="hairline bg-saffron" />
            <span>Gallery</span>
          </div>
          <h2 className="display-2 mt-5 text-cream">
            From <span className="italic text-saffron">rehearsal</span> to stage.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {images.map((img, i) => (
          <figure
            key={img.src + i}
            className={`media-zoom relative overflow-hidden rounded-2xl ring-1 ring-cream/10 ${
              i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto md:h-full" : "aspect-[4/5]"
            }`}
          >
            <Image src={img.src} alt={img.caption} fill className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-forest-deep/85 to-transparent text-xs md:text-sm text-cream/90 font-serif italic">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function FAQSection({ faq }: { faq: Faq[] }) {
  return (
    <Section tone="cream" id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1.4fr] gap-12 lg:gap-20 items-start">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Before you <span className="italic">arrive</span></>}
          lede="Quick answers to what most audiences ask. Anything else — we're an email away."
        />
        <FAQAccordion items={faq} variant="numbered" />
      </div>
    </Section>
  );
}

function RelatedSection({ related }: { related: RelatedRef[] }) {
  return (
    <Section tone="muted" id="related">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Also this season"
          title={<>More <span className="italic">nights</span></>}
          lede="If this one is sold out — or you're travelling — here's where else the ensemble is playing."
        />
        <Button asChild variant="forest" size="pill" className="self-start md:self-end">
          <Link href="/events">Full calendar</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {related.map((r) => (
          <EventCard
            key={r.slug}
            title={r.title}
            date={r.date}
            city={r.city}
            venue={r.venue}
            image={r.image}
            status="upcoming"
            href={`/events/${r.slug}`}
          />
        ))}
      </div>
    </Section>
  );
}
