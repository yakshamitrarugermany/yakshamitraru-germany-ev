"use client";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Calendar, MapPin, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    src: "/images/hero/hero1.jpg",
    alt: "Yakshagana performer in full crown and costume",
  },
  { src: "/images/hero/hero2.jpg", alt: "Yakshagana ensemble on stage" },
  {
    src: "/images/hero/hero3.jpg",
    alt: "Bhagavata and percussionists mid-performance",
  },
  { src: "/images/hero/hero4.jpg", alt: "Veshadari in dramatic stage light" },
  { src: "/images/hero/hero5.jpg", alt: "Backstage moment before curtain" },
];

const ROTATE_MS = 3000;

const STATS = [
  { icon: Sparkles, k: "60+", v: "Performances" },
  { icon: MapPin, k: "18", v: "Cities in Europe" },
  { icon: Users, k: "16", v: "Dedicated Artists" },
  { icon: Calendar, k: "Since 2018", v: "One Community" },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 750], [0, 60], { clamp: true });

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      ROTATE_MS,
    );
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused]);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative w-full">
      {/* Deep maroon stage backdrop */}
      <div
        className="relative w-full overflow-hidden bg-[#2a060b] text-cream"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Hero Carousel"
      >
        {/* Base gradient wash */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#5a0d18_0%,#2a060b_55%,#1a0308_100%)]"
        />
        {/* Stage light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[20%] h-180 w-180 gold-radial opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-130 w-130 gold-radial opacity-15"
        />

        <div className="relative container-page pt-20 md:pt-36 pb-32 md:pb-40 min-h-[92svh] md:min-h-[94svh]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left — content */}
            <div className="lg:col-span-6 xl:col-span-6 relative z-10 order-2 lg:order-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
                className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] text-cream text-balance drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
              >
                Yakshamitraru
                <br />
                <span className="italic text-saffron">Germany e.V.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.2, 0.7, 0.2, 1],
                  delay: 0.08,
                }}
                className="mt-4 max-w-152 text-[1rem] md:text-[1.20rem] leading-7 md:leading-8 text-cream/70"
              >
                A passionate group of Yakshagana enthusiasts dedicated to
                preserving, presenting, and promoting India&apos;s rich
                traditional art form{" "}
                <span className="font-bold">Yakshagana</span> across Germany and
                Europe.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.2, 0.7, 0.2, 1],
                  delay: 0.15,
                }}
                className="mt-8 flex items-start gap-3 md:gap-4 text-saffron"
              >
                <span className="mt-1 w-0.5 shrink-0 self-stretch rounded-full bg-saffron" />

                <span className="font-serif text-2xl md:text-3xl tracking-wide leading-none">
                  <span className="block">The Indian Heritage</span>
                  <span className="block">Lives on European Stage.</span>
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.2, 0.7, 0.2, 1],
                  delay: 0.3,
                }}
                className="mt-8 max-w-lg text-base italic text-cream/80 leading-relaxed"
              >
                Four centuries of India&apos;s traditional theatre{" "}
                <span className="font-bold">Yakshagana</span> which consists of
                Storytelling, unique dance music, vibrant make-up, costume and
                dialogue.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.2, 0.7, 0.2, 1],
                  delay: 0.45,
                }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/events"
                  className="group inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-3.5 text-sm font-medium text-forest-deep transition-all duration-300 shadow-[0_10px_40px_-15px_color-mix(in_oklab,var(--saffron)_80%,transparent)] hover:shadow-[0_22px_60px_-18px_color-mix(in_oklab,var(--saffron)_95%,transparent)] hover:-translate-y-0.5 hover:bg-saffron/95"
                >
                  View Events
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/contact#booking"
                  className="inline-flex items-center gap-3 rounded-full border border-cream/30 bg-cream/4 px-7 py-3.5 text-sm text-cream backdrop-blur-md transition-colors hover:bg-cream/10 hover:border-cream/60"
                >
                  Book a Performance
                </Link>
              </motion.div>
            </div>

            {/* Right — performer carousel */}
            <div className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2 relative">
              <motion.div
                className="relative min-h-100 aspect-10/11 sm:min-h-125 sm:aspect-5/6 lg:min-h-0 lg:aspect-4/5 w-full overflow-hidden rounded-2xl lg:rounded-none lg:rounded-l-[2rem] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
                style={{ y }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={SLIDES[index].src}
                      alt={SLIDES[index].alt}
                      fill
                      className="object-cover object-[60%_center]"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Dark maroon wash for legibility, stronger on the left edge */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-r from-[#2a060b] via-[#2a060b]/30 to-transparent lg:from-[#2a060b] lg:via-transparent lg:to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-[#2a060b]/70 via-transparent to-transparent"
                />
              </motion.div>

              {/* Carousel controls */}
              <button
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:grid h-12 w-12 place-items-center rounded-full border border-cream/10 bg-black/20 text-cream/70 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-cream hover:border-cream/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:grid h-12 w-12 place-items-center rounded-full border border-cream/10 bg-black/20 text-cream/70 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-cream hover:border-cream/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Indicators */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-5 z-20 flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    className="group grid h-6 place-items-center focus-visible:outline-none"
                  >
                    <span
                      className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                        i === index
                          ? "w-8 bg-saffron"
                          : "w-3 bg-cream/40 group-hover:bg-cream/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar — overlapping the hero section */}
      <div className="relative z-30 container-page -mt-20 md:-mt-16 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
          className="rounded-2xl border border-forest-deep/20 bg-forest-deep text-cream shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--forest-deep)_75%,transparent)] px-6 sm:px-8 md:px-10 py-7 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6"
        >
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.v}
                className="flex flex-col sm:flex-row items-center sm:items-start md:items-center text-center sm:text-left gap-2 sm:gap-4 min-w-0"
              >
                <span className="grid h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 place-items-center rounded-full bg-saffron/15 text-saffron ring-1 ring-saffron/40">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.6} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-lg sm:text-xl md:text-[1.75rem] text-cream leading-tight sm:leading-none">
                    {s.k}
                  </div>
                  <div className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.18em] text-cream/70 leading-tight wrap-break-word">
                    {s.v}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
