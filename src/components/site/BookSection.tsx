"use client";
import { EnquiryForm } from "./EnquiryForm";

const CONTACT_EMAIL = "yakshamitrarugermany@gmail.com";

export function BookSection() {
  return (
    <section
      id="book"
      className="relative bg-forest-deep text-cream py-24 md:py-40 overflow-hidden"
    >
      {/* Decorative rays */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-225 rounded-full opacity-[0.08]"
        style={{
          background:
            "conic-gradient(from 0deg, var(--saffron), transparent 8%, var(--crimson) 16%, transparent 24%, var(--cream) 32%, transparent 40%, var(--saffron) 48%, transparent 56%)",
        }}
      />

      <div className="relative container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-saffron">
            <span className="hairline bg-saffron" />
            <span className="eyebrow">Book · Enquire</span>
          </div>
          <h2 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02]">
            Bring Yakshagana
            <br />
            <span className="italic text-saffron">to your stage.</span>
          </h2>
          <p className="mt-8 text-cream/75 leading-relaxed max-w-md">
            Theatres, festivals, universities, embassies and private hosts —
            share a few details and we will come back with programme options,
            technical rider and fees.
          </p>

          <dl className="mt-12 space-y-6 text-sm">
            <div>
              <dt className="eyebrow text-saffron/80">Enquiries</dt>
              <dd className="mt-2 font-serif text-xl text-cream">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-saffron"
                >
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-saffron/80">Registered seat</dt>
              <dd className="mt-2 text-cream/80">
                Yakshamitraru Germany e.V.
                <br />
                Germany
              </dd>
            </div>
          </dl>
        </div>

        <EnquiryForm variant="home" emailTo={CONTACT_EMAIL} />
      </div>
    </section>
  );
}
