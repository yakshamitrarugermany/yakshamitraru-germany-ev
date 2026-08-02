"use client";
import aboutAsset from "@/assets/about.jpg.asset.json";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import { Chip } from "@/components/site/Chip";

import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Stat } from "@/components/site/Stat";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play, Search, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type Category = "Stage" | "Backstage" | "Rehearsal" | "Portrait" | "On tour";
type Ratio = "portrait" | "landscape" | "square" | "tall";

type Media = {
  id: string;
  type: "photo" | "video";
  src: string;
  poster?: string;
  caption: string;
  location: string;
  year: number;
  category: Category;
  ratio: Ratio;
};

const MEDIA: Media[] = [
  {
    id: "m1",
    type: "photo",
    src: perf1.url,
    caption: "Devi Mahatme — Berlin premiere",
    location: "Berlin",
    year: 2026,
    category: "Stage",
    ratio: "portrait",
  },
  {
    id: "m2",
    type: "video",
    src: perf2.url,
    poster: perf2.url,
    caption: "Ornament & Origin — trailer",
    location: "Zürich",
    year: 2026,
    category: "Stage",
    ratio: "landscape",
  },
  {
    id: "m3",
    type: "photo",
    src: perf3.url,
    caption: "Chende & Maddale study",
    location: "Frankfurt",
    year: 2025,
    category: "Rehearsal",
    ratio: "tall",
  },
  {
    id: "m4",
    type: "photo",
    src: aboutAsset.url,
    caption: "Backstage · vesha preparation",
    location: "München",
    year: 2025,
    category: "Backstage",
    ratio: "landscape",
  },
  {
    id: "m5",
    type: "photo",
    src: heroAsset.url,
    caption: "Himmela ensemble — opening",
    location: "Hamburg",
    year: 2025,
    category: "Stage",
    ratio: "portrait",
  },
  {
    id: "m6",
    type: "video",
    src: perf1.url,
    poster: perf1.url,
    caption: "Rehearsal room — Sudhanva Vijaya",
    location: "Berlin",
    year: 2025,
    category: "Rehearsal",
    ratio: "square",
  },
  {
    id: "m7",
    type: "photo",
    src: perf2.url,
    caption: "Portrait — Meera Kamath as Stree Vesha",
    location: "Berlin",
    year: 2026,
    category: "Portrait",
    ratio: "portrait",
  },
  {
    id: "m8",
    type: "photo",
    src: perf3.url,
    caption: "Karna Parva — final tableau",
    location: "Frankfurt",
    year: 2025,
    category: "Stage",
    ratio: "landscape",
  },
  {
    id: "m9",
    type: "photo",
    src: aboutAsset.url,
    caption: "On tour — Amsterdam load-in",
    location: "Amsterdam",
    year: 2025,
    category: "On tour",
    ratio: "square",
  },
  {
    id: "m10",
    type: "photo",
    src: heroAsset.url,
    caption: "Backstage · kirīṭa fitting",
    location: "Köln",
    year: 2025,
    category: "Backstage",
    ratio: "tall",
  },
  {
    id: "m11",
    type: "video",
    src: perf3.url,
    poster: perf3.url,
    caption: "Chende — solo passage",
    location: "Stuttgart",
    year: 2026,
    category: "Rehearsal",
    ratio: "portrait",
  },
  {
    id: "m12",
    type: "photo",
    src: perf1.url,
    caption: "Portrait — Ranganatha Bhat",
    location: "Berlin",
    year: 2026,
    category: "Portrait",
    ratio: "landscape",
  },
  {
    id: "m13",
    type: "photo",
    src: perf2.url,
    caption: "Bhasmasura Mohini — Köln",
    location: "Köln",
    year: 2025,
    category: "Stage",
    ratio: "tall",
  },
  {
    id: "m14",
    type: "photo",
    src: aboutAsset.url,
    caption: "On tour — Brussels, dawn",
    location: "Brussels",
    year: 2025,
    category: "On tour",
    ratio: "landscape",
  },
  {
    id: "m15",
    type: "photo",
    src: heroAsset.url,
    caption: "Ritual to Stage — workshop",
    location: "Stuttgart",
    year: 2026,
    category: "Rehearsal",
    ratio: "square",
  },
  {
    id: "m16",
    type: "photo",
    src: perf1.url,
    caption: "Backstage · quiet minute",
    location: "Wien",
    year: 2026,
    category: "Backstage",
    ratio: "portrait",
  },
];

const CATEGORIES = [
  "All",
  "Stage",
  "Backstage",
  "Rehearsal",
  "Portrait",
  "On tour",
] as const;
const TYPES = ["All media", "Photos", "Videos"] as const;

const ratioClass: Record<Ratio, string> = {
  portrait: "aspect-3/4",
  landscape: "aspect-4/3",
  square: "aspect-square",
  tall: "aspect-3/5",
};

import heroAsset from "@/assets/hero.jpg.asset.json";

export default function GalleryClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [mediaType, setMediaType] =
    useState<(typeof TYPES)[number]>("All media");
  const [active, setActive] = useState<Media | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEDIA.filter((m) => {
      if (category !== "All" && m.category !== category) return false;
      if (mediaType === "Photos" && m.type !== "photo") return false;
      if (mediaType === "Videos" && m.type !== "video") return false;
      if (!q) return true;
      return [m.caption, m.location, m.category].some((f) =>
        f.toLowerCase().includes(q),
      );
    });
  }, [query, category, mediaType]);

  const close = useCallback(() => setActive(null), []);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <>
      {/* Hero */}
      <PageHero
        radial="gallery"
        eyebrow="Gallery"
        title={<em className="italic font-light">Stage, studio, street.</em>}
        lede="Photographs and short films from Yakshamitraru Germany's performances, rehearsals and touring life across Europe."
        meta={
          <>
            <Stat
              n={MEDIA.filter((m) => m.type === "photo").length}
              label="Photographs"
            />
            <Stat
              n={MEDIA.filter((m) => m.type === "video").length}
              label="Films"
            />
            <Stat
              n={new Set(MEDIA.map((m) => m.location)).size}
              label="Cities captured"
            />
          </>
        }
      />

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-40 bg-cream/85 backdrop-blur-xl border-b border-border/60">
        <div className="container-page py-4 md:py-5 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search captions, locations…"
                aria-label="Search gallery"
                className="w-full bg-transparent border-0 border-b border-ink/20 pl-6 pr-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-forest-deep transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {TYPES.map((t) => (
                <Chip
                  key={t}
                  active={mediaType === t}
                  onClick={() => setMediaType(t)}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto -mx-1 px-1">
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <Section tone="cream">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-8 md:mb-10">
          <p className="eyebrow text-ink-soft">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>
          {(query || category !== "All" || mediaType !== "All media") && (
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
                setMediaType("All media");
              }}
              className="text-sm text-ink-soft hover:text-forest-deep underline underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl text-forest-deep">
              Nothing matches yet.
            </p>
            <p className="mt-3 text-ink-soft">
              Try broadening the search or resetting filters.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 [column-fill:balance]">
            {filtered.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActive(m)}
                className="group relative mb-4 md:mb-6 block w-full break-inside-avoid rounded-2xl overflow-hidden media-zoom hover-lift text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                style={{ animationDelay: `${(i % 8) * 40}ms` }}
              >
                <motion.div
                  layoutId={`gallery-${m.id}`}
                  className={`relative ${ratioClass[m.ratio]}`}
                >
                  <Image
                    src={m.poster ?? m.src}
                    alt={m.caption}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Type badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-forest-deep/70 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase text-cream">
                  {m.type === "video" ? (
                    <Play className="h-3 w-3 fill-cream" />
                  ) : null}
                  {m.type}
                </div>

                {/* Center play button for videos */}
                {m.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-14 w-14 rounded-full bg-cream/90 backdrop-blur-md grid place-items-center transform transition-transform duration-500 group-hover:scale-110 shadow-2xl">
                      <Play className="h-5 w-5 fill-forest-deep text-forest-deep translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Elegant hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-forest-deep/95 via-forest-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <figcaption className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-cream">
                  <div className="eyebrow text-saffron">{m.category}</div>
                  <div className="font-serif text-xl leading-tight mt-2">
                    {m.caption}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-cream/75">
                    <span>
                      {m.location} · {m.year}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </figcaption>
              </button>
            ))}
          </div>
        )}
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 bg-forest-deep/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 md:top-8 md:right-8 h-11 w-11 rounded-full grid place-items-center text-cream border border-cream/20 hover:bg-cream/10 transition-colors z-50"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              layoutId={`gallery-${active.id}`}
              className="max-w-6xl w-full max-h-full flex flex-col items-center gap-5 relative z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex-1 min-h-0 flex items-center justify-center">
                {active.type === "video" ? (
                  <video
                    src={active.src}
                    poster={active.poster}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[75vh] w-auto max-w-full rounded-xl shadow-2xl"
                  />
                ) : (
                  <Image
                    src={active.src}
                    alt={active.caption}
                    width={1920}
                    height={1080}
                    className="max-h-[75vh] w-auto max-w-full rounded-xl shadow-2xl object-contain"
                  />
                )}
              </div>
              <motion.figcaption
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-cream max-w-2xl"
              >
                <div className="eyebrow text-saffron">{active.category}</div>
                <div className="font-serif text-2xl md:text-3xl mt-2">
                  {active.caption}
                </div>
                <div className="mt-2 text-sm text-cream/70">
                  {active.location} · {active.year}
                </div>
              </motion.figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
