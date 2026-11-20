import { Button } from "@/components/ui/button";
import { ARTISTS } from "@/data/artists";
import Link from "next/link";
import { ArtistCard } from "./ArtistCard";
import { Section, SectionHeader } from "./Section";

export function FeaturedArtists() {
  return (
    <Section tone="cream" id="artists" className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8 md:mb-14">
        <SectionHeader
          eyebrow="The Team"
          title={
            <>
              The<span className="italic"> faces </span>of YAKSHAMITRARU.
            </>
          }
          lede="The team that sparked Yakshagana wave in Europe."
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
