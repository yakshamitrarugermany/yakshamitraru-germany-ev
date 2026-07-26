import { Section, SectionHeader } from "./Section";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg.asset.json";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";

export function GalleryPreview() {
  return (
    <Section tone="cream" id="gallery">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
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
        <Button asChild variant="forest" size="pill" className="self-start md:self-end">
          <Link href="/gallery">View Gallery</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-6">
        {[
          { image: hero.url, alt: "Gallery Highlight 1" },
          { image: perf1.url, alt: "Gallery Highlight 2" },
          { image: perf2.url, alt: "Gallery Highlight 3" },
          { image: perf3.url, alt: "Gallery Highlight 4" },
        ].map((item, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-sm md:shadow-md group">
            <Image src={item.image} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </Section>
  );
}