"use client";
import { useId, useState, type FormEvent } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(255),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  date: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A short brief helps us respond well")
    .max(2000),
});

const CONTACT_EMAIL = "info@yakshamitraru.de";

export function BookSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
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
      v.city ? `City / Venue: ${v.city}` : null,
      v.date ? `Preferred date: ${v.date}` : null,
      "",
      "Brief:",
      v.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

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

        <form
          onSubmit={onSubmit}
          noValidate
          aria-label="Performance booking enquiry"
          className="lg:col-span-7 rounded-sm bg-cream/4 backdrop-blur-sm border border-cream/15 p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <Field label="Your name" name="name" error={errors.name} required />
            <Field
              label="Organisation (optional)"
              name="organization"
              error={errors.organization}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              error={errors.email}
              required
            />
            <Field label="City / Venue" name="city" error={errors.city} />
            <Field
              label="Preferred date"
              name="date"
              placeholder="e.g. Autumn 2026, or a specific week"
              error={errors.date}
              className="md:col-span-2"
            />
            <BriefField error={errors.message} />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-cream/50 max-w-sm">
              By submitting, your email client will open with the enquiry
              addressed to {CONTACT_EMAIL}.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-3.5 text-sm font-medium text-forest-deep hover:bg-saffron/90 transition-colors"
            >
              Send enquiry
              <span aria-hidden>→</span>
            </button>
          </div>
          {sent && (
            <p className="mt-6 text-sm text-saffron">
              Thank you — your email client should now be open. If not, write to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
}) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow text-cream/70">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className="mt-3 w-full bg-transparent border-b border-cream/25 focus:border-saffron outline-none py-3 text-cream placeholder:text-cream/40 transition-colors"
      />
      {error && (
        <p id={errId} className="mt-2 text-xs text-saffron">
          {error}
        </p>
      )}
    </div>
  );
}

function BriefField({ error }: { error?: string }) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div className="md:col-span-2">
      <label htmlFor={id} className="eyebrow text-cream/70">
        Brief
      </label>
      <textarea
        id={id}
        name="message"
        rows={5}
        required
        placeholder="Tell us about the event, audience, format and any programme ideas."
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className="mt-3 w-full bg-transparent border-b border-cream/25 focus:border-saffron outline-none py-3 text-cream placeholder:text-cream/40 resize-none transition-colors"
      />
      {error && (
        <p id={errId} className="mt-2 text-xs text-saffron">
          {error}
        </p>
      )}
    </div>
  );
}
