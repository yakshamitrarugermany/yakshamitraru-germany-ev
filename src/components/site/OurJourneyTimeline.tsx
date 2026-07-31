"use client";

import { BrandCard } from "@/components/site/BrandCard";
import { motion } from "framer-motion";
import {
  Award,
  Building2,
  Drama,
  Globe2,
  GraduationCap,
  Music4,
  Users,
} from "lucide-react";

const MILESTONES = [
  {
    year: "2018",
    title: "First performance",
    body: 'Ajeeth Prabhu Thallur and Apurva Beleyur presented "Babruvahana Kalaga" at Rhein Main Kannada Sangha e.V. in Frankfurt, marking the beginning of their journey.',
    icon: Drama,
  },
  {
    year: "2020",
    title: "A name takes form",
    body: 'The group was officially named Yakshamitraru and performed "Kamsa Vadhe", establishing a stronger cultural identity.',
    icon: Users,
  },
  {
    year: "2021",
    title: "Crossing borders",
    body: "Yakshamitraru Germany performed in Paris, extending the reach of Yakshagana beyond Germany’s borders.",
    icon: Globe2,
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
    body: "The first exclusive annual Yakshagana theatre event, Yaksha Sankranthi, was organised in Frankfurt.",
    icon: Award,
  },
  {
    year: "2025",
    title: "A recognised community",
    body: "Yakshamitraru Germany was officially registered and recognised as Yakshamitraru Germany e.V., while also launching training in collaboration with Dheemahi Yakshagana Kalakendra® Sirsi.",
    icon: Building2,
  },
  {
    year: "2025",
    title: "English-language milestone",
    body: "Europe’s first Yakshagana performance presented entirely in English took place in Bonn on 25 October 2025.",
    icon: Globe2,
  },
  {
    year: "2025",
    title: "Training launched",
    body: "Yakshagana training officially launched in collaboration with Dheemahi Yakshagana Kalakendra® Sirsi.",
    icon: GraduationCap,
  },
];

export function OurJourneyTimeline() {
  return (
    <div className="mt-16 relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-linear-to-b from-saffron via-saffron/60 to-forest-deep/10 md:left-1/2 md:-translate-x-1/2" />
      <div className="space-y-8 md:space-y-10">
        <div className="lg:hidden flex flex-col gap-2.5">
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
                className="relative md:grid md:grid-cols-2 md:gap-8 items-start"
              >
                <div
                  className={`hidden md:block ${isLeft ? "md:pr-10 text-right" : "md:pl-10"}`}
                >
                  {isLeft ? (
                    <div className="inline-flex items-center gap-3 rounded-full border border-forest-deep/10 bg-cream px-4 py-2 shadow-sm">
                      <span className="font-serif text-lg text-forest-deep/70">
                        {milestone.year}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="ml-8 md:ml-0">
                  <div className="absolute left-2.5 top-4 md:left-1/2 md:-translate-x-1/2 h-4 w-4 rounded-full border-4 border-cream bg-saffron shadow-[0_0_0_6px_rgba(218,165,32,0.18)]" />
                  <div
                    className={`ml-4 md:ml-0 ${isLeft ? "md:mr-6" : "md:ml-6"}`}
                  >
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
                          <div className="md:hidden font-serif text-lg text-forest-deep/70">
                            {milestone.year}
                          </div>
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

                <div
                  className={`hidden md:block ${isLeft ? "md:pl-10" : "md:pr-10 text-right"}`}
                >
                  {!isLeft ? (
                    <div className="inline-flex items-center gap-3 rounded-full border border-forest-deep/10 bg-cream px-4 py-2 shadow-sm">
                      <span className="font-serif text-lg text-forest-deep/70">
                        {milestone.year}
                      </span>
                    </div>
                  ) : null}
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
                    <div className="inline-flex items-center gap-3 rounded-full border border-forest-deep/10 bg-cream px-4 py-2 shadow-sm">
                      <span className="font-serif text-lg text-forest-deep/70">
                        {milestone.year}
                      </span>
                    </div>
                  </div>
                )}

                <div className="relative flex h-full items-center justify-center">
                  <div className="h-4 w-4 rounded-full border-4 border-cream bg-saffron shadow-[0_0_0_6px_rgba(218,165,32,0.18)]" />
                </div>

                {isLeft ? (
                  <div className="flex items-center justify-start pl-8">
                    <div className="inline-flex items-center gap-3 rounded-full border border-forest-deep/10 bg-cream px-4 py-2 shadow-sm">
                      <span className="font-serif text-lg text-forest-deep/70">
                        {milestone.year}
                      </span>
                    </div>
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
