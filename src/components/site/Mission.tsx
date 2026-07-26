import aboutAsset from "@/assets/about.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import Image from "next/image";

export function Mission() {
  return (
    <section id="mission" className="relative py-24 md:py-40 bg-cream overflow-hidden">
      {/* Signature gold accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 h-[520px] w-[520px] gold-radial opacity-40"
      />
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Image collage — image-first */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm media-zoom shadow-[0_50px_120px_-40px_color-mix(in_oklab,var(--forest-deep)_60%,transparent)]">
            <Image
              src={aboutAsset.url}
              alt="Yakshagana performer preparing"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-forest-deep/10" />
            <div aria-hidden className="pointer-events-none absolute inset-0 caption-gradient opacity-50" />
            <figcaption className="absolute left-6 bottom-6 right-6 flex items-center gap-3 text-cream">
              <span className="hairline bg-saffron" />
              <span className="eyebrow text-[10px] text-cream/85">Backstage · before curtain</span>
            </figcaption>
          </div>

          {/* Floating secondary image — collage feel */}
          <div className="hidden md:block absolute -bottom-12 -right-6 w-[42%] aspect-[3/4] overflow-hidden rounded-sm media-zoom shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--forest-deep)_65%,transparent)] ring-4 ring-cream">
            <Image
              src={perf2.url}
              alt="Crown detail"
              fill
              className="object-cover"
            />
          </div>

          {/* Ghost numeral */}
          <div
            aria-hidden
            className="hidden lg:block absolute -top-10 -left-8 font-serif text-[10rem] leading-none text-forest-deep/[0.05] select-none pointer-events-none"
          >
            1600
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-8">
          <div className="flex items-center gap-3 text-forest">
            <span className="hairline bg-forest" />
            <span className="eyebrow">Tradition · Since 1600s</span>
          </div>

          <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] text-forest-deep text-balance">
            A four-hundred-year-old
            <br />
            <span className="italic">theatre of the night.</span>
          </h2>

          {/* Pull-quote replaces heavy paragraphs */}
          <blockquote className="mt-10 border-l-2 border-saffron pl-6 font-serif italic text-xl md:text-2xl text-forest-deep leading-snug">
            &ldquo;Crown, drum and story — carried from a Karnataka
            coast into European nights.&rdquo;
          </blockquote>

          <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
            Yakshamitraru Germany e.V. is a registered German cultural
            association presenting this living tradition — faithful in craft,
            considered in presentation, open to first-time audiences.
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "Registered", v: "e.V." },
              { k: "Ensemble", v: "16 artists" },
              { k: "Languages", v: "KN · EN · DE" },
            ].map((m) => (
              <div key={m.k}>
                <dt className="eyebrow text-ink-soft/70">{m.k}</dt>
                <dd className="mt-2 font-serif text-lg text-forest-deep">
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}