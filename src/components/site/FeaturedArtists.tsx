import { Section, SectionHeader } from "./Section";
import Link from "next/link";
import { ArtistCard } from "./ArtistCard";
import { Button } from "@/components/ui/button";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import about from "@/assets/about.jpg.asset.json";
import hero from "@/assets/hero.jpg.asset.json";

const ARTISTS = [
  { name: "Raghavendra B.", role: "Bhagavatha", image: hero.url },
  { name: "Shrinivas B.", role: "Maddale", image: perf1.url },
  { name: "Sunil Bhandary", role: "Chende", image: perf2.url },
  { name: "Pavan Kumar", role: "Himmela", image: perf3.url },
  { name: "Deepak Rai", role: "Chende", image: about.url },
];

export function FeaturedArtists() {
  return (
    <Section tone="cream" id="artists" className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
        <SectionHeader
          eyebrow="The Ensemble"
          title={
            <>
              Our <span className="italic">Artists.</span>
            </>
          }
          lede="Meet the dedicated artists carrying the Yakshagana tradition to European audiences."
        />
        <Button asChild variant="forest" size="pill" className="self-start md:self-end">
          <Link href="/artists">View All Artists</Link>
        </Button>
      </div>

      {/* Horizontal scroll */}
      <div className="relative -mx-6 md:mx-0">
        <div className="flex gap-4 md:gap-6 px-6 md:px-0 pb-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {ARTISTS.map((a) => (
            <div key={a.name} className="shrink-0 w-[65%] sm:w-[40%] md:w-[30%] lg:w-[18%] snap-start">
              <ArtistCard {...a} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}