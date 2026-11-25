"use client";

import { useEffect, useState } from "react";

const COUNTRIES = [
  "Germany",
  "France",
  "Sweden",
  "The Netherlands",
  "Poland",
  "Switzerland",
  "Spain",
  "Denmark",
  "Finland",
] as const;

const CYCLE_MS = 2500;

const BANNER_STYLES = `
@keyframes europeBannerFadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes europeBannerShimmer {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0% 0;
  }
}

@keyframes europeBannerLineDraw {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes europeBannerDiamondIn {
  from {
    opacity: 0;
    transform: rotate(45deg) scale(0.4);
  }
  to {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }
}

@keyframes europeBannerCountryIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.europe-banner-word {
  display: inline-block;
  background-size: 260% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.europe-banner-word-ivory {
  color: #FAF6EE;
  background-image: linear-gradient(
    110deg,
    #FAF6EE 0%,
    #FAF6EE 38%,
    #E6C47E 50%,
    #FAF6EE 62%,
    #FAF6EE 100%
  );
}

.europe-banner-word-gold {
  color: #B8863B;
  background-image: linear-gradient(
    110deg,
    #B8863B 0%,
    #B8863B 38%,
    #F3DDA5 50%,
    #B8863B 62%,
    #B8863B 100%
  );
}

.europe-banner-word-1 {
  animation:
    europeBannerFadeUp 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 0ms both,
    europeBannerShimmer 1200ms ease-in-out 850ms 1 forwards;
}

.europe-banner-word-2 {
  animation:
    europeBannerFadeUp 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms both,
    europeBannerShimmer 1200ms ease-in-out 950ms 1 forwards;
}

.europe-banner-word-3 {
  animation:
    europeBannerFadeUp 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 240ms both,
    europeBannerShimmer 1200ms ease-in-out 1050ms 1 forwards;
}

.europe-banner-line-left {
  transform-origin: right center;
  animation: europeBannerLineDraw 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 220ms both;
}

.europe-banner-line-right {
  transform-origin: left center;
  animation: europeBannerLineDraw 800ms cubic-bezier(0.2, 0.7, 0.2, 1) 220ms both;
}

.europe-banner-diamond {
  animation: europeBannerDiamondIn 500ms cubic-bezier(0.2, 0.7, 0.2, 1) 160ms both;
}

.europe-banner-country {
  animation: europeBannerCountryIn 450ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .europe-banner-word,
  .europe-banner-word-1,
  .europe-banner-word-2,
  .europe-banner-word-3 {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    background-image: none !important;
    -webkit-text-fill-color: currentColor !important;
  }

  .europe-banner-line-left,
  .europe-banner-line-right,
  .europe-banner-diamond,
  .europe-banner-country {
    animation: none !important;
    opacity: 1 !important;
  }

  .europe-banner-line-left,
  .europe-banner-line-right,
  .europe-banner-country {
    transform: none !important;
  }

  .europe-banner-diamond {
    transform: rotate(45deg) !important;
  }
}
`;

export function EuropeBanner() {
  const [countryIndex, setCountryIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId: number | null = null;

    const startCycling = () => {
      if (intervalId !== null) return;
      intervalId = window.setInterval(() => {
        setCountryIndex((prev) => (prev + 1) % COUNTRIES.length);
      }, CYCLE_MS);
    };

    const stopCycling = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    if (!mediaQuery.matches) {
      startCycling();
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stopCycling();
        setCountryIndex(0);
      } else {
        startCycling();
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      stopCycling();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <section
      aria-label="Yakshagana in Europe"
      className="relative w-full overflow-hidden bg-[#2a060b] text-[#FAF6EE] pt-14 md:pt-16"
    >
      <style>{BANNER_STYLES}</style>

      {/* Continuous maroon backdrop + stage light matching Hero's top edge so there is no visible seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e0409_0%,#26050a_25%,#2d070c_45%,#34080e_70%,#2b060b_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52%_65%_at_50%_28%,rgba(122,31,43,0.28)_0%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-140 right-[20%] h-180 w-180 gold-radial opacity-40"
      />

      {/* Reserved fixed height prevents layout shift */}
      <div className="relative container-page py-3 md:py-4 h-26 md:h-31 lg:h-35 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif font-normal tracking-[-0.02em] leading-tight whitespace-nowrap text-[clamp(1.625rem,7.2vw,1.875rem)] md:text-4xl lg:text-5xl">
          <span className="europe-banner-word europe-banner-word-ivory europe-banner-word-1">
            Yakshagana
          </span>
          <span className="europe-banner-word europe-banner-word-ivory europe-banner-word-2">
            &nbsp;in
          </span>
          <span className="europe-banner-word europe-banner-word-gold europe-banner-word-3 italic pr-[0.08em]">
            &nbsp;Europe
          </span>
        </h2>

        {/* Row 1: Ornament row framing "Performed in" between two diamonds and outward-drawing 1px gold lines */}
        <div
          aria-hidden="true"
          className="mt-1.5 md:mt-2 flex items-center gap-2 sm:gap-2.5 w-full max-w-72 sm:max-w-84 md:max-w-96"
        >
          <span className="europe-banner-line-left h-px flex-1 bg-linear-to-l from-[#B8863B] to-[#B8863B]/15" />
          <span className="europe-banner-diamond h-1.5 w-1.5 rotate-45 bg-[#B8863B] shrink-0" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium leading-none text-[#FAF6EE]/75 whitespace-nowrap">
            Performed in
          </span>
          <span className="europe-banner-diamond h-1.5 w-1.5 rotate-45 bg-[#B8863B] shrink-0" />
          <span className="europe-banner-line-right h-px flex-1 bg-linear-to-r from-[#B8863B] to-[#B8863B]/15" />
        </div>

        {/* Row 2: Centered cycling country with fixed height */}
        <p className="mt-1 flex items-center justify-center h-5 leading-none">
          <span className="sr-only">
            Performed in Germany, Poland, France, Denmark and Spain
          </span>
          <span
            key={COUNTRIES[countryIndex]}
            aria-hidden="true"
            className="europe-banner-country inline-block text-center text-[13px] uppercase tracking-[0.24em] font-medium leading-none text-[#B8863B] whitespace-nowrap"
          >
            {COUNTRIES[countryIndex]}
          </span>
        </p>
      </div>
    </section>
  );
}
