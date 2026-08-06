"use client";
import { BrandCard } from "@/components/site/BrandCard";
import { FAQAccordion } from "@/components/site/FAQAccordion";

import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  FiFacebook as Facebook,
  FiInstagram as Instagram,
  FiYoutube as Youtube,
} from "react-icons/fi";
import { z } from "zod";

const CONTACT = {
  email: "yakshamitrarugermany@gmail.com",
  phone: "+49 176 3469 0281",
  whatsapp: "+4917634690281", // digits only, no +
  address: "Yakshamitraru Germany e.V., Kulturstraße 12, 10115 Berlin, Germany",
  mapsQuery: "Kulturstraße 12, 10115 Berlin, Germany",
};

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  eventType: z.string().trim().max(80).optional().or(z.literal("")),
  date: z.string().trim().max(60).optional().or(z.literal("")),
  audience: z.string().trim().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A short brief helps us respond well")
    .max(2000),
});

const FAQS: { q: string; a: string }[] = [
  {
    q: "What kind of venues do you perform at?",
    a: "Theatres, festivals, universities, embassies, museums and private hosts across Europe. We adapt from full night-long productions to 45-minute concert sets.",
  },
  {
    q: "How much notice do you need to book?",
    a: "For full productions we recommend at least three to four months. Concert sets and workshops can often be arranged with six to eight weeks of lead time.",
  },
  {
    q: "Do you provide the full technical setup?",
    a: "Yes — we supply costumes, headgear, instruments and a technical rider. Venues provide stage, lighting, sound and dressing rooms per the rider.",
  },
  {
    q: "In which languages do you perform?",
    a: "Yakshagana is traditionally in Kannada. We offer English or German synopses, surtitles and pre-show introductions for European audiences.",
  },
  {
    q: "Can you tailor a programme for our event?",
    a: "Absolutely. We regularly curate themed evenings — festivals of light, mythological cycles, or educational lecture-demonstrations.",
  },
  {
    q: "How are fees structured?",
    a: "Fees depend on programme length, ensemble size and travel. We share a transparent quote after understanding your event.",
  },
];

export default function ContactClient() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sentData, setSentData] = useState<z.infer<
    typeof bookingSchema
  > | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = bookingSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const v = parsed.data;
    const subject = `Performance enquiry — ${v.name}${v.organization ? " · " + v.organization : ""}`;
    const body = [
      `Name: ${v.name}`,
      v.organization ? `Organisation: ${v.organization}` : null,
      `Email: ${v.email}`,
      v.phone ? `Phone: ${v.phone}` : null,
      v.city ? `City / Venue: ${v.city}` : null,
      v.eventType ? `Event type: ${v.eventType}` : null,
      v.date ? `Preferred date: ${v.date}` : null,
      v.audience ? `Audience size: ${v.audience}` : null,
      "",
      "Brief:",
      v.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSentData(v);
    setSent(true);
  }

  const whatsappHref = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hello Yakshamitraru — I'd like to enquire about a performance.",
  )}`;
  const continueWhatsappHref = sentData
    ? `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hello Yakshamitraru Germany,\n\nI just sent an email enquiry regarding a performance.\n\nName: ${sentData.name}\nMessage: ${sentData.message}`,
      )}`
    : whatsappHref;
  const askQuestionWhatsappHref = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hello Yakshamitraru Germany,\n\nI have a question regarding...",
  )}`;

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Contact · Book"
        title={
          <>
            Bring <em className="italic font-light">Yakshagana</em> to your
            stage.
          </>
        }
        lede="Theatres, festivals, universities and cultural institutions across Europe — share a few details and we will come back with programme options, technical rider and fees."
        actions={
          <>
            <Button asChild variant="saffron" size="xl">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp us
              </a>
            </Button>
            <Button asChild variant="outline-cream" size="xl">
              <Link href="#booking">Send enquiry</Link>
            </Button>
          </>
        }
      />

      {/* Contact info strip */}
      <Section tone="cream" size="sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 -mt-16 md:-mt-24 relative z-10">
          <InfoCard
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
          />
          <InfoCard
            icon={<Phone className="h-5 w-5" />}
            label="Apoorva Beleyur"
            value={CONTACT.phone}
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          />
          <InfoCard
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            value="Chat with us"
            href={whatsappHref}
            accent
          />
        </div>
      </Section>

      {/* Booking form + Map */}
      <Section tone="cream" id="booking" size="sm">
        <div className="flex flex-col gap-10 lg:gap-12">
          {/* Form */}
          <div>
            <SectionHeader
              eyebrow="Booking form"
              title={
                <>
                  Tell us about your{" "}
                  <em className="italic font-light">event.</em>
                </>
              }
              lede="The more you share, the sharper our response. We typically reply within two working days."
            />

            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-8 rounded-2xl bg-white border border-border p-6 md:p-7 lg:p-8 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 lg:gap-y-4">
                <Field
                  label="Your name"
                  name="name"
                  required
                  error={errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  error={errors.email}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  error={errors.phone}
                />
                <SelectField
                  label="Event type"
                  name="eventType"
                  error={errors.eventType}
                  options={[
                    "Full production",
                    "Concert set",
                    "Workshop / lecture",
                    "Festival slot",
                    "Private event",
                    "Other",
                  ]}
                />
                <Field label="City / Venue" name="city" error={errors.city} />
                <Field
                  label="Preferred date"
                  name="date"
                  placeholder="e.g. Autumn 2026, or a specific week"
                  error={errors.date}
                />
                <Field
                  label="Organisation (optional)"
                  name="organization"
                  error={errors.organization}
                />
                <SelectField
                  label="Audience size"
                  name="audience"
                  error={errors.audience}
                  options={["Under 100", "100–300", "300–800", "800+"]}
                />
                <div className="md:col-span-2">
                  <label
                    htmlFor="booking-message"
                    className="eyebrow text-ink-soft"
                  >
                    Brief <span className="text-crimson">*</span>
                  </label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Briefly describe your event, requirements, or enquiry..."
                    className="mt-1.5 w-full bg-transparent border border-ink/20 rounded-xl p-4 focus:border-forest-deep outline-none text-foreground placeholder:text-ink-soft placeholder:text-base resize-y transition-colors shadow-sm"
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-crimson">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-ink-soft max-w-sm">
                  On submit, your email client opens with the enquiry addressed
                  to {CONTACT.email}.
                </p>
                <Button type="submit" variant="forest" size="xl">
                  Send enquiry <span aria-hidden>→</span>
                </Button>
              </div>
              {sent && (
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-saffron/10 p-5 rounded-xl border border-saffron/20">
                  <p className="text-sm text-forest-deep max-w-lg">
                    Thank you — your email client should now be open. If not,
                    write to{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="underline font-medium hover:text-saffron transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                    .
                  </p>
                  <Button
                    asChild
                    variant="saffron"
                    size="lg"
                    className="shrink-0"
                  >
                    <a
                      href={continueWhatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Continue on WhatsApp
                    </a>
                  </Button>
                </div>
              )}
            </form>
          </div>
          {/* Banner */}
          <aside>
            <BrandCard
              variant="forest"
              className="p-6 md:p-8 lg:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8"
            >
              <div className="lg:max-w-xl">
                <div className="eyebrow text-saffron">Follow the ensemble</div>
                <h3 className="heading-lg mt-3 text-cream">
                  Behind the <em className="italic font-light">curtain.</em>
                </h3>
                <p className="mt-3 text-cream/70 text-sm lg:text-base">
                  Rehearsal clips, tour diaries and premieres.
                </p>
              </div>
              <div className="mt-6 lg:mt-0 flex flex-wrap gap-3 shrink-0">
                <Social
                  href="https://www.instagram.com/yakshamitrarugermany_e.v?igsh=MXRpZHNjYzIwcnQ4ZA=="
                  icon={<Instagram className="h-4 w-4" />}
                  label="Instagram"
                />
                <Social
                  href="https://youtube.com/@yakshamitrarugermany?si=pyfkxbeGN3Z47Gra"
                  icon={<Youtube className="h-4 w-4" />}
                  label="YouTube"
                />
                <Social
                  href="https://www.facebook.com/yakshamitrarugermany"
                  icon={<Facebook className="h-4 w-4" />}
                  label="Facebook"
                />
                <Social
                  href={whatsappHref}
                  icon={<MessageCircle className="h-4 w-4" />}
                  label="WhatsApp"
                />
              </div>
            </BrandCard>
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="muted" size="sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Frequently asked"
              title={
                <>
                  Everything you might{" "}
                  <em className="italic font-light">wonder.</em>
                </>
              }
              lede="Can't find your answer? Write to us and we will respond personally."
            />
            <div className="mt-8">
              <Button asChild variant="outline-ink" size="lg">
                <a
                  href={askQuestionWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask a question
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} variant="bold" />
          </div>
        </div>
      </Section>
    </>
  );
}

/* ---------- helpers ---------- */

function InfoCard({
  icon,
  label,
  value,
  href,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group flex items-center gap-5 rounded-2xl border p-6 md:p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] transition-all hover-lift ${
        accent
          ? "bg-forest-deep text-cream border-forest-deep"
          : "bg-cream text-foreground border-forest-deep/10 hover:border-forest-deep/40"
      }`}
    >
      <span
        className={`grid place-items-center h-12 w-12 rounded-full shrink-0 ${
          accent
            ? "bg-saffron text-forest-deep"
            : "bg-forest-deep/5 text-forest-deep ring-1 ring-forest-deep/10"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span
          className={`eyebrow block ${accent ? "text-saffron" : "text-crimson"}`}
        >
          {label}
        </span>
        <span className="mt-1 block font-serif text-xl leading-tight truncate">
          {value}
        </span>
      </span>
      <span
        aria-hidden
        className="text-lg opacity-60 group-hover:translate-x-1 transition-transform"
      >
        →
      </span>
    </a>
  );
}

function Social({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm text-cream hover:bg-cream hover:text-forest-deep transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-ink-soft">
        {label}
        {required && <span className="text-crimson"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-ink/20 focus:border-forest-deep outline-none py-1 text-foreground placeholder:text-ink-soft placeholder:text-sm transition-colors"
      />
      {error && <p className="mt-2 text-xs text-crimson">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-ink-soft">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          className="w-full appearance-none bg-transparent border-b border-ink/20 focus:border-forest-deep outline-none py-1 pr-8 text-ink-soft text-sm transition-colors cursor-pointer"
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink-soft text-xs">
          ▾
        </span>
      </div>
      {error && <p className="mt-2 text-xs text-crimson">{error}</p>}
    </div>
  );
}
