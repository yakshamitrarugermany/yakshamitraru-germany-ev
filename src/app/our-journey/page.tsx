import { BrandCard } from "@/components/site/BrandCard";
import { OurJourneyTimeline } from "@/components/site/OurJourneyTimeline";

import { PageHero } from "@/components/site/PageHero";
import {
  Section,
  SectionHeader,
  SectionSeparator,
} from "@/components/site/Section";
import { Stat } from "@/components/site/Stat";
import { Compass, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Journey — Yakshamitraru Germany e.V.",
  description:
    "The story of Yakshamitraru Germany e.V., from its beginnings to its growing role in presenting and promoting Yakshagana across Germany and Europe.",
};

const WHY = [
  {
    n: "01",
    title: "The only registered Yakshagana e.V. in Germany",
    body: "A formal cultural association — transparent, accountable and accessible to public and private partners.",
  },
  {
    n: "02",
    title: "A resident ensemble, not a booking agency",
    body: "Every artist on stage belongs to Yakshamitraru Germany. One voice, one discipline, one aesthetic.",
  },
  {
    n: "03",
    title: "European-standard production",
    body: "Lighting, sound and stage design built for European venues — without compromising traditional craft.",
  },
  {
    n: "04",
    title: "Bridging two cultures",
    body: "Programmes designed in Kannada, English and German — welcoming both diaspora and first-time audiences.",
  },
];

export default function OurJourneyPage() {
  return (
    <>
      <PageHero
        padY="tall"
        eyebrow="About Yakshamitraru Germany"
        title={
          <>
            The <em className="italic font-light">Spark</em> that created{" "}
            <em className="italic font-light">Yakshagana wave</em> in{" "}
            <em className="italic font-light">Europe</em>.
          </>
        }
        lede="A registered cultural association in Germany carrying Yakshagana — the four-hundred-year-old night theatre of Karnataka — onto European stages, with faithful craft and considered presentation. From a shared passion to a thriving cultural movement presenting Yakshagana across Germany and Europe."
        meta={
          <>
            <Stat n={2021} label="Founded" />
            <Stat n={"20+"} label="Artists" />
            <Stat n={26} label="European cities" />
            <Stat n={"e.V."} label="Registered association" />
          </>
        }
      />

      <Section tone="cream">
        <div>
          <div className="eyebrow text-forest flex items-center gap-3">
            <span className="hairline bg-forest hairline-grow" />
            <span>The Beginning</span>
          </div>
          <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] text-forest-deep text-balance">
            Where It All Began.
          </h2>
          <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed">
            Every achiever has a story, so does{" "}
            <strong>Yakshamitraru Germany!</strong>
          </p>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed text-justify hyphens-none max-sm:text-[15px]">
            Apurva Beleyur’s quest to reconnect to his artistic roots led him to
            initiate a discussion with a friend (Due to GDPR restriction, name
            has been masked), whose Yakshagana within him motivated them to
            perform a first Yakshagana performance together in 2018 in
            &quot;Kannada Rajyothsava&quot; event organised by Rhein Main
            Kannada Sangha e.V, in Frankfurt Germany. While Apurva Beleyur
            convinced organisers to introduce Yakshagana and secured the first
            lengthy stage performance in Europe, his friend coordinated with
            costume wearing and make-up. Thereby, Yakshagana was successfully
            introduced for the first time by the expats in Europe.
          </p>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed">
            The duo performed Yakshagana &quot;Babruvahana KaLaga&quot; (Along
            with a supporting character by Loukya Balasubramaniam) which
            received standing applause from the audience and the door to
            <strong>Yakshagana in Europe</strong> opened up. Since then, the duo
            have performed a number of shows together within Germany until 2020
            and a group formed under the name
            <strong>Yakshamitraru</strong>.
          </p>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed">
            After which Apurva Beleyur was invited to Paris, France by the
            France Kannada Balaga for a Yakshagana Performance. As his friend
            was not residing in Europe, Apurva Beleyur trained Madhushree
            Devaraj and took Yakshagana to France under the name{" "}
            <strong>Yakshamitraru Germany</strong>,{" "}
            <em className="italic">thereby laying the foundation stone.</em>
          </p>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed">
            After the successful performances, Apurva Beleyur initiated,
            conceptualized, named and financed{" "}
            <strong>Yakshamitraru Germany </strong>and planned the play
            &quot;Jatayu Moksha&quot; and called upon interested theatre
            background artists in Germany. Through which Shashidhar Nairy,
            Sushma Ravindra and a friend joined the Team and later on Shrihari
            Hosamane and Prateek Hegde Bengle contacted Apurva Beleyur and
            completed the Team.
          </p>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed text-justify hyphens-none max-sm:text-[15px]">
            Until 2024, Yakshamitraru Germany was the only recognised and
            established Yakshagana &quot;Team&quot; operated in Europe. From
            2021 till 2026, Yakshagana was introduced and performed by the team
            in Germany, France, Sweden, The Netherlands, Poland, Switzerland,
            Spain, Denmark and Finland.{" "}
            <strong>
              Yakshamitraru Germany created the Yakshagana wave in Europe.
            </strong>
          </p>
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
              Inspired by the overwhelming response, the founding artists
              continued performing together at cultural events across Germany.
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

      <Section tone="forest" className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl">
          <div className="eyebrow text-saffron flex items-center gap-3">
            <span className="hairline bg-saffron hairline-grow" />
            <span>European Stage for Indian Art</span>
          </div>
          <p className="mt-8 text-base md:text-lg text-cream/80 leading-relaxed">
            The Joy and the Passion motivate the team not only to introduce
            Yakshagana to European audiences but also perform with pride.
          </p>
          <p className="mt-4 text-base md:text-lg text-cream/80 leading-relaxed">
            The team travels across Europe and introduces Yakshagana to European
            audiences.
          </p>
          <p className="mt-4 text-base md:text-lg text-cream/80 leading-relaxed">
            German cities such as Frankfurt, Munich, Berlin, Cologne, Hamburg
            and so on and France, Sweden, Poland, Netherlands, Switzerland,
            Spain, Denmark, and Finland have staged Yakshagana Performances
            between 2018 to 2026.
          </p>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeader
          eyebrow="Mission & Vision"
          title={
            <>
              What we <em className="italic font-light">stand for</em>.
            </>
          }
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <BrandCard variant="cream" className="p-8 md:p-12 hover-lift">
            <div className="flex items-center gap-3 text-forest">
              <Compass className="h-5 w-5 text-saffron" />
              <span className="eyebrow">Our Mission</span>
            </div>
            <h3 className="mt-6 font-serif text-3xl md:text-4xl text-forest-deep leading-tight">
              To present and promote Yakshagana faithfully — for Europe.
            </h3>
            <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
              We stage full-length productions, train new artists and open the
              tradition to European audiences without dilution — carrying the
              music, movement and story of Yakshagana into a wider cultural
              conversation.
            </p>
          </BrandCard>
          <BrandCard variant="forest" className="p-8 md:p-12 hover-lift">
            <div className="flex items-center gap-3 text-saffron">
              <Sparkles className="h-5 w-5" />
              <span className="eyebrow">Our Vision</span>
            </div>
            <h3 className="mt-6 font-serif text-3xl md:text-4xl text-cream leading-tight">
              A European home for the night theatre of Karnataka.
            </h3>
            <p className="mt-6 text-base md:text-lg text-cream/80 leading-relaxed">
              A permanent training studio, a youth ensemble and a touring
              circuit across Europe&apos;s cultural capitals — so Yakshagana
              lives here as it does on its coast: nightly, generously, in full
              voice.
            </p>
          </BrandCard>
        </div>
      </Section>

      {/* 8. Why Yakshamitraru Germany */}
      <Section tone="cream" className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="eyebrow text-crimson flex items-center gap-3">
              <span className="hairline bg-crimson/60 hairline-grow" />
              <span>Why Yakshamitraru Germany</span>
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] text-forest-deep text-balance">
              What makes this Team <em className="italic font-light">unique</em>
              .
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
              We are not a booking agency, a festival or a temple programme. We
              are a resident ensemble, built for European stages, faithful to a
              Karnataka tradition.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {WHY.map((w) => (
              <div
                key={w.n}
                className="group flex gap-6 rounded-2xl border border-forest-deep/10 bg-cream p-7 md:p-8 hover:border-saffron/50 transition-colors"
              >
                <div className="font-mono text-sm text-saffron pt-1">{w.n}</div>
                <div>
                  <h3 className="font-serif text-2xl text-forest-deep leading-tight">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-ink-soft leading-relaxed">{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <SectionSeparator />
    </>
  );
}
