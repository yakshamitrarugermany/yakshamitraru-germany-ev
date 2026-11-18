import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coming Soon — Yakshamitraru Germany e.V.",
  description:
    "Yakshamitraru Germany e.V. — Preserving and presenting Yakshagana across Germany and Europe.",
};

const CONTACT = {
  phone: "+49 176 3469 0281",
  whatsapp: "+4917634690281",
};

const whatsappHref = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hello Yakshamitraru — I'd like to enquire about a performance.",
)}`;

export default function ComingSoonPage() {
  return (
    <section
      aria-label="Coming soon"
      className="fixed inset-0 z-100 flex min-h-dvh w-full flex-col items-center justify-center bg-[#FAF6EE] px-6 py-12 text-center"
    >
      <style>{`
        body > header,
        body > footer {
          display: none !important;
        }
      `}</style>
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
        <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-full bg-forest">
          <Image
            src="/images/logos/Yakshamitraru_e.V_Logo_Circle.png"
            alt="Yakshamitraru Germany logo"
            fill
            sizes="(max-width: 639px) 96px, 128px"
            className="object-cover"
            priority
          />
        </div>
        <p className="font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.28em] text-[#7A1F2B]/80">
          Yakshamitraru Germany
        </p>
        <span aria-hidden="true" className="block h-px w-12 bg-[#B8863B]" />
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight text-[#7A1F2B]">
          Coming soon
        </h1>
        <p className="max-w-md font-sans text-sm sm:text-base leading-relaxed text-[#7A1F2B]/75">
          We are preparing our new stage online — stay tuned for upcoming
          Yakshagana performances across Europe.
        </p>
        <p className="mt-1 font-sans text-sm sm:text-base text-[#7A1F2B]/80">
          Contact us at{" "}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-1.5 font-medium text-[#7A1F2B] underline decoration-[#B8863B] underline-offset-4 transition-colors hover:text-[#B8863B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8863B]"
          >
            Apurva Beleyur · {CONTACT.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
