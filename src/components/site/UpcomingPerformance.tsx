import perf1 from "@/assets/perf1.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./Section";

export function UpcomingPerformance() {
  return (
    <section className="relative bg-cream section-sm">
      {/* Subtle gold accent — clipped in its own layer so the
          floating date badge on the hero image is never cut off. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 h-130 w-130 gold-radial opacity-40" />
      </div>
      <div className="relative container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-14">
          <SectionHeader
            eyebrow="Next Performance"
            title={
              <>
                Witness <span className="italic">Yakshagana</span> Live
              </>
            }
            lede="Join us for an unforgettable evening of traditional dance-theatre under the European sky."
          />
          <Button
            asChild
            variant="forest"
            size="pill"
            className="self-start md:self-end shrink-0"
          >
            <Link href="/events">View Upcoming Events</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Large image with floating badges */}
          <div className="lg:col-span-8 relative group">
            <div className="media-zoom relative w-full aspect-4/3 md:aspect-16/10 rounded-3xl overflow-hidden shadow-card">
              <Image
                src={perf1.url}
                alt="Devi Mahatme — opening night"
                fill
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 caption-gradient opacity-40"
              />
            </div>

            {/* Floating date badge */}
            <div className="absolute -top-4 -left-2 md:-top-6 md:-left-8 bg-cream border border-border rounded-xl md:rounded-2xl shadow-xl px-3 py-2 md:px-6 md:py-5 text-center z-10">
              {/* Desktop version */}
              <div className="hidden md:block eyebrow text-crimson text-[10px]">
                Sep
              </div>
              <div className="hidden md:block font-serif text-5xl md:text-6xl leading-none text-forest-deep mt-1">
                12
              </div>
              <div className="hidden md:block mt-2 eyebrow text-ink-soft/80 text-[9px]">
                Saturday · 2026
              </div>

              {/* Mobile version */}
              <div className="md:hidden flex flex-col items-center justify-center font-sans text-forest-deep leading-tight">
                <div className="text-[10px] font-medium uppercase tracking-widest text-crimson">
                  Sat
                </div>
                <div className="text-[13px] font-bold tracking-wide mt-0.5 whitespace-nowrap">
                  12 Sep 2026
                </div>
                <div className="text-[10px] font-medium tracking-wide text-ink-soft/90 mt-0.5 whitespace-nowrap">
                  19:30 CET
                </div>
              </div>
            </div>

            {/* Floating location chip */}
            <div className="absolute top-3 right-3 md:top-auto md:bottom-4 md:left-4 md:right-auto flex items-center gap-1.5 md:gap-3 bg-cream/95 md:bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 md:pl-2 md:pr-5 md:py-2 text-forest-deep md:text-cream z-10 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.15)] md:shadow-xl border border-border md:border-transparent">
              <MapPin className="h-3.5 w-3.5 text-crimson md:hidden" />
              <span className="hidden md:inline-flex items-center justify-center h-8 w-8 shrink-0 rounded-full bg-saffron text-forest-deep">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wide md:normal-case md:font-normal md:tracking-normal md:text-sm truncate md:whitespace-normal">
                <span className="md:hidden">Berlin</span>
                <span className="hidden md:inline">
                  Haus der Kulturen der Welt · Berlin
                </span>
              </span>
            </div>
          </div>

          {/* Editorial detail column */}
          <div className="lg:col-span-4 mt-0">
            <h2 className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-forest-deep">
              Devi Mahatme
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              A full-length prasanga staged for European audiences — crown, drum
              and song, from dusk into the night.
            </p>
            <dl className="mt-8 space-y-3 text-sm border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-forest" />
                <dd>19:30 · Doors 18:45</dd>
              </div>
              <div className="flex items-center gap-3">
                <Ticket className="h-4 w-4 text-forest" />
                <dd>From €24 · Concession available</dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="saffron"
                size="pill"
                className="shadow-[0_18px_50px_-15px_color-mix(in_oklab,var(--saffron)_85%,transparent)] hover:-translate-y-0.5 transition-transform"
              >
                <Link href="/events">Reserve seats →</Link>
              </Button>
              <Button asChild variant="outline-ink" size="pill">
                <Link href="/contact#booking">Host in your city</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
