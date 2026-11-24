const COUNTRY_SENTENCE =
  "Performed in Germany, France, Sweden, The Netherlands, Poland, Switzerland, Spain, Denmark and Finland";

const INFINITY_LOOP_SEGMENTS =
  "C 576 62, 642 26, 730 26 " +
  "C 858 26, 954 64, 954 120 " +
  "C 954 176, 858 214, 730 214 " +
  "C 642 214, 576 178, 500 120 " +
  "C 424 62, 358 26, 270 26 " +
  "C 142 26, 46 64, 46 120 " +
  "C 46 176, 142 214, 270 214 " +
  "C 358 214, 424 178, 500 120";

const INFINITY_PATH_DOUBLE = `M 500 120 ${INFINITY_LOOP_SEGMENTS} ${INFINITY_LOOP_SEGMENTS}`;

const BANNER_STYLES = `
.europe-infinity-text {
  font-size: 31px;
  font-weight: 500;
  letter-spacing: 0.03em;
}

@media (min-width: 640px) {
  .europe-infinity-text {
    font-size: 25px;
    letter-spacing: 0.05em;
  }
}

@media (min-width: 768px) {
  .europe-infinity-text {
    font-size: 25px;
    letter-spacing: 0.055em;
  }
}

@media (min-width: 1024px) {
  .europe-infinity-text {
    font-size: 24px;
    letter-spacing: 0.06em;
  }
}

@media (min-width: 1280px) {
  .europe-infinity-text {
    font-size: 22px;
    letter-spacing: 0.065em;
  }
}

@media (min-width: 1440px) {
  .europe-infinity-text {
    font-size: 25px;
    letter-spacing: 0.06em;
  }
}

.europe-banner-reduced-text {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  .europe-infinity-text {
    display: none;
  }

  .europe-banner-reduced-text {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0.75rem auto 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
}
`;

export function EuropeBanner() {
  return (
    <section
      aria-label="Yakshagana in Europe"
      className="relative w-full overflow-hidden bg-[#2a060b] text-[#FAF6EE] pt-14 md:pt-16"
    >
      <style>{BANNER_STYLES}</style>

      {/* Continuous deep maroon backdrop + subtle stage light matching Hero's top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e0409_0%,#26050a_25%,#2d070c_45%,#34080e_70%,#2b060b_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-140 right-[20%] h-180 w-180 gold-radial opacity-40"
      />

      <div className="relative container-page px-2 sm:px-6 py-2 sm:py-2.5 md:py-3 flex flex-col items-center justify-center">
        {/* Flattened infinity loop stage: left loop frames "Yakshagana", centre crossing frames smaller "in", right loop frames "EUROPE" */}
        <div className="relative mx-auto w-full max-w-86 sm:max-w-115 md:max-w-125 lg:max-w-140 xl:max-w-155 aspect-1000/240 flex items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 240"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <path
                id="europe-infinity-track"
                d={INFINITY_PATH_DOUBLE}
                fill="none"
              />
            </defs>

            {/* Continuously travelling country sentence along the invisible infinity path */}
            <text
              className="europe-infinity-text font-sans"
              fill="#B8863B"
              fillOpacity="0.95"
              dominantBaseline="central"
            >
              <textPath
                href="#europe-infinity-track"
                startOffset="0%"
                method="align"
                spacing="auto"
              >
                {COUNTRY_SENTENCE}
                <animate
                  attributeName="startOffset"
                  from="0%"
                  to="50%"
                  dur="28s"
                  repeatCount="indefinite"
                />
              </textPath>
            </text>
          </svg>

          {/* Primary Heading: "Yakshagana" in left loop, visibly smaller "in" at centre crossing, "EUROPE" in right loop */}
          <h2 className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-baseline w-full font-serif font-normal tracking-[-0.02em] leading-[1.08] text-[1.625rem] sm:text-3xl md:text-4xl xl:text-5xl [text-shadow:0_2px_18px_rgba(42,6,11,0.92),0_0_8px_rgba(42,6,11,0.85)]">
            <span className="text-right pr-2 sm:pr-3 md:pr-3.5 text-[#FAF6EE] whitespace-nowrap">
              Yakshagana{" "}
            </span>
            <span className="text-center text-base sm:text-lg md:text-2xl xl:text-[1.75rem] text-[#FAF6EE]/90 whitespace-nowrap">
              in
            </span>
            <span className="text-left pl-2 sm:pl-3 md:pl-3.5 italic text-[#B8863B] whitespace-nowrap">
              {" "}
              EUROPE
            </span>
          </h2>
        </div>

        {/* Accessible sentence for screen readers; becomes visible static text under prefers-reduced-motion */}
        <p className="europe-banner-reduced-text max-w-2xl text-center font-sans text-xs sm:text-sm tracking-[0.06em] text-[#B8863B]">
          {COUNTRY_SENTENCE}
        </p>
      </div>
    </section>
  );
}
