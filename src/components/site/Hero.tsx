"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import heroAsset from "@/assets/hero.jpg.asset.json";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";
import aboutAsset from "@/assets/about.jpg.asset.json";
import { Sparkles, MapPin, Users, Calendar } from "lucide-react";

const SLIDES = [
  { src: heroAsset.url, alt: "Yakshagana performer in full crown and costume" },
  { src: perf1.url, alt: "Yakshagana ensemble on stage" },
  { src: perf2.url, alt: "Bhagavata and percussionists mid-performance" },
  { src: perf3.url, alt: "Veshadari in dramatic stage light" },
  { src: aboutAsset.url, alt: "Backstage moment before curtain" },
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
  const [scrollY, setScrollY] = useState(0);
  const timerRef = useRef<number | null>(null);

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

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        aria-roledescription="carousel"
      >
        {/* Base gradient wash */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#5a0d18_0%,#2a060b_55%,#1a0308_100%)]"
        />
        {/* Stage light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[20%] h-[720px] w-[720px] gold-radial opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] gold-radial opacity-15"
        />

        <div className="relative container-page pt-28 md:pt-36 pb-24 md:pb-32 min-h-[92svh] md:min-h-[94svh]">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
                className="mt-8 flex items-center gap-3 text-saffron"
              >
                <span className="hairline bg-saffron hairline-grow" />
                <span className="font-serif text-2xl md:text-3xl tracking-wide">The Heritage Lives On Stage.</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.3 }}
                className="mt-8 max-w-lg text-base md:text-lg text-cream/80 leading-relaxed"
              >
                Four centuries of Karnataka's dance-theatre — crown, drum, song
                and story — carried onto stages across Germany and Europe.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.45 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/events"
                  className="group inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-3.5 text-sm font-medium text-forest-deep transition-all duration-300 shadow-[0_10px_40px_-15px_color-mix(in_oklab,var(--saffron)_80%,transparent)] hover:shadow-[0_22px_60px_-18px_color-mix(in_oklab,var(--saffron)_95%,transparent)] hover:-translate-y-0.5 hover:bg-saffron/95"
                >
                  View Events
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact#booking"
                  className="inline-flex items-center gap-3 rounded-full border border-cream/30 bg-cream/[0.04] px-7 py-3.5 text-sm text-cream backdrop-blur-md transition-colors hover:bg-cream/10 hover:border-cream/60"
                >
                  Book a Performance
                </Link>
              </motion.div>
            </div>

            {/* Right — performer carousel */}
            <div className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2 relative">
              <div
                className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full overflow-hidden rounded-2xl lg:rounded-none lg:rounded-l-[2rem] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
                style={{ transform: `translate3d(0, ${Math.min(scrollY * 0.08, 60)}px, 0)` }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-0"
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
                  className="absolute inset-0 bg-gradient-to-r from-[#2a060b] via-[#2a060b]/30 to-transparent lg:from-[#2a060b] lg:via-transparent lg:to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#2a060b]/70 via-transparent to-transparent"
                />
              </div>

              {/* Carousel controls */}
              <button
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full border border-cream/10 bg-black/20 text-cream/70 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-cream hover:border-cream/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron hidden md:grid"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full border border-cream/10 bg-black/20 text-cream/70 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-cream hover:border-cream/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron hidden md:grid"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
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
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === index ? "w-8 bg-saffron" : "w-3 bg-cream/40 group-hover:bg-cream/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Stats bar — in normal document flow so it never overlaps
          the next section. Visually elevated with shadow only. */}
      <div className="relative bg-background py-16 md:py-20">
        <div className="container-page">
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
                <div key={s.v} className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="grid h-11 w-11 md:h-12 md:w-12 shrink-0 place-items-center rounded-full bg-saffron/15 text-saffron ring-1 ring-saffron/40">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <div className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-cream leading-none">
                      {s.k}
                    </div>
                    <div className="mt-1.5 text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.18em] text-cream/70 leading-tight">
                      {s.v}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}