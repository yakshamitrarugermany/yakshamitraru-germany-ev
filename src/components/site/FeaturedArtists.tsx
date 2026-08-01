import about from "@/assets/about.jpg.asset.json";
import hero from "@/assets/hero.jpg.asset.json";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArtistCard } from "./ArtistCard";
import { Section, SectionHeader } from "./Section";

const ARTISTS = [
  { name: "Apurva Beleyur", role: "Mummela", image: hero.url },
  { name: "Shashidhar Nairy", role: "Mummela", image: perf1.url },
  { name: "Sushma Ravindra", role: "Mummela", image: perf2.url },
  { name: "Shreehari Hosamane", role: "Mummela", image: perf3.url },
  { name: "Prateek Hegde Bengle", role: "Mummela", image: about.url },
];

export function FeaturedArtists() {
  return (
    <Section tone="cream" id="artists" className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8 md:mb-14">
        <SectionHeader
          eyebrow="The Ensemble"
          title={
            <>
              Meet the <span className="italic">Performers.</span>
            </>
          }
          lede="Meet the dedicated artists carrying the Yakshagana tradition to European audiences."
        />
        <Button
          asChild
          variant="forest"
          size="pill"
          className="self-start md:self-end"
        >
          <Link href="/artists">View All Artists</Link>
        </Button>
      </div>

      {/* Horizontal scroll */}
      <div className="relative -mx-6 md:mx-0">
        <div className="flex gap-4 md:gap-6 px-6 md:px-0 pb-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-pl-6 md:scroll-pl-0 after:content-[''] after:w-px after:shrink-0 md:after:hidden">
          {ARTISTS.map((a) => (
            <div
              key={a.name}
              className="shrink-0 w-[65%] sm:w-[40%] md:w-[30%] lg:w-[18%] snap-start"
            >
              <ArtistCard {...a} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
