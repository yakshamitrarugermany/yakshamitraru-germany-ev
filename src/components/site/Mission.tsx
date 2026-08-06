import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./Section";

export function Mission() {
  return (
    <section
      id="mission"
      className="relative py-14 md:py-40 bg-cream overflow-hidden"
    >
      {/* Signature gold accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 h-130 w-130 gold-radial opacity-40"
      />
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden">
          <SectionHeader
            eyebrow="Tradition · Since 1600s"
            title={
              <>
                A four-hundred-year-old
                <br />
                <span className="italic">theatre of the night.</span>
              </>
            }
            lede="Crown, drum and story — carried from a Karnataka coast into European nights."
          />
          <Button asChild variant="forest" size="pill" className="mt-6">
            <Link href="/tradition">Explore Yakshagana</Link>
          </Button>
        </div>

        {/* Image collage — image-first */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm media-zoom shadow-card">
            <Image
              src="/images/hero/hero7.jpeg"
              alt="Yakshagana performer preparing"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-forest-deep/10" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 caption-gradient opacity-50"
            />
            <figcaption className="absolute left-6 bottom-6 right-6 flex items-center gap-3 text-cream">
              <span className="hairline bg-saffron" />
              <span className="eyebrow text-[10px] text-cream/85">
                Backstage · before curtain
              </span>
            </figcaption>
          </div>

          {/* Floating secondary image — collage feel */}
          <div className="hidden md:block absolute -bottom-12 -right-6 w-[42%] aspect-3/4 overflow-hidden rounded-sm media-zoom shadow-card ring-4 ring-cream">
            <Image
              src="/images/hero/hero6.jpg"
              alt="Crown detail"
              fill
              className="object-cover"
            />
          </div>

          {/* Ghost numeral */}
          <div
            aria-hidden
            className="hidden lg:block absolute -top-10 -left-8 font-serif text-[10rem] leading-none text-forest-deep/5 select-none pointer-events-none"
          >
            1600
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-8">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-10">
            <SectionHeader
              eyebrow="Tradition · Since 1600s"
              title={
                <>
                  A four-hundred-year-old
                  <br />
                  <span className="italic">theatre of the night.</span>
                </>
              }
              lede="Crown, drum and story — carried from a Karnataka coast into European nights."
            />
            <Button asChild variant="forest" size="pill" className="mt-8">
              <Link href="/tradition">Explore Yakshagana</Link>
            </Button>
          </div>

          <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-lg">
            Yakshagana is a traditional folk theatre form from coastal
            Karnataka, India. It seamlessly combines dynamic dance, live music,
            spontaneous dialogue, and vibrant costumes to bring ancient epic
            stories to life. A single performance creates a mesmerizing
            experience that transports audiences into a world of myth and divine
            drama.
          </p>

          <dl className="mt-10 md:mt-12 grid grid-cols-3 gap-4 sm:gap-6 border-t border-border pt-6 md:pt-8">
            {[
              { k: "Origins", v: "16th Century" },
              { k: "Elements", v: "Dance · Music" },
              { k: "Stories", v: "Indian Epics" },
            ].map((m) => (
              <div key={m.k}>
                <dt className="eyebrow text-ink-soft/70">{m.k}</dt>
                <dd className="mt-2 font-serif text-base sm:text-lg text-forest-deep">
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
