"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  // { label: "About Us", to: "/about" },
  { label: "Our Journey", to: "/our-journey" },
  { label: "Tradition", to: "/tradition" },
  { label: "Events", to: "/events" },
  { label: "Artists", to: "/artists" },
  // { label: "Learn", to: "/learn" },
  { label: "Gallery", to: "/gallery" },
  { label: "Get In Touch", to: "/contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = Math.max(window.innerHeight - 96, 240);
    const isScrolled = latest > threshold;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  });

  useEffect(() => {
    // Initial check on mount
    const timeout = setTimeout(() => {
      const threshold = Math.max(window.innerHeight - 96, 240);
      setScrolled(window.scrollY > threshold);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="site-mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 lg:hidden bg-black/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-xl border-b border-ink/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.15)]"
            : "linear-gradient(to right, #3A231E 0%, #160D0B 50%, #3A231E 100%) backdrop-blur-lg"
        }`}
      >
        <div className="container-page lg:px-4 xl:px-6 flex h-14 md:h-16 items-center justify-between gap-2 xl:gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 lg:gap-2 xl:gap-3 group shrink-0"
          >
            <div className="relative flex items-center justify-center h-10 w-10 md:h-11 md:w-11 lg:h-9 lg:w-9 xl:h-11 xl:w-11 min-h-10 min-w-10 md:min-h-11 md:min-w-11 lg:min-h-9 lg:min-w-9 xl:min-h-11 xl:min-w-11 shrink-0 rounded-full bg-forest overflow-hidden">
              <Image
                src="/images/logos/Yakshamitraru_e.V_Logo_Circle.png"
                alt="Yakshamitraru Germany"
                fill
                className="object-cover"
              />
            </div>
            <span className="flex flex-col leading-tight">
              {/* <span
                className={`font-serif text-[15px] md:text-[16px] lg:text-[14px] xl:text-[16px] tracking-tight transition-colors duration-500 ${scrolled ? "text-ink" : "text-cream"}`}
              >
                Yakshamitraru <br /> Germany e.V.
              </span> */}
              <span
                className={`eyebrow text-[9px] md:text-[10px] transition-colors duration-500 ${scrolled ? "text-ink/60" : "text-saffron/80"}`}
              >
                Yakshamitraru <br /> Germany e.V.
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex min-w-0 items-center gap-3 lg:gap-4 xl:gap-9">
            {NAV.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`text-[13px] lg:text-[12.5px] xl:text-sm whitespace-nowrap transition-colors duration-300 hover:text-saffron ${isActive ? "text-saffron" : scrolled ? "text-ink/80" : "text-cream/80"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact#booking"
              className="hidden lg:inline-flex shrink-0 items-center gap-1.5 lg:gap-1.5 xl:gap-2 rounded-full bg-saffron px-4 lg:px-3.5 xl:px-5 py-2 xl:py-2.5 text-[13px] lg:text-[12.5px] xl:text-sm font-medium whitespace-nowrap text-forest-deep hover:bg-saffron/90 transition-colors shadow-[0_8px_24px_-12px_rgba(218,165,32,0.45)]"
            >
              Book a performance
              <span aria-hidden>→</span>
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`lg:hidden inline-flex p-2.5 items-center justify-center bg-transparent transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
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
              className={`lg:hidden backdrop-blur-xl border-t max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain ${
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
    </>
  );
}
