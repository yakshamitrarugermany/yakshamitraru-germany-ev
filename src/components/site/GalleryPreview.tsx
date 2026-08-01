import hero from "@/assets/hero.jpg.asset.json";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "./Section";

export function GalleryPreview() {
  return (
    <Section tone="cream" id="gallery">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8 md:mb-14">
        <SectionHeader
          eyebrow="Gallery Highlights"
          title={
            <>
              Fragments from
              <br />
              <span className="italic">the night.</span>
            </>
          }
          lede="Step into the vibrant world of Yakshagana — from intricate backstage preparations to the final curtain call."
        />
        <Button
          asChild
          variant="forest"
          size="pill"
          className="self-start md:self-end"
        >
          <Link href="/gallery">View Gallery</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-6">
        {[
          { image: hero.url, alt: "Yakshagana performer in full crown and costume", character: "Kamsa", artist: "Prashanth", year: "2023" },
          { image: perf1.url, alt: "Yakshagana ensemble on stage", character: "Devi Mahatme", artist: "Ensemble", year: "2024" },
          { image: perf2.url, alt: "Bhagavata and percussionists mid-performance", character: "Himmela", artist: "Musicians", year: "2024" },
          { image: perf3.url, alt: "Veshadari in dramatic stage light", character: "Rakshasa", artist: "Suhas", year: "2025" },
        ].map((item, i) => (
          <div
            key={i}
            className="relative aspect-4/3 rounded-xl md:rounded-2xl overflow-hidden shadow-sm md:shadow-md group"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle dark gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Information overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 flex flex-col justify-end text-cream translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
              <span className="font-serif text-sm md:text-lg leading-tight">{item.character}</span>
              <span className="text-[9px] md:text-[11px] text-cream/70 uppercase tracking-widest mt-1 font-medium">
                {item.artist} · {item.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
