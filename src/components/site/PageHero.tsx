"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * PageHero — Shared editorial hero for interior pages
 * (Artists, Events, Gallery, Contact, etc.). Mirrors the homepage Hero&apos;s
 * deep-maroon stage backdrop with a saffron "gold-radial" spotlight, so
 * every page opens on the same premium visual language.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  meta,
  padY = "default",
  align = "left",
  className,
  radial = "left",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
  padY?: "default" | "tall";
  align?: "left" | "center";
  className?: string;
  /** Preset spotlight placements for the saffron stage light. */
  radial?: "left" | "center" | "gallery";
}) {
  const pad =
    padY === "tall"
      ? "pt-32 md:pt-40 pb-20 md:pb-28"
      : "pt-32 md:pt-40 pb-16 md:pb-24";

  // Two stage lights: one large saffron key light, one softer accent —
  // positions tuned per preset so the composition changes subtly per page.
  const lights =
    radial === "gallery"
      ? { key: "-top-32 left-[10%]", accent: "-bottom-40 right-[5%]" }
      : radial === "center"
        ? {
            key: "-top-40 left-1/2 -translate-x-1/2",
            accent: "-bottom-40 left-1/2 -translate-x-1/2",
          }
        : { key: "-top-40 right-[15%]", accent: "-bottom-40 -left-40" };

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#2a060b] text-cream",
        pad,
        className,
      )}
    >
      {/* Base maroon wash — mirrors homepage Hero */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#5a0d18_0%,#2a060b_55%,#1a0308_100%)]"
      />
      {/* Saffron key light */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute h-180 w-180 gold-radial opacity-40",
          lights.key,
        )}
      />
      {/* Soft accent glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute h-130 w-130 gold-radial opacity-15",
          lights.accent,
        )}
      />
      <div className="relative container-page">
        <div
          className={cn(
            "max-w-4xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className="eyebrow text-saffron flex items-center gap-3"
            >
              <span className="hairline bg-saffron hairline-grow" />
              <span>{eyebrow}</span>
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
            className="display-1 mt-6 text-cream text-balance drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          >
            {title}
          </motion.h1>
          {lede && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.2, 0.7, 0.2, 1],
                delay: 0.3,
              }}
              className="lede mt-8 text-cream/80 max-w-2xl"
            >
              {lede}
            </motion.p>
          )}
          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.2, 0.7, 0.2, 1],
                delay: 0.45,
              }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {actions}
            </motion.div>
          )}
          {meta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.2, 0.7, 0.2, 1],
                delay: 0.55,
              }}
              className="mt-10 flex flex-wrap gap-x-10 gap-y-6 text-cream/70"
            >
              {meta}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
