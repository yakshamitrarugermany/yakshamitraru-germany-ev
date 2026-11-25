"use client";

import { BrandCard } from "@/components/site/BrandCard";
import { motion } from "framer-motion";
import {
  Award,
  Building2,
  Drama,
  Globe,
  Globe2,
  GraduationCap,
  Languages,
  MapPin,
  Music4,
  Users,
} from "lucide-react";

const MILESTONES = [
  {
    year: "2018",
    title: "First performance",
    body: 'Apurva Beleyur and his friend presented "Babruvahana Kalaga" at Rhein Main Kannada Sangha e.V. in Frankfurt, marking the beginning of their journey.',
    icon: Drama,
  },
  {
    year: "2019",
    title: "Expansion across Germany",
    body: "Yakshagana reached Berlin and Cologne in Germany.",
    icon: MapPin,
  },
  {
    year: "2020",
    title: "Corona Pandemic led to Online Yakshagana",
    body: 'The group was named as Yakshamitraru and performed "Kamsa Vadhe", establishing a stronger cultural identity.',
    icon: Globe,
  },
  {
    year: "2021",
    title: "A name takes place",
    body: (
      <>
        <strong>Yakshamitraru Germany</strong> performed in Paris, extending the
        reach of Yakshagana beyond Germany’s borders.
      </>
    ),
    icon: Users,
  },
  {
    year: "2023",
    title: "A landmark collaboration",
    body: "Germany’s first Yakshagana performance with live music was hosted in collaboration with Yakshadhruva Patla Foundation in Frankfurt.",
    icon: Music4,
  },
  {
    year: "2024",
    title: "A new annual tradition",
    body: (
      <>
        The first exclusive annual Yakshagana theatre event,
        <strong>Yaksha Sankranthi</strong> was organised in Frankfurt.
      </>
    ),
    icon: Award,
  },
  {
    year: "2025",
    title: "A recognised community",
    body: (
      <>
        <strong>Yakshamitraru Germany</strong> was officially registered and
        recognised as <strong>Yakshamitraru Germany e.V.</strong>
      </>
    ),
    icon: Building2,
  },
  {
    year: "2025",
    title: "English-language milestone",
    body: (
      <>
        <strong>Europe’s first Yakshagana</strong> performance presented
        entirely in <strong>English</strong> took place in Bonn on 25 October
        2025.
      </>
    ),
    icon: Languages,
  },
  {
    year: "2025",
    title: "Training launched",
    body: "Yakshagana training officially launched in collaboration with Dheemahi Yakshagana Kalakendra® Sirsi.",
    icon: GraduationCap,
  },
  {
    year: "2025",
    title: "Expanding across Europe",
    body: "Yakshagana was presented in Barcelona, Spain and Copenhagen, Denmark.",
    icon: Globe2,
  },
  {
    year: "2026",
    title: "A New Stage in Finland",
    body: "The team took Yakshagana to Finland, in association with Finland Kannada Association Ry.",
    icon: Globe2,
  },
  {
    year: "2026",
    title: "A story reaches academia",
    body: (
      <>
        A film on <strong>Yakshamitraru Germany</strong> (University version)
        was released in Münster, Germany.
      </>
    ),
    icon: Award,
  },
];

export function OurJourneyTimeline() {
  return (
    <div className="mt-16 relative md:max-w-2xl md:mx-auto lg:max-w-none">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-linear-to-b from-saffron via-saffron/60 to-forest-deep/10 lg:left-1/2 lg:-translate-x-1/2" />
      <div className="space-y-8 md:space-y-10">
        <div className="lg:hidden flex flex-col gap-2.5">
          {MILESTONES.map((milestone) => {
            const Icon = milestone.icon;

            return (
              <motion.div
                key={`${milestone.year}-${milestone.title}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative"
              >
                <div className="ml-8">
                  <div className="absolute left-4 -translate-x-1/2 top-4 h-4 w-4 rounded-full border-4 border-cream bg-saffron shadow-[0_0_0_6px_rgba(218,165,32,0.18)]" />
                  <div className="ml-4">
                    <BrandCard
                      variant="cream"
                      className="p-6 md:p-7 hover-lift relative overflow-hidden"
                    >
                      <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-saffron/10 blur-2xl" />
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-saffron/25 bg-saffron/10 text-saffron">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <span className="mb-2 inline-flex items-center rounded-full border-[1.5px] border-[#B8863B] bg-[#FAF6EE] px-3 py-1 font-serif text-base font-semibold leading-tight tracking-wide tabular-nums text-[#7A1F2B]">
                            {milestone.year}
                          </span>
                          <h3 className="font-serif text-2xl text-forest-deep leading-tight">
                            {milestone.title}
                          </h3>
                          <p className="mt-3 text-sm md:text-base text-ink-soft leading-relaxed">
                            {milestone.body}
                          </p>
                        </div>
                      </div>
                    </BrandCard>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="hidden lg:block">
          {MILESTONES.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={`${milestone.year}-${milestone.title}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8 lg:gap-10"
              >
                {isLeft ? (
                  <div className="flex justify-end pr-8">
                    <BrandCard
                      variant="cream"
                      className="w-full max-w-lg p-6 hover-lift relative overflow-hidden"
                    >
                      <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-saffron/10 blur-2xl" />
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-saffron/25 bg-saffron/10 text-saffron">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-2xl text-forest-deep leading-tight">
                            {milestone.title}
                          </h3>
                          <p className="mt-3 text-sm md:text-base text-ink-soft leading-relaxed">
                            {milestone.body}
                          </p>
                        </div>
                      </div>
                    </BrandCard>
                  </div>
                ) : (
                  <div className="flex items-center justify-end pr-8">
                    <span className="inline-flex items-center rounded-full border-[1.5px] border-[#B8863B] bg-[#FFFFFF] px-3 py-1 lg:px-4 lg:py-1.5 font-serif text-base lg:text-lg font-semibold leading-tight tracking-wide tabular-nums text-[#7A1F2B] shadow-sm">
                      {milestone.year}
                    </span>
                  </div>
                )}

                <div className="relative flex h-full items-center justify-center">
                  <div className="h-4 w-4 rounded-full border-4 border-cream bg-saffron shadow-[0_0_0_6px_rgba(218,165,32,0.18)]" />
                </div>

                {isLeft ? (
                  <div className="flex items-center justify-start pl-8">
                    <span className="inline-flex items-center rounded-full border-[1.5px] border-[#B8863B] bg-[#FFFFFF] px-3 py-1 lg:px-4 lg:py-1.5 font-serif text-base lg:text-lg font-semibold leading-tight tracking-wide tabular-nums text-[#7A1F2B] shadow-sm">
                      {milestone.year}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-start pl-8">
                    <BrandCard
                      variant="cream"
                      className="w-full max-w-lg p-6 hover-lift relative overflow-hidden"
                    >
                      <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-saffron/10 blur-2xl" />
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-saffron/25 bg-saffron/10 text-saffron">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-2xl text-forest-deep leading-tight">
                            {milestone.title}
                          </h3>
                          <p className="mt-3 text-sm md:text-base text-ink-soft leading-relaxed">
                            {milestone.body}
                          </p>
                        </div>
                      </div>
                    </BrandCard>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
