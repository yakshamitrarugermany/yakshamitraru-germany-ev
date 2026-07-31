"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { label: "About Us", to: "/about" },
  { label: "Our Journey", to: "/our-journey" },
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
          : "linear-gradient(to right, #3A231E 0%, #160D0B 50%, #3A231E 100%) backdrop-blur-lg"
      }`}
    >
      <div className="container-page flex h-14 md:h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <span className="relative grid place-items-center h-11 w-11 shrink-0 rounded-full bg-forest overflow-hidden">
            <Image
              src="/images/Yakshamitraru_e.V_Logo_Circle.png"
              alt="Yakshamitraru Germany logo"
              fill
              className="object-cover"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={`font-serif text-[15px] md:text-[16px] tracking-tight transition-colors duration-500 ${scrolled ? "text-ink" : "text-cream"}`}
            >
              Yakshamitraru
            </span>
            <span
              className={`eyebrow text-[9px] md:text-[10px] transition-colors duration-500 ${scrolled ? "text-ink/60" : "text-saffron/80"}`}
            >
              Germany e.V.
            </span>
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
            className={`md:hidden inline-flex p-3 -mr-3 items-center justify-center bg-transparent transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
              scrolled ? "text-ink" : "text-cream"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
          >
            <div className="relative w-5 h-3.5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
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
              scrolled
                ? "bg-cream/95 border-ink/10"
                : "bg-[#2a060b]/98 border-cream/10"
            }`}
          >
            <nav
              className={`container-page flex flex-col py-4 divide-y ${scrolled ? "divide-ink/10" : "divide-cream/10"}`}
            >
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
