import { BrandCard } from "./BrandCard";
import Image from "next/image";

export interface ArtistCardProps {
  name: string;
  role: string;
  image?: string;
  location?: string;
}

export function ArtistCard({ name, role, image }: ArtistCardProps) {
  return (
    <BrandCard variant="forest" interactive className="group flex flex-col items-center text-center p-6 sm:p-8 h-full">
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden mb-5 ring-1 ring-cream/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 group-hover:ring-saffron/40 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center bg-cream/10 font-serif text-3xl text-cream/40">
            {name.charAt(0)}
          </div>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)]" />
      </div>
      <div className="mt-auto w-full">
        <h3 className="heading-lg text-cream group-hover:text-saffron transition-colors duration-300 leading-tight mb-2">{name}</h3>
        <p className="text-sm sm:text-[15px] text-cream/70 italic">{role}</p>
      </div>
    </BrandCard>
  );
}