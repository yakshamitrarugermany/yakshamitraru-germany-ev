import Link from "next/link";
import Image from "next/image";
import perf1 from "@/assets/perf1.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";

export function UpcomingPerformance() {
  return (
    <section className="relative bg-cream section-sm">
      {/* Subtle gold accent — clipped in its own layer so the
          floating date badge on the hero image is never cut off. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] gold-radial opacity-40" />
      </div>
      <div className="relative container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large image with floating badges */}
          <div className="lg:col-span-8 relative group">
            <div className="media-zoom relative aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_50px_120px_-40px_color-mix(in_oklab,var(--forest-deep)_55%,transparent)]">
              <Image
                src={perf1.url}
                alt="Devi Mahatme — opening night"
                fill
                className="object-cover"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 caption-gradient opacity-40" />
            </div>

            {/* Floating date badge */}
            <div className="absolute -top-6 left-2 md:-left-8 bg-cream border border-border rounded-2xl shadow-[0_25px_60px_-25px_color-mix(in_oklab,var(--forest-deep)_50%,transparent)] px-5 py-4 md:px-6 md:py-5 text-center">
              <div className="eyebrow text-crimson text-[10px]">Sep</div>
              <div className="font-serif text-5xl md:text-6xl leading-none text-forest-deep mt-1">12</div>
              <div className="mt-2 eyebrow text-ink-soft/80 text-[9px]">Saturday · 2026</div>
            </div>

            {/* Floating location chip */}
            <div className="absolute bottom-4 left-4 right-4 md:right-auto flex items-center gap-3 glass-dark rounded-full pl-2 pr-5 py-2 text-cream md:max-w-fit">
              <span className="inline-flex items-center justify-center h-8 w-8 shrink-0 rounded-full bg-saffron text-forest-deep">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="text-xs sm:text-sm truncate md:whitespace-normal">Haus der Kulturen der Welt · Berlin</span>
            </div>

            {/* Next-performance pulse pill */}
            <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-saffron px-3 sm:px-4 py-1.5 text-[10px] font-medium text-forest-deep uppercase tracking-[0.28em] shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-deep soft-pulse" />
              Next performance
            </div>
          </div>

          {/* Editorial detail column */}
          <div className="lg:col-span-4">
            <div className="eyebrow text-crimson flex items-center gap-3">
              <span className="hairline bg-crimson" />
              <span>Premiere · Season 2026</span>
            </div>
            <h2 className="mt-5 font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-[1] text-forest-deep">
              Devi Mahatme
              <br />
              <span className="italic text-forest">under the Berlin sky.</span>
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              A full-length prasanga staged for European audiences —
              crown, drum and song, from dusk into the night.
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
              <Button asChild variant="saffron" size="pill" className="shadow-[0_18px_50px_-15px_color-mix(in_oklab,var(--saffron)_85%,transparent)] hover:-translate-y-0.5 transition-transform">
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