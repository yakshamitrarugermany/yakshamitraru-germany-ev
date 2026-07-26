"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/site/PageContainer";
import { Section, SectionHeader } from "@/components/site/Section";
import { ArtistCard } from "@/components/site/ArtistCard";
import { BrandInput } from "@/components/site/FormField";
import { PageHero } from "@/components/site/PageHero";
import { Stat } from "@/components/site/Stat";
import { FilterSelect } from "@/components/site/FilterSelect";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpRight, MapPin } from "lucide-react";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import aboutAsset from "@/assets/about.jpg.asset.json";

type Discipline =
  | "Vesha"
  | "Bhagavata"
  | "Chende"
  | "Maddale"
  | "Stree Vesha"
  | "Himmela";

type Artist = {
  name: string;
  role: string;
  discipline: Discipline;
  city: string;
  image: string;
  since: number;
};

const ARTISTS: Artist[] = [
  { name: "Ranganatha Bhat", role: "Pundu Vesha · Lead", discipline: "Vesha", city: "Berlin", image: perf1.url, since: 2018 },
  { name: "Shrikanth Hegde", role: "Bhagavata · Vocalist", discipline: "Bhagavata", city: "München", image: perf2.url, since: 2016 },
  { name: "Vasudev Acharya", role: "Chende · Percussion", discipline: "Chende", city: "Frankfurt", image: perf3.url, since: 2019 },
  { name: "Krishna Prasad", role: "Maddale · Percussion", discipline: "Maddale", city: "Hamburg", image: aboutAsset.url, since: 2020 },
  { name: "Anantha Padmanabha", role: "Kirīṭa Vesha", discipline: "Vesha", city: "Köln", image: perf2.url, since: 2015 },
  { name: "Meera Kamath", role: "Stree Vesha · Lead", discipline: "Stree Vesha", city: "Berlin", image: perf3.url, since: 2021 },
  { name: "Ganesh Rao", role: "Rakshasa Vesha", discipline: "Vesha", city: "Stuttgart", image: perf1.url, since: 2017 },
  { name: "Lakshmi Bhat", role: "Himmela · Ensemble", discipline: "Himmela", city: "Zürich", image: aboutAsset.url, since: 2022 },
  { name: "Sudhir Kulkarni", role: "Bhagavata · Vocalist", discipline: "Bhagavata", city: "Wien", image: perf2.url, since: 2018 },
  { name: "Narayana Shetty", role: "Chende · Percussion", discipline: "Chende", city: "Amsterdam", image: perf3.url, since: 2020 },
  { name: "Rohit Pai", role: "Maddale · Percussion", discipline: "Maddale", city: "Berlin", image: perf1.url, since: 2023 },
  { name: "Deepa Nayak", role: "Stree Vesha", discipline: "Stree Vesha", city: "München", image: aboutAsset.url, since: 2022 },
];

const DISCIPLINES = [
  "All disciplines",
  "Vesha",
  "Stree Vesha",
  "Bhagavata",
  "Chende",
  "Maddale",
  "Himmela",
] as const;

const CITIES = [
  "All cities",
  "Berlin",
  "München",
  "Hamburg",
  "Frankfurt",
  "Köln",
  "Stuttgart",
  "Zürich",
  "Wien",
  "Amsterdam",
] as const;

export default function ArtistsClient() {
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState<(typeof DISCIPLINES)[number]>("All disciplines");
  const [city, setCity] = useState<(typeof CITIES)[number]>("All cities");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTISTS.filter((a) => {
      if (discipline !== "All disciplines" && a.discipline !== discipline) return false;
      if (city !== "All cities" && a.city !== city) return false;
      if (!q) return true;
      return [a.name, a.role, a.city, a.discipline].some((f) => f.toLowerCase().includes(q));
    });
  }, [query, discipline, city]);

  const spotlight = ARTISTS[0];
  const gridArtists = filtered;

  return (
    <PageContainer>
      {/* Hero */}
      <PageHero
        padY="tall"
        eyebrow="The Ensemble"
        title={<>The artists of <em className="italic font-light">Yakshamitraru Germany</em>.</>}
        lede="A registered ensemble of vesha performers, bhagavatas and himmela musicians — trained in the Tenkutittu and Badagutittu traditions, based across Germany and touring Europe."
        meta={
          <>
            <Stat n={ARTISTS.length} label="Ensemble members" />
            <Stat n={new Set(ARTISTS.map((a) => a.city)).size} label="European cities" />
            <Stat n={6} label="Disciplines" />
          </>
        }
      />

      {/* Search + Filters */}
      <div className="sticky top-16 md:top-20 z-40 bg-cream/90 backdrop-blur-xl border-b border-forest-deep/10">
        <div className="container-page py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-deep/50" />
            <BrandInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artists, roles, cities…"
              className="pl-7"
              aria-label="Search artists"
            />
          </div>
          <div className="flex gap-2 md:gap-3">
            <FilterSelect
              label="Discipline"
              value={discipline}
              onChange={(v) => setDiscipline(v as (typeof DISCIPLINES)[number])}
              options={DISCIPLINES as readonly string[]}
            />
            <FilterSelect
              label="City"
              value={city}
              onChange={(v) => setCity(v as (typeof CITIES)[number])}
              options={CITIES as readonly string[]}
            />
          </div>
        </div>
      </div>

      {/* Spotlight — only when no filters applied */}
      {!query && discipline === "All disciplines" && city === "All cities" && (
        <Section tone="cream">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="eyebrow text-crimson flex items-center gap-3">
                <span className="hairline bg-crimson/60 hairline-grow" />
                <span>Artist in focus</span>
              </div>
              <h2 className="mt-6 font-serif text-5xl md:text-6xl leading-[1.02] text-forest-deep text-balance">
                {spotlight.name.split(" ")[0]}{" "}
                <em className="italic font-light text-forest-deep/80">{spotlight.name.split(" ").slice(1).join(" ")}</em>
              </h2>
              <p className="mt-4 eyebrow text-forest-deep/60">{spotlight.role}</p>
              <p className="mt-8 text-lg text-forest-deep/80 leading-relaxed max-w-lg">
                A senior {spotlight.discipline.toLowerCase()} artist trained in the Tenkutittu tradition,
                based in {spotlight.city} since {spotlight.since}. Anchors the ensemble's European premieres
                and leads the annual workshop residency.
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <dt className="eyebrow text-forest-deep/50 text-[10px]">Discipline</dt>
                  <dd className="mt-2 font-serif text-xl text-forest-deep leading-tight">{spotlight.discipline}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-forest-deep/50 text-[10px]">Based in</dt>
                  <dd className="mt-2 font-serif text-xl text-forest-deep leading-tight flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-saffron shrink-0" />{spotlight.city}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-forest-deep/50 text-[10px]">Since</dt>
                  <dd className="mt-2 font-serif text-xl text-forest-deep leading-tight tabular-nums">{spotlight.since}</dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest-deep media-zoom">
                <Image src={spotlight.image} alt={spotlight.name} fill className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent" />
              </div>
              <div className="hidden md:block absolute -bottom-6 -left-6 rounded-2xl bg-cream shadow-2xl p-5 max-w-[220px]">
                <div className="eyebrow text-crimson text-[10px]">N° 01</div>
                <div className="mt-2 font-serif text-lg text-forest-deep leading-tight">Featured member of the ensemble.</div>
              </div>
              <div aria-hidden className="hidden md:block absolute -top-6 -right-6 h-24 w-24 rounded-full bg-saffron/20 blur-2xl" />
            </div>
          </div>
        </Section>
      )}

      {/* Grid */}
      <Section tone="cream">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
          <SectionHeader
            eyebrow={`${filtered.length} ${filtered.length === 1 ? "artist" : "artists"}`}
            title={
              <>
                Meet the <em className="italic font-light">Yakshamitraru</em> ensemble.
              </>
            }
          />
          {(query || discipline !== "All disciplines" || city !== "All cities") && (
            <button
              onClick={() => {
                setQuery("");
                setDiscipline("All disciplines");
                setCity("All cities");
              }}
              className="text-sm text-ink-soft hover:text-forest-deep underline underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl text-forest-deep">No artists match your filters.</p>
            <p className="mt-3 text-ink-soft">Try broadening the search or resetting filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {gridArtists.map((a) => (
              <ArtistCard
                key={a.name}
                name={a.name}
                role={a.role}
                image={a.image}
                location={`${a.city} · since ${a.since}`}
              />
            ))}
          </div>
        )}
      </Section>

      {/* Join Us CTA */}
      <Section tone="forest">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <div className="eyebrow text-saffron flex items-center gap-3">
              <span className="hairline bg-saffron/60" />
              <span>Join the Ensemble</span>
            </div>
            <h2 className="display-2 mt-6 text-cream">
              Are you a <em className="italic font-light">Yakshagana</em> artist in Europe?
            </h2>
            <p className="lede mt-6 text-cream/80 max-w-xl">
              We welcome vesha performers, bhagavatas, chende and maddale
              musicians based in Germany and neighbouring countries. Auditions
              are held twice a year in Berlin and München.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Button asChild variant="saffron" size="xl">
              <a href="mailto:ensemble@yakshamitraru.de?subject=Ensemble%20enquiry">
                Apply to join
              </a>
            </Button>
            <Button asChild variant="outline-cream" size="xl">
              <Link href="/contact#booking">Collaborate with us</Link>
            </Button>
            <p className="text-sm text-cream/60 md:text-right max-w-xs">
              Only artists belonging to Yakshamitraru Germany e.V. are listed on
              this site.
            </p>
          </div>
        </div>
      </Section>

    </PageContainer>
  );
}
