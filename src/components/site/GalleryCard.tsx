import { cn } from "@/lib/utils";
import Image from "next/image";

export interface GalleryCardProps {
  image: string;
  caption?: string;
  aspect?: "portrait" | "landscape" | "square";
  className?: string;
}

const aspectClass = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function GalleryCard({ image, caption, aspect = "portrait", className }: GalleryCardProps) {
  return (
    <figure
      className={cn(
        "group relative rounded-2xl overflow-hidden media-zoom hover-lift ring-1 ring-inset ring-forest-deep/5",
        aspectClass[aspect],
        className,
      )}
    >
      <Image src={image} alt={caption ?? ""} fill className="object-cover" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 caption-gradient opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 p-5 text-cream translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="eyebrow text-saffron/90 text-[10px] mb-2">Fragment</div>
          <div className="font-serif text-base md:text-lg leading-snug">{caption}</div>
        </figcaption>
      )}
    </figure>
  );
}