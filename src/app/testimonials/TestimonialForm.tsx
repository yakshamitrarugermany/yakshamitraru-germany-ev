"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { submitTestimonialAction } from "./actions";
import {
  TESTIMONIAL_ROLES,
  testimonialFormSchema,
  type TestimonialFormInput,
} from "./schema";

export const THANK_YOU_MESSAGE =
  "Thank you for sharing your experience. We read every review, and it will appear on this page once our team has approved it.";

export function TestimonialForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormInput>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      event: "",
      city: "",
      text: "",
      consentGiven: false,
      website: "",
    },
  });

  const watchedText = useWatch({
    control,
    name: "text",
    defaultValue: "",
  });
  const watchedRole = useWatch({
    control,
    name: "role",
    defaultValue: "",
  });
  const charCount = (watchedText ?? "").length;

  async function onSubmit(values: TestimonialFormInput) {
    setServerError(null);
    try {
      const result = await submitTestimonialAction(values);
      if (result.success) {
        setSubmitted(true);
        return;
      }

      if (result.fieldErrors) {
        for (const [field, msg] of Object.entries(result.fieldErrors)) {
          if (msg) {
            setError(field as keyof TestimonialFormInput, {
              type: "server",
              message: msg,
            });
          }
        }
      }
      setServerError(result.error);
    } catch {
      setServerError(
        "We could not submit your review right now. Please check your connection and try again.",
      );
    }
  }

  const labelClass = "eyebrow text-ink-soft";
  const inputBaseClass =
    "w-full bg-transparent border-b border-ink/20 focus:border-forest-deep outline-none text-foreground placeholder:text-muted-foreground transition-colors";
  const inputClass = `${inputBaseClass} mt-1.5 py-2`;
  const textareaClass =
    "mt-1.5 w-full bg-transparent border border-ink/20 rounded-xl p-4 focus:border-forest-deep outline-none text-foreground placeholder:text-muted-foreground resize-y transition-colors shadow-sm";
  const errorClass = "mt-2 text-xs text-crimson";

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-8 rounded-2xl bg-white border border-border p-8 md:p-10 lg:p-12 shadow-sm flex flex-col items-start gap-4"
      >
        <div className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-saffron/15 text-[#7A1F2B]">
          <CheckCircle2 className="h-6 w-6 text-[#B8863B]" />
        </div>
        <p className="font-serif text-xl md:text-2xl text-forest-deep leading-snug">
          {THANK_YOU_MESSAGE}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Share your experience review form"
      className="mt-8 rounded-2xl bg-white border border-border p-6 md:p-10 lg:p-12 shadow-sm [&_input::placeholder]:text-muted-foreground/70 [&_textarea::placeholder]:text-muted-foreground/70"
    >
      {/* Hidden honeypot field */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0 pointer-events-none"
      >
        <label htmlFor="t-website">Website</label>
        <input
          id="t-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {/* Name */}
        <div>
          <label htmlFor="t-name" className={labelClass}>
            Your name <span className="text-crimson">*</span>
          </label>
          <input
            id="t-name"
            type="text"
            required
            placeholder="Your full name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "t-name-error" : "t-name-hint"}
            className={inputClass}
            {...register("name")}
          />
          <p id="t-name-hint" className="mt-1.5 text-xs text-ink-soft">
            Your name will be shown with your review.
          </p>
          {errors.name && (
            <p id="t-name-error" className={errorClass}>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <label htmlFor="t-email" className={labelClass}>
              Email <span className="text-crimson">*</span>
            </label>
            <span className="text-[11px] text-ink-soft italic">
              not published
            </span>
          </div>
          <input
            id="t-email"
            type="email"
            required
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "t-email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <p id="t-email-error" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Role, Event or venue, City */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
          {/* Role: I was a... */}
          <div>
            <label htmlFor="t-role" className={labelClass}>
              I was a… <span className="text-crimson">*</span>
            </label>
            <div className="relative mt-1.5">
              <select
                id="t-role"
                required
                aria-invalid={errors.role ? true : undefined}
                aria-describedby={errors.role ? "t-role-error" : undefined}
                className={`${inputBaseClass} py-2 pr-8 appearance-none cursor-pointer ${
                  !watchedRole ? "text-muted-foreground/70" : ""
                }`}
                {...register("role")}
              >
                <option value="">Select…</option>
                {TESTIMONIAL_ROLES.map((r) => (
                  <option key={r} value={r} className="text-foreground">
                    {r}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-ink-soft">
                ▾
              </span>
            </div>
            {errors.role && (
              <p id="t-role-error" className={errorClass}>
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Event or venue */}
          <div>
            <label htmlFor="t-event" className={labelClass}>
              Event or venue <span className="text-crimson">*</span>
            </label>
            <input
              id="t-event"
              type="text"
              required
              placeholder="e.g. Yaksha Sankranthi, Diwali Bonn"
              aria-invalid={errors.event ? true : undefined}
              aria-describedby={errors.event ? "t-event-error" : undefined}
              className={inputClass}
              {...register("event")}
            />
            {errors.event && (
              <p id="t-event-error" className={errorClass}>
                {errors.event.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="t-city" className={labelClass}>
              City <span className="text-crimson">*</span>
            </label>
            <input
              id="t-city"
              type="text"
              required
              placeholder="e.g. Frankfurt, Munich, Berlin"
              aria-invalid={errors.city ? true : undefined}
              aria-describedby={errors.city ? "t-city-error" : undefined}
              className={inputClass}
              {...register("city")}
            />
            {errors.city && (
              <p id="t-city-error" className={errorClass}>
                {errors.city.message}
              </p>
            )}
          </div>
        </div>

        {/* Review text */}
        <div className="md:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="t-text" className={labelClass}>
              Your review <span className="text-crimson">*</span>
            </label>
            <span
              className={`font-mono text-xs tabular-nums ${
                charCount > 1500
                  ? "text-crimson"
                  : charCount >= 30
                    ? "text-forest"
                    : "text-ink-soft"
              }`}
            >
              {charCount} / 1500{" "}
              <span className="text-[11px] font-sans">(min 30)</span>
            </span>
          </div>
          <textarea
            id="t-text"
            rows={5}
            maxLength={1500}
            required
            placeholder="Share your reflections on the performance, music, storytelling, or hosting experience…"
            aria-invalid={errors.text ? true : undefined}
            aria-describedby={errors.text ? "t-text-error" : undefined}
            className={textareaClass}
            {...register("text")}
          />
          {errors.text && (
            <p id="t-text-error" className={errorClass}>
              {errors.text.message}
            </p>
          )}
        </div>

        {/* Consent checkbox */}
        <div className="md:col-span-2 pt-1">
          <label className="flex items-start gap-3 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-forest-deep"
              aria-invalid={errors.consentGiven ? true : undefined}
              aria-describedby={
                errors.consentGiven ? "t-consent-error" : undefined
              }
              {...register("consentGiven")}
            />
            <span className="leading-relaxed text-ink-soft">
              I agree that my review, together with my name, role, event and
              city, may be published on this website.{" "}
              <span className="text-crimson">*</span>
            </span>
          </label>
          {errors.consentGiven && (
            <p id="t-consent-error" className={errorClass}>
              {errors.consentGiven.message}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm text-crimson"
        >
          {serverError}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink-soft max-w-md">
          Your email address is never shown publicly. Reviews appear after
          approval by the Yakshamitraru Germany team.
        </p>

        <Button
          type="submit"
          variant="forest"
          size="xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              Submit review <span aria-hidden="true">→</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
