import perf1 from "@/assets/perf1.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import { BrandCard } from "@/components/site/BrandCard";
import { PageContainer } from "@/components/site/PageContainer";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Crown, Music, Paintbrush, Theater } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tradition — Yakshamitraru Germany e.V.",
  description:
    "Discover the 400-year-old tradition of Yakshagana — the music, costumes, makeup, and storytelling of Karnataka's night theatre.",
};

const ELEMENTS = [
  {
    icon: Music,
    title: "The Music (Himmela)",
    body: "The backbone of Yakshagana. A lead singer (Bhagavata) controls the narrative flow, supported by the intricate rhythms of the chande and maddale drums.",
  },
  {
    icon: Paintbrush,
    title: "Makeup (Bannada Vesha)",
    body: "Elaborate facial makeup applied over hours. The colors and patterns signify the character's nature — from divine heroes to fierce demons.",
  },
  {
    icon: Crown,
    title: "Costumes",
    body: "Spectacular headdresses, intricate ornaments, and heavy, colorful garments that enlarge the performer's presence to god-like proportions.",
  },
  {
    icon: Theater,
    title: "Dance & Dialogue",
    body: "Extemporaneous dialogue (Mummela) delivered in pure Kannada, paired with vigorous, spinning dance sequences that bring ancient epics to life.",
  },
];

export default function TraditionPage() {
  return (
    <PageContainer>
      {/* 1. Hero */}
      <PageHero
        padY="tall"
        eyebrow="The Heritage"
        title={
          <>
            A 400-Year-Old <em className="italic font-light">Theatre</em>.
          </>
        }
        lede="Yakshagana is a traditional theatre form from coastal Karnataka, India, combining dance, music, spoken word, and spectacular costumes to tell stories from the Hindu epics."
      />

      {/* 2. Origins */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow text-forest flex items-center gap-3">
              <span className="hairline bg-forest hairline-grow" />
              <span>Origins</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] text-forest-deep text-balance">
              The Theatre of the{" "}
              <em className="italic font-light">Celestials</em>.
            </h2>
            <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
              Translating literally to &quot;The Song of the Demi-Gods&quot;
              (Yaksha - demi-god, Gana - song), this art form evolved from
              classical music and theatrical traditions over four centuries ago.
            </p>
            <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
              Traditionally performed in the open air from dusk until dawn after
              the winter harvest, Yakshagana served as both entertainment and
              moral education for rural communities, passing down the stories of
              the Ramayana, Mahabharata, and Puranas.
            </p>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm media-zoom shadow-[0_50px_120px_-40px_color-mix(in_oklab,var(--forest-deep)_60%,transparent)]">
              <Image
                src={perf1.url}
                alt="Yakshagana ensemble"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-forest-deep/10" />
            </div>
          </div>
        </div>
      </Section>

      {/* 3. The Elements */}
      <Section tone="forest" className="relative overflow-hidden">
        <SectionHeader
          eyebrow="The Elements"
          title={
            <>
              An intricate <em className="italic font-light">synthesis</em> of
              arts.
            </>
          }
          align="center"
          className="mx-auto text-cream [&_.eyebrow]:text-saffron [&_.hairline]:bg-saffron"
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 z-10 relative">
          {ELEMENTS.map((e) => (
            <BrandCard
              key={e.title}
              variant="forest"
              className="p-8 hover-lift"
            >
              <div className="grid place-items-center h-12 w-12 rounded-full bg-saffron/15 text-saffron">
                <e.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-cream leading-tight">
                {e.title}
              </h3>
              <p className="mt-3 text-cream/70 leading-relaxed">{e.body}</p>
            </BrandCard>
          ))}
        </div>
      </Section>

      {/* 4. Experience the art */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-sm media-zoom shadow-[0_50px_120px_-40px_color-mix(in_oklab,var(--forest-deep)_60%,transparent)]">
              <Image
                src={perf3.url}
                alt="Yakshagana dancer"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-forest-deep/10" />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="eyebrow text-forest flex items-center gap-3">
              <span className="hairline bg-forest hairline-grow" />
              <span>Experience</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] text-forest-deep text-balance">
              Witness the <em className="italic font-light">spectacle</em>.
            </h2>
            <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
              While we preserve the rigorous discipline of Yakshagana, our
              European performances are designed to be accessible to diverse
              audiences, often accompanied by translations and contextual
              explanations.
            </p>
            <div className="mt-10">
              <Button asChild variant="saffron" size="xl">
                <Link href="/events" className="inline-flex items-center gap-2">
                  View Upcoming Events
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
