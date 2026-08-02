import { BrandCard } from "@/components/site/BrandCard";
import { OurJourneyTimeline } from "@/components/site/OurJourneyTimeline";

import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Journey — Yakshamitraru Germany e.V.",
  description:
    "The story of Yakshamitraru Germany e.V., from its beginnings to its growing role in preserving Yakshagana across Germany and Europe.",
};

export default function OurJourneyPage() {
  return (
    <>
      <PageHero
        padY="tall"
        eyebrow="Our Story"
        title={
          <>
            Our <em className="italic font-light">Journey</em>.
          </>
        }
        lede="From a shared passion to a thriving cultural movement preserving Yakshagana across Germany and Europe."
      />

      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="eyebrow text-forest flex items-center gap-3">
              <span className="hairline bg-forest hairline-grow" />
              <span>The Beginning</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] text-forest-deep text-balance">
              Where It All Began.
            </h2>
            <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-2xl">
              Every journey begins with a story, and so does Yakshamitraru
              Germany.
            </p>
            <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed max-w-2xl">
              Driven by a deep desire to reconnect with his artistic roots,
              Apurva Beleyur joined hands with Ajeeth Prabhu Thallur, whose
              lifelong passion for Yakshagana inspired them to present their
              first performance together in 2018.
            </p>
            <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed max-w-2xl">
              Their debut performance took place during the Kannada Rajyothsava
              celebrations organised by Rhein Main Kannada Sangha e.V. in
              Frankfurt. While Ajeeth Prabhu Thallur led the traditional costume
              preparation and make-up, Apurva Beleyur introduced Yakshagana to
              the organisers and secured a dedicated 45-minute performance slot
              on the main stage.
            </p>
            <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed max-w-2xl">
              Together they presented the Yakshagana play &quot;Babruvahana
              Kalaga&quot;, captivating the audience with an authentic and
              powerful performance. The standing ovation they received marked
              the beginning of a remarkable journey and opened new doors for
              Yakshagana across Europe.
            </p>
          </div>
          <div className="lg:col-span-5">
            <BrandCard variant="forest" className="p-8 hover-lift">
              <div className="eyebrow text-saffron">A first step</div>
              <h3 className="mt-4 font-serif text-2xl text-cream leading-tight">
                The spark that created a movement.
              </h3>
              <p className="mt-4 text-cream/75 leading-relaxed">
                What began as a single performance became the foundation of a
                growing community committed to preserving and sharing
                Yakshagana.
              </p>
            </BrandCard>
          </div>
        </div>
      </Section>

      <Section tone="forest" className="relative overflow-hidden">
        <SectionHeader
          eyebrow="Growing Together"
          title={
            <>
              Growing <em className="italic font-light">Beyond</em> a
              Performance.
            </>
          }
          align="center"
          className="mx-auto text-cream [&_.eyebrow]:text-saffron [&_.hairline]:bg-saffron"
        />
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7">
            <p className="text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl">
              Inspired by the overwhelming response, Apurva and Ajeeth continued
              performing together at cultural events across Germany.
            </p>
            <p className="mt-4 text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl">
              As interest in Yakshagana steadily grew, more artists joined their
              mission, transforming a shared passion between two friends into a
              vibrant cultural community.
            </p>
            <p className="mt-4 text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl">
              Today, Yakshamitraru Germany proudly promotes and preserves the
              rich tradition of Yakshagana by bringing together artists,
              enthusiasts, and audiences while keeping this timeless art form
              alive for future generations across Germany and Europe.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-sm border border-cream/15 bg-cream/10 p-8 backdrop-blur-sm">
              <div className="eyebrow text-saffron">A growing circle</div>
              <h3 className="mt-4 font-serif text-2xl text-cream leading-tight">
                From two artists to a wider cultural family.
              </h3>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream" className="relative overflow-hidden">
        <SectionHeader
          eyebrow="Milestones"
          title={
            <>
              Journey <em className="italic font-light">Through</em> the Years.
            </>
          }
          align="center"
          className="mx-auto text-forest-deep [&_.eyebrow]:text-crimson [&_.hairline]:bg-crimson"
        />
        <OurJourneyTimeline />
      </Section>

      <Section tone="forest">
        <div className="rounded-sm border border-cream/15 bg-cream/10 p-8 md:p-12 text-center">
          <p className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] leading-relaxed text-cream">
            &quot;What began as the dream of two passionate artists has grown
            into a vibrant cultural movement dedicated to preserving,
            celebrating, and sharing the timeless tradition of Yakshagana with
            audiences across Germany and Europe.&quot;
          </p>
        </div>
      </Section>
    </>
  );
}
