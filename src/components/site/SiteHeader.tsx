"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "About Us", to: "/about" },
  { label: "Tradition", to: "/tradition" },
  { label: "Events", to: "/events" },
  { label: "Artists", to: "/artists" },
  { label: "Learn", to: "/learn" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.max(window.innerHeight - 96, 240);
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-xl border-b border-ink/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.15)]"
          : "bg-[#2a060b] backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-14 md:h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className={`relative grid place-items-center h-9 w-9 md:h-10 md:w-10 rounded-full overflow-hidden ring-2 transition-all duration-500 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.5)] ${scrolled ? "ring-forest-deep/20 bg-forest-deep text-cream" : "ring-saffron/40 bg-saffron text-forest-deep"}`}>
            <span className="font-serif font-medium text-lg leading-none">Y</span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className={`font-serif text-[15px] md:text-[16px] tracking-tight transition-colors duration-500 ${scrolled ? "text-ink" : "text-cream"}`}>Yakshamitraru</span>
            <span className={`eyebrow text-[9px] md:text-[10px] transition-colors duration-500 ${scrolled ? "text-ink/60" : "text-saffron/80"}`}>Germany e.V.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`text-sm transition-colors duration-300 hover:text-saffron ${isActive ? "text-saffron" : scrolled ? "text-ink/80" : "text-cream/80"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact#booking"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-forest-deep hover:bg-saffron/90 transition-colors shadow-[0_8px_24px_-12px_rgba(218,165,32,0.45)]"
          >
            Book a performance
            <span aria-hidden>→</span>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
              scrolled
                ? "border border-ink/20 bg-ink/5 text-ink"
                : "border border-cream/25 bg-cream/10 text-cream"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block h-0.5 w-5 bg-current rounded-full transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-current rounded-full transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden backdrop-blur-xl border-t overflow-hidden ${
              scrolled ? "bg-cream/95 border-ink/10" : "bg-[#2a060b]/98 border-cream/10"
            }`}
          >
            <nav className={`container-page flex flex-col py-4 divide-y ${scrolled ? "divide-ink/10" : "divide-cream/10"}`}>
              {NAV.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-serif py-3 hover:text-saffron transition-colors ${isActive ? "text-saffron" : scrolled ? "text-ink" : "text-cream"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact#booking"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-saffron px-5 py-3 text-sm font-medium text-forest-deep"
              >
                Book a performance
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
