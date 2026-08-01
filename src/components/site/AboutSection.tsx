import Image from "next/image";
import Link from "next/link";
import aboutAsset from "@/assets/about.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "./Section";

export function AboutSection() {
  return (
    <Section tone="cream" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Who We Are"
            title={
              <>
                About <span className="italic">Us.</span>
              </>
            }
            lede="A dedicated community preserving and promoting the art of Yakshagana in Europe."
          />
          <Button asChild variant="forest" size="pill" className="mt-6 md:mt-8">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>

        <div className="lg:col-span-7 lg:pt-2">
          <div className="relative aspect-video sm:aspect-16/7 w-full overflow-hidden rounded-2xl mb-8 md:mb-10 shadow-xl">
            <Image
              src={aboutAsset.url}
              alt="About Yakshamitraru Germany"
              fill
              className="object-cover"
            />
          </div>
          <div className="prose prose-lg text-ink-soft leading-relaxed max-w-none">
            <p>
              Yakshamitraru Germany e.V. is a registered German cultural association founded by passionate artists and enthusiasts. Our mission is to preserve the rich heritage of Yakshagana while fostering cultural exchange across borders.
            </p>
            <p className="mt-6">
              We bring together a diverse ensemble of performers, musicians, and volunteers to stage authentic full-length prasangas (performances) for European audiences. By building a strong local community, we ensure that this centuries-old tradition continues to thrive far from its roots in coastal Karnataka.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "Registered", v: "e.V. Germany" },
              { k: "Ensemble", v: "16+ Artists" },
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
    </Section>
  );
}
