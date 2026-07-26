import { BrandCard } from "./BrandCard";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";

export interface EventCardProps {
  title: string;
  date: string;
  city: string;
  venue?: string;
  image?: string;
  status?: "upcoming" | "past";
  href?: string;
}

export function EventCard({ title, date, city, venue, image, status = "upcoming", href = "/contact#booking" }: EventCardProps) {
  return (
    <BrandCard variant="forest" interactive className="flex flex-col">
      {image && (
        <div className="media-zoom relative aspect-[16/10]">
          <Image src={image} alt={title} fill className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent" />
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-cream/10 backdrop-blur-md border border-cream/20 px-3 py-1 text-[10px] tracking-[0.28em] uppercase text-cream">
            {status === "upcoming" ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-saffron soft-pulse" />
                Upcoming
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-cream/40" />
                Past
              </>
            )}
          </div>
        </div>
      )}
      <div className="p-7 flex flex-col gap-5 flex-1">
        <h3 className="heading-lg text-cream">{title}</h3>
        <div className="mt-auto space-y-2 text-sm text-cream/75">
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-saffron" /> {date}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-saffron" /> {[venue, city].filter(Boolean).join(" \u00b7 ")}</div>
        </div>
        {status === "upcoming" && (
          <Button asChild variant="outline-cream" size="sm" className="self-start mt-2">
            <Link href={href}>Enquire</Link>
          </Button>
        )}
      </div>
    </BrandCard>
  );
}