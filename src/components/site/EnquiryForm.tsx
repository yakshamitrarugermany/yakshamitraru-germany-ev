"use client";

import { submitInquiryAction } from "@/app/contact/actions";
import {
  AUDIENCE_SIZES,
  BOOKING_EVENT_TYPES,
  inquiryFormSchema,
  type InquiryFormValues,
} from "@/app/contact/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_PHONE_COUNTRY,
  detectInternationalCountry,
  getPhoneCountryOptions,
} from "@/lib/phone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircle, X } from "lucide-react";
import { useMemo, useState, type InputHTMLAttributes } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

export interface LinkedEventPreview {
  slug: string;
  title: string;
}

type EnquiryFormProps = {
  variant: "home" | "contact";
  emailTo: string;
  whatsappPhone?: string;
  linkedEvent?: LinkedEventPreview | null;
};

export function EnquiryForm({
  variant,
  emailTo,
  whatsappPhone,
  linkedEvent = null,
}: EnquiryFormProps) {
  const [sent, setSent] = useState(false);
  const [sentData, setSentData] = useState<Pick<
    InquiryFormValues,
    "name" | "message"
  > | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [activeEvent, setActiveEvent] = useState<LinkedEventPreview | null>(
    linkedEvent,
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      phoneCountry: DEFAULT_PHONE_COUNTRY,
      phone: "",
      city: "",
      requestedEventType: "",
      dateMode: "exact",
      dateExact: "",
      dateCustom: "",
      expectedAudience: "",
      message: "",
      consentGiven: false,
      eventSlug: linkedEvent?.slug ?? "",
      website: "",
    },
  });

  const dateMode = useWatch({ control, name: "dateMode" }) ?? "exact";
  const countryOptions = useMemo(() => getPhoneCountryOptions("en"), []);
  const countryOptionByCode = useMemo(
    () => new Map(countryOptions.map((c) => [c.code, c])),
    [countryOptions],
  );
  const phoneRegistration = register("phone");

  async function onSubmit(values: InquiryFormValues) {
    setServerError(null);
    setSent(false);

    try {
      const result = await submitInquiryAction({
        ...values,
        eventSlug: activeEvent?.slug ?? "",
      });

      if (result.success) {
        setSentData({ name: values.name, message: values.message });
        setSent(true);
        reset({
          name: "",
          organization: "",
          email: "",
          phoneCountry: DEFAULT_PHONE_COUNTRY,
          phone: "",
          city: "",
          requestedEventType: "",
          dateMode: "exact",
          dateExact: "",
          dateCustom: "",
          expectedAudience: "",
          message: "",
          consentGiven: false,
          eventSlug: activeEvent?.slug ?? "",
          website: "",
        });
        return;
      }

      if (result.fieldErrors) {
        for (const [field, msg] of Object.entries(result.fieldErrors)) {
          if (msg) {
            setError(field as keyof InquiryFormValues, {
              type: "server",
              message: msg,
            });
          }
        }
      }
      setServerError(result.error);
    } catch {
      setServerError(
        "We could not submit your enquiry right now. Please check your connection and try again.",
      );
    }
  }

  const continueWhatsappHref =
    sentData && whatsappPhone
      ? `https://wa.me/${whatsappPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
          `Hello Yakshamitraru Germany,\n\nI just sent an enquiry on your website.\n\nName: ${sentData.name}\nMessage: ${sentData.message}`,
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

  const errorClass = isHome
    ? "mt-2 text-xs text-saffron"
    : "mt-2 text-xs text-crimson";
  const requiredClass = isHome ? " text-saffron" : " text-crimson";
  const footnoteClass = isHome
    ? "text-xs text-cream/50 max-w-sm"
    : "text-xs text-ink-soft max-w-sm";

  const today = new Date().toISOString().split("T")[0];

  const renderField = ({
    label,
    name,
    type = "text",
    required,
    placeholder,
    error,
    className = "",
    min,
    autoComplete,
    inputMode,
  }: {
    label: string;
    name:
      | "name"
      | "email"
      | "phone"
      | "city"
      | "organization"
      | "dateExact"
      | "dateCustom";
    type?: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
    className?: string;
    min?: string;
    autoComplete?: string;
    inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  }) => {
    const id = `f-${name}-${variant}`;
    const errId = `${id}-error`;
    return (
      <div className={className}>
        <label htmlFor={id} className={labelClass}>
          {label}
          {required && <span className={requiredClass}> *</span>}
        </label>
        <input
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          min={min}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={inputClass}
          {...register(name)}
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
    name: "requestedEventType" | "expectedAudience";
    options: readonly string[];
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
            className={`${inputBaseClass} ${isHome ? "py-3" : "py-2"} pr-8 appearance-none cursor-pointer`}
            {...register(name)}
          >
            <option value="" className={isHome ? "text-ink" : undefined}>
              Select…
            </option>
            {options.map((o) => (
              <option
                key={o}
                value={o}
                className={isHome ? "text-ink" : undefined}
              >
                {o}
              </option>
            ))}
          </select>
          <span
            className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs ${isHome ? "text-cream/70" : "text-ink-soft"}`}
          >
            ▾
          </span>
        </div>
        {error && <p className={errorClass}>{error}</p>}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Performance booking enquiry"
      className={formClass}
    >
      {/* Hidden honeypot field */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0 pointer-events-none"
      >
        <label htmlFor={`f-website-${variant}`}>Website</label>
        <input
          id={`f-website-${variant}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {/* Linked event banner when arriving via ?event=<slug> */}
      {activeEvent && (
        <div
          className={`mb-6 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${
            isHome
              ? "border-saffron/30 bg-saffron/10 text-cream"
              : "border-forest-deep/15 bg-secondary/50 text-forest-deep"
          }`}
        >
          <span>
            Regarding event:{" "}
            <strong className="font-medium">{activeEvent.title}</strong>
          </span>
          <button
            type="button"
            onClick={() => {
              setActiveEvent(null);
              setValue("eventSlug", "");
            }}
            aria-label="Remove linked event"
            className="p-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className={gridClass}>
        {renderField({
          label: "Your name",
          name: "name",
          required: true,
          error: errors.name?.message,
        })}

        {renderField({
          label: "Email",
          name: "email",
          type: "email",
          required: true,
          error: errors.email?.message,
        })}

        {/* Phone field with country code selector */}
        <div>
          <label htmlFor={`f-phone-${variant}`} className={labelClass}>
            Phone
            <span className={requiredClass}> *</span>
          </label>
          <div className={`flex items-end gap-3 ${isHome ? "mt-3" : "mt-1.5"}`}>
            <Controller
              control={control}
              name="phoneCountry"
              render={({ field }) => {
                const selectedOption =
                  countryOptionByCode.get(
                    (field.value ?? DEFAULT_PHONE_COUNTRY) as typeof DEFAULT_PHONE_COUNTRY,
                  ) ?? countryOptionByCode.get(DEFAULT_PHONE_COUNTRY);
                return (
                  <Select
                    value={field.value ?? DEFAULT_PHONE_COUNTRY}
                    onValueChange={(value) => {
                      if (value) field.onChange(value);
                    }}
                  >
                    <SelectTrigger
                      aria-label="Country code"
                      className={`shrink-0 w-auto rounded-none border-0 border-b bg-transparent px-0 shadow-none focus-visible:ring-0 data-[size=default]:h-auto ${
                        isHome
                          ? "border-cream/25 py-3 text-base text-cream focus-visible:border-saffron [&_svg]:text-cream/70"
                          : "border-ink/20 py-2 text-base text-foreground focus-visible:border-forest-deep [&_svg]:text-ink-soft"
                      }`}
                    >
                      <SelectValue>
                        {selectedOption?.shortLabel ?? "DE +49"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="w-64 max-h-72">
                      {countryOptions.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <input
              id={`f-phone-${variant}`}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={
                errors.phone ? `f-phone-${variant}-error` : undefined
              }
              className={`${inputBaseClass} min-w-0 flex-1 ${isHome ? "py-3" : "py-2"}`}
              {...phoneRegistration}
              onChange={(e) => {
                phoneRegistration.onChange(e);
                const detected = detectInternationalCountry(e.target.value);
                if (detected) {
                  setValue("phoneCountry", detected, { shouldDirty: true });
                }
              }}
            />
          </div>
          {errors.phone && (
            <p id={`f-phone-${variant}-error`} className={errorClass}>
              {errors.phone.message}
            </p>
          )}
        </div>

        {renderSelect({
          label: "Event type",
          name: "requestedEventType",
          error: errors.requestedEventType?.message,
          options: BOOKING_EVENT_TYPES,
        })}

        {renderField({
          label: "City / Venue",
          name: "city",
          error: errors.city?.message,
        })}

        {/* Preferred Date Field */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <label className={labelClass}>Preferred date</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs cursor-pointer group">
                <input
                  type="radio"
                  value="exact"
                  checked={dateMode === "exact"}
                  onChange={() => setValue("dateMode", "exact")}
                  className={`cursor-pointer ${isHome ? "accent-saffron" : "accent-forest-deep"}`}
                />
                <span
                  className={`group-hover:opacity-100 transition-opacity ${isHome ? "text-cream/70" : "text-ink-soft"} ${dateMode === "exact" ? "opacity-100 font-medium" : "opacity-70"}`}
                >
                  Specific
                </span>
              </label>
              <label className="flex items-center gap-1.5 text-xs cursor-pointer group">
                <input
                  type="radio"
                  value="custom"
                  checked={dateMode === "custom"}
                  onChange={() => setValue("dateMode", "custom")}
                  className={`cursor-pointer ${isHome ? "accent-saffron" : "accent-forest-deep"}`}
                />
                <span
                  className={`group-hover:opacity-100 transition-opacity ${isHome ? "text-cream/70" : "text-ink-soft"} ${dateMode === "custom" ? "opacity-100 font-medium" : "opacity-70"}`}
                >
                  Custom
                </span>
              </label>
            </div>
          </div>

          {dateMode === "exact" ? (
            <input
              id={`f-dateExact-${variant}`}
              type="date"
              min={today}
              className={inputClass}
              {...register("dateExact")}
            />
          ) : (
            <input
              id={`f-dateCustom-${variant}`}
              type="text"
              placeholder="e.g. Autumn, Diwali, Summer holidays"
              className={inputClass}
              {...register("dateCustom")}
            />
          )}
        </div>

        {renderField({
          label: "Organisation (optional)",
          name: "organization",
          error: errors.organization?.message,
        })}

        {renderSelect({
          label: "Audience size",
          name: "expectedAudience",
          error: errors.expectedAudience?.message,
          options: AUDIENCE_SIZES,
        })}

        {/* Brief Field */}
        <div className="md:col-span-2">
          <label htmlFor={`f-message-${variant}`} className={labelClass}>
            Brief <span className={requiredClass}>*</span>
          </label>
          <textarea
            id={`f-message-${variant}`}
            rows={5}
            required
            placeholder="Briefly describe your event, requirements, or enquiry..."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? `f-message-${variant}-error` : undefined
            }
            className={textareaClass}
            {...register("message")}
          />
          {errors.message && (
            <p id={`f-message-${variant}-error`} className={errorClass}>
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Consent checkbox */}
        <div className="md:col-span-2 pt-1">
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input
              id={`f-consent-${variant}`}
              type="checkbox"
              aria-invalid={errors.consentGiven ? true : undefined}
              aria-describedby={
                errors.consentGiven ? `f-consent-${variant}-error` : undefined
              }
              className={`mt-1 h-4 w-4 shrink-0 cursor-pointer ${
                isHome ? "accent-saffron" : "accent-forest-deep"
              }`}
              {...register("consentGiven")}
            />
            <span
              className={`leading-relaxed ${
                isHome ? "text-cream/75" : "text-ink-soft"
              }`}
            >
              I agree that Yakshamitraru Germany e.V. may use my submitted
              details to respond to this enquiry.
              <span className={requiredClass}> *</span>
            </span>
          </label>
          {errors.consentGiven && (
            <p id={`f-consent-${variant}-error`} className={errorClass}>
              {errors.consentGiven.message}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            isHome
              ? "border-saffron/40 bg-saffron/10 text-saffron"
              : "border-crimson/30 bg-crimson/5 text-crimson"
          }`}
        >
          {serverError}
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className={footnoteClass}>
          Your details are used only to respond to your enquiry. You can also
          email us directly at {emailTo}.
        </p>

        {isHome ? (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-3.5 text-sm font-medium text-forest-deep hover:bg-saffron/90 transition-colors shadow-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send enquiry
                <span aria-hidden>→</span>
              </>
            )}
          </button>
        ) : (
          <Button
            type="submit"
            variant="forest"
            size="xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send enquiry <span aria-hidden>→</span>
              </>
            )}
          </Button>
        )}
      </div>

      {sent &&
        (isHome ? (
          <p
            role="status"
            aria-live="polite"
            className="mt-6 text-sm text-saffron"
          >
            Thank you — your enquiry has been received. We will reply as soon as
            possible. You can also write to{" "}
            <a href={`mailto:${emailTo}`} className="underline">
              {emailTo}
            </a>
            .
          </p>
        ) : (
          <div
            role="status"
            aria-live="polite"
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-saffron/10 p-5 rounded-xl border border-saffron/20"
          >
            <p className="text-sm text-forest-deep max-w-lg">
              Thank you — your enquiry has been received and a confirmation has
              been sent to your email. We will reply as soon as possible.
            </p>
            {whatsappPhone && (
              <Button asChild variant="saffron" size="lg" className="shrink-0">
                <a
                  href={continueWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Continue on WhatsApp
                </a>
              </Button>
            )}
          </div>
        ))}
    </form>
  );
}
