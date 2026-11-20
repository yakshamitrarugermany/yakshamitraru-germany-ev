"use client";
import { ArtistCard } from "@/components/site/ArtistCard";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ARTISTS } from "@/data/artists";
import Image from "next/image";
import Link from "next/link";

export default function ArtistsClient() {
  const spotlight = ARTISTS[0];

  return (
    <>
      {/* Hero */}
      <PageHero
        padY="tall"
        eyebrow="The Ensemble"
        title={
          <>
            The artists of{" "}
            <em className="italic font-light">Yakshamitraru Germany</em>.
          </>
        }
        lede="A registered ensemble of vesha performers, bhagavatas and himmela musicians — trained in the Tenkutittu and Badagutittu traditions, based across Germany and touring Europe."
      />

      {/* Spotlight */}
      {spotlight && (
        <Section tone="cream">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="eyebrow text-crimson flex items-center gap-3">
                <span className="hairline bg-crimson/60 hairline-grow" />
                <span>Artist in focus</span>
              </div>
              <h2 className="mt-6 font-serif text-5xl md:text-6xl leading-[1.02] text-forest-deep text-balance">
                {spotlight.name.split(" ")[0]}{" "}
                <em className="italic font-light text-forest-deep/80">
                  {spotlight.name.split(" ").slice(1).join(" ")}
                </em>
              </h2>
              <p className="mt-4 eyebrow text-forest-deep/60">
                {spotlight.role}
              </p>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-forest-deep media-zoom">
                <Image
                  src={spotlight.image}
                  alt={spotlight.name}
                  fill
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-forest-deep/40 via-transparent to-transparent"
                />
              </div>
              <div className="hidden md:block absolute -bottom-6 -left-6 rounded-2xl bg-cream shadow-2xl p-5 max-w-55">
                <div className="eyebrow text-crimson text-[10px]">N° 01</div>
                <div className="mt-2 font-serif text-lg text-forest-deep leading-tight">
                  Featured member of the ensemble.
                </div>
              </div>
              <div
                aria-hidden
                className="hidden md:block absolute -top-6 -right-6 h-24 w-24 rounded-full bg-saffron/20 blur-2xl"
              />
            </div>
          </div>
        </Section>
      )}

      {/* Grid */}
      <Section tone="cream">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
          <SectionHeader
            eyebrow="The Team"
            title={
              <>
                Meet the <em className="italic font-light">Yakshamitraru</em>{" "}
                ensemble.
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {ARTISTS.map((a) => (
            <ArtistCard
              key={a.name}
              name={a.name}
              role={a.role}
              image={a.image}
            />
          ))}
        </div>
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
              Are you a <em className="italic font-light">Yakshagana</em> artist
              in Europe?
            </h2>
            <p className="lede mt-6 text-cream/80 max-w-xl">
              We welcome vesha performers, bhagavatas, chande and maddale
              musicians based in Germany and neighbouring countries.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Button asChild variant="saffron" size="xl">
              <a href="mailto:yakshamitrarugermany@gmail.com?subject=Ensemble%20enquiry">
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
    </>
  );
}
