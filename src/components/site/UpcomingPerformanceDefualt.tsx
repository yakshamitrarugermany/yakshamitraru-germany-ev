import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionHeader } from "./Section";

export function UpcomingPerformanceDefault() {
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
            lede="Next performance couldbe in your city! Contact us for an unforgettable evening of traditional dance-theatre under the European sky."
          />
          <Button
            asChild
            variant="forest"
            size="pill"
            className="self-start md:self-end shrink-0"
          >
            <Link href="/events">Host in your city</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
