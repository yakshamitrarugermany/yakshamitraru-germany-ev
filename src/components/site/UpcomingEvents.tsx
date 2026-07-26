import { Section, SectionHeader } from "./Section";
import Link from "next/link";
import { EventCard } from "./EventCard";
import { Button } from "@/components/ui/button";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";

const EVENTS = [
  {
    title: "Devi Mahatme — Premiere",
    date: "Sat, 12 Sep 2026 · 19:30",
    city: "Berlin",
    venue: "Haus der Kulturen der Welt",
    image: perf1.url,
  },
  {
    title: "Ornament & Origin",
    date: "Fri, 03 Oct 2026 · 20:00",
    city: "Zürich",
    venue: "Kunsthaus Zürich",
    image: perf2.url,
  },
  {
    title: "Himmela — Concert set",
    date: "Sun, 26 Oct 2026 · 18:00",
    city: "Amsterdam",
    venue: "Muziekgebouw",
    image: perf3.url,
  },
];

export function UpcomingEvents() {
  return (
    <Section tone="muted" id="events">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
        <SectionHeader
          eyebrow="Upcoming Events"
          title={
            <>
              Season 2026 across
              <br />
              <span className="italic">European stages.</span>
            </>
          }
          lede="Programmed with theatres, museums and festival partners. Tickets and access details announced with each host."
        />
        <Button asChild variant="forest" size="pill" className="self-start md:self-end">
          <Link href="/events">Full calendar</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {EVENTS.map((e) => (
          <EventCard key={e.title} {...e} />
        ))}
      </div>
    </Section>
  );
}