"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  eventType: z.string().trim().max(80).optional().or(z.literal("")),
  dateMode: z.enum(["exact", "custom"]),
  dateExact: z.string().trim().max(60).optional().or(z.literal("")),
  dateCustom: z.string().trim().max(60).optional().or(z.literal("")),
  audience: z.string().trim().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A short brief helps us respond well")
    .max(2000),
}).refine((data) => {
  if (data.dateMode === "exact" && !data.dateExact) return true; // optional
  if (data.dateMode === "custom" && !data.dateCustom) return true; // optional
  return true;
}, {
  message: "Please provide a date",
  path: ["dateExact"],
});

type EnquiryFormProps = {
  variant: "home" | "contact";
  emailTo: string;
  whatsappPhone?: string;
};

export function EnquiryForm({ variant, emailTo, whatsappPhone }: EnquiryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sentData, setSentData] = useState<z.infer<typeof bookingSchema> | null>(null);
  
  const [dateMode, setDateMode] = useState<"exact" | "custom">("exact");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = bookingSchema.safeParse(data);
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
    
    const preferredDate = v.dateMode === "exact" ? v.dateExact : v.dateCustom;
    
    const subject = `Performance enquiry — ${v.name}${v.organization ? " · " + v.organization : ""}`;
    const body = [
      `Name: ${v.name}`,
      v.organization ? `Organisation: ${v.organization}` : null,
      `Email: ${v.email}`,
      v.phone ? `Phone: ${v.phone}` : null,
      v.city ? `City / Venue: ${v.city}` : null,
      v.eventType ? `Event type: ${v.eventType}` : null,
      preferredDate ? `Preferred date: ${preferredDate}` : null,
      v.audience ? `Audience size: ${v.audience}` : null,
      "",
      "Brief:",
      v.message,
    ]
      .filter(Boolean)
      .join("\n");
      
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSentData(v);
    setSent(true);
  }

  const continueWhatsappHref =
    sentData && whatsappPhone
      ? `https://wa.me/${whatsappPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
          `Hello Yakshamitraru Germany,\n\nI just sent an email enquiry regarding a performance.\n\nName: ${sentData.name}\nMessage: ${sentData.message}`
        )}`
      : "";

  const isHome = variant === "home";

  // Shared Styles & Variants
  const formClass = isHome
    ? "lg:col-span-7 rounded-sm bg-cream/4 backdrop-blur-sm border border-cream/15 p-6 md:p-10"
    : "mt-8 rounded-2xl bg-white border border-border p-6 md:p-10 lg:p-12 shadow-sm";

  const gridClass = isHome
    ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
    : "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 lg:gap-y-5";

  const labelClass = isHome ? "eyebrow text-cream/70" : "eyebrow text-ink-soft";
  
  const inputBaseClass = isHome
    ? "w-full bg-transparent border-b border-cream/25 focus:border-saffron outline-none text-cream placeholder:text-cream/40 transition-colors"
    : "w-full bg-transparent border-b border-ink/20 focus:border-forest-deep outline-none text-foreground placeholder:text-muted-foreground transition-colors";
    
  const inputClass = `${inputBaseClass} ${isHome ? "mt-3 py-3" : "mt-1.5 py-2"}`;
  
  const textareaClass = isHome
    ? "mt-3 w-full bg-transparent border-b border-cream/25 focus:border-saffron outline-none py-3 text-cream placeholder:text-cream/40 resize-none transition-colors"
    : "mt-1.5 w-full bg-transparent border border-ink/20 rounded-xl p-4 focus:border-forest-deep outline-none text-foreground placeholder:text-muted-foreground resize-y transition-colors shadow-sm";

  const errorClass = isHome ? "mt-2 text-xs text-saffron" : "mt-2 text-xs text-crimson";
  const requiredClass = isHome ? "" : " text-crimson";
  const footnoteClass = isHome ? "text-xs text-cream/50 max-w-sm" : "text-xs text-ink-soft max-w-sm";

  // Helpers
  const renderField = ({
    label,
    name,
    type = "text",
    required,
    placeholder,
    error,
    className = "",
    min,
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
    className?: string;
    min?: string;
  }) => {
    const id = `f-${name}-${variant}`;
    const errId = `${id}-error`;
    return (
      <div className={className}>
        <label htmlFor={id} className={labelClass}>
          {label}
          {required && !isHome && <span className={requiredClass}> *</span>}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          min={min}
          className={inputClass}
        />
        {error && (
          <p id={errId} className={errorClass}>
            {error}
          </p>
        )}
      </div>
    );
  };

  const renderSelect = ({
    label,
    name,
    options,
    error,
  }: {
    label: string;
    name: string;
    options: string[];
    error?: string;
  }) => {
    const id = `f-${name}-${variant}`;
    return (
      <div>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <div className={`relative ${isHome ? "mt-3" : "mt-1.5"}`}>
          <select
            id={id}
            name={name}
            defaultValue=""
            className={`${inputBaseClass} ${isHome ? "py-3" : "py-2"} pr-8 appearance-none cursor-pointer`}
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
          <span className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs ${isHome ? "text-cream/70" : "text-ink-soft"}`}>
            ▾
          </span>
        </div>
        {error && <p className={errorClass}>{error}</p>}
      </div>
    );
  };
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Performance booking enquiry"
      className={formClass}
    >
      <div className={gridClass}>
        {renderField({ label: "Your name", name: "name", required: true, error: errors.name })}
        
        {/* Conditional rendering depending on variant exactly as requested */}
        {(!isHome) && renderField({ label: "Email", name: "email", type: "email", required: true, error: errors.email })}
        
        {isHome && renderField({ label: "Organisation (optional)", name: "organization", error: errors.organization })}
        {isHome && renderField({ label: "Email", name: "email", type: "email", required: true, error: errors.email })}
        
        {(!isHome) && renderField({ label: "Phone (optional)", name: "phone", error: errors.phone })}
        {(!isHome) && renderSelect({
          label: "Event type",
          name: "eventType",
          error: errors.eventType,
          options: ["Full production", "Concert set", "Workshop / lecture", "Festival slot", "Private event", "Other"],
        })}

        {renderField({ label: "City / Venue", name: "city", error: errors.city })}

        {/* Preferred Date Field */}
        <div className={isHome ? "md:col-span-2" : ""}>
          <div className="flex items-center justify-between gap-4 mb-2">
            <label className={labelClass}>Preferred date</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs cursor-pointer group">
                <input
                  type="radio"
                  name="dateMode"
                  value="exact"
                  checked={dateMode === "exact"}
                  onChange={() => setDateMode("exact")}
                  className={`cursor-pointer ${isHome ? "accent-saffron" : "accent-forest-deep"}`}
                />
                <span className={`group-hover:opacity-100 transition-opacity ${isHome ? "text-cream/70" : "text-ink-soft"} ${dateMode === "exact" ? "opacity-100 font-medium" : "opacity-70"}`}>Specific</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs cursor-pointer group">
                <input
                  type="radio"
                  name="dateMode"
                  value="custom"
                  checked={dateMode === "custom"}
                  onChange={() => setDateMode("custom")}
                  className={`cursor-pointer ${isHome ? "accent-saffron" : "accent-forest-deep"}`}
                />
                <span className={`group-hover:opacity-100 transition-opacity ${isHome ? "text-cream/70" : "text-ink-soft"} ${dateMode === "custom" ? "opacity-100 font-medium" : "opacity-70"}`}>Custom</span>
              </label>
            </div>
          </div>
          
          {dateMode === "exact" ? (
            <input
              name="dateExact"
              type="date"
              min={today}
              className={inputClass}
            />
          ) : (
            <input
              name="dateCustom"
              type="text"
              placeholder="e.g. Autumn, Diwali, Summer holidays"
              className={inputClass}
            />
          )}
        </div>

        {(!isHome) && renderField({ label: "Organisation (optional)", name: "organization", error: errors.organization })}
        {(!isHome) && renderSelect({
          label: "Audience size",
          name: "audience",
          error: errors.audience,
          options: ["Under 100", "100–300", "300–800", "800+"],
        })}

        {/* Brief Field */}
        <div className="md:col-span-2">
          <label htmlFor={`f-message-${variant}`} className={labelClass}>
            Brief {(!isHome) && <span className={requiredClass}>*</span>}
          </label>
          <textarea
            id={`f-message-${variant}`}
            name="message"
            rows={5}
            required
            placeholder={isHome ? "Tell us about the event, audience, format and any programme ideas." : "Briefly describe your event, requirements, or enquiry..."}
            aria-invalid={errors.message ? true : undefined}
            className={textareaClass}
          />
          {errors.message && (
            <p className={errorClass}>{errors.message}</p>
          )}
        </div>
      </div>

      <div className={`mt-10 flex flex-wrap items-center justify-between gap-4`}>
        <p className={footnoteClass}>
          {isHome ? "By submitting, your email client will open with the enquiry addressed to " : "On submit, your email client opens with the enquiry addressed to "}
          {emailTo}.
        </p>
        
        {isHome ? (
          <button
            type="submit"
            className="inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-3.5 text-sm font-medium text-forest-deep hover:bg-saffron/90 transition-colors shadow-none"
          >
            Send enquiry
            <span aria-hidden>→</span>
          </button>
        ) : (
          <Button type="submit" variant="forest" size="xl">
            Send enquiry <span aria-hidden>→</span>
          </Button>
        )}
      </div>

      {sent && (
        isHome ? (
          <p className="mt-6 text-sm text-saffron">
            Thank you — your email client should now be open. If not, write to{" "}
            <a href={`mailto:${emailTo}`} className="underline">
              {emailTo}
            </a>
            .
          </p>
        ) : (
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-saffron/10 p-5 rounded-xl border border-saffron/20">
            <p className="text-sm text-forest-deep max-w-lg">
              Thank you — your email client should now be open. If not, write to{" "}
              <a href={`mailto:${emailTo}`} className="underline font-medium hover:text-saffron transition-colors">
                {emailTo}
              </a>
              .
            </p>
            {whatsappPhone && (
              <Button asChild variant="saffron" size="lg" className="shrink-0">
                <a href={continueWhatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Continue on WhatsApp
                </a>
              </Button>
            )}
          </div>
        )
      )}
    </form>
  );
}
