"use client";

import {
  createEventAction,
  updateEventAction,
} from "@/app/admin/(dashboard)/events/actions";
import {
  eventFormSchema,
  type EventFormValues,
} from "@/app/admin/(dashboard)/events/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  EVENT_TYPE_LABELS,
  EVENT_TYPE_VALUES,
  POST_STATUS_LABELS,
  POST_STATUS_VALUES,
  slugifyEventTitle,
} from "@/lib/events-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

interface AdminEventFormProps {
  mode: "create" | "edit";
  eventId?: string;
  defaultValues?: Partial<EventFormValues>;
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-forest-deep focus:outline-none transition-colors";
const labelClass = "eyebrow text-ink-soft block mb-1.5";
const errorClass = "mt-1.5 text-xs text-crimson";

export function AdminEventForm({
  mode,
  eventId,
  defaultValues,
}: AdminEventFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      slugManuallyEdited: defaultValues?.slugManuallyEdited ?? mode === "edit",
      description: defaultValues?.description ?? "",
      eventType: defaultValues?.eventType ?? "PERFORMANCE",
      startDate: defaultValues?.startDate ?? "",
      endDate: defaultValues?.endDate ?? "",
      venueName: defaultValues?.venueName ?? "",
      address: defaultValues?.address ?? "",
      city: defaultValues?.city ?? "",
      country: defaultValues?.country ?? "Germany",
      bookingRequired: defaultValues?.bookingRequired ?? false,
      status: defaultValues?.status ?? "DRAFT",
    },
  });

  const watchedDescription = useWatch({ control, name: "description" }) ?? "";
  const watchedSlugManual = useWatch({ control, name: "slugManuallyEdited" });

  const titleRegistration = register("title");
  const slugRegistration = register("slug");

  async function onSubmit(values: EventFormValues) {
    setServerError(null);
    try {
      const result =
        mode === "create"
          ? await createEventAction(values)
          : await updateEventAction(eventId!, values);

      if (result.success) {
        const flag = mode === "create" ? "created" : "updated";
        router.push(`/admin/events?saved=${flag}`);
        router.refresh();
        return;
      }

      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (message) {
            setError(field as keyof EventFormValues, {
              type: "server",
              message,
            });
          }
        }
      }
      setServerError(result.error);
    } catch {
      setServerError("Something went wrong while saving. Please try again.");
    }
  }

  function handleRegenerateSlug() {
    const currentTitle = getValues("title");
    const generated = slugifyEventTitle(currentTitle);
    setValue("slug", generated, { shouldValidate: true, shouldDirty: true });
    setValue("slugManuallyEdited", false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-8"
    >
      {serverError && (
        <div
          role="alert"
          className="rounded-md border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm text-crimson"
        >
          {serverError}
        </div>
      )}

      {/* Core details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="event-title" className={labelClass}>
            Title <span className="text-crimson">*</span>
          </label>
          <input
            id="event-title"
            type="text"
            placeholder="e.g. Diwali Yakshagana — Bonn"
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={errors.title ? "event-title-error" : undefined}
            className={inputClass}
            {...titleRegistration}
            onChange={(e) => {
              titleRegistration.onChange(e);
              if (!getValues("slugManuallyEdited")) {
                setValue("slug", slugifyEventTitle(e.target.value), {
                  shouldDirty: true,
                });
              }
            }}
          />
          {errors.title && (
            <p id="event-title-error" className={errorClass}>
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <label htmlFor="event-slug" className="eyebrow text-ink-soft">
              Slug <span className="text-crimson">*</span>
            </label>
            {watchedSlugManual && (
              <button
                type="button"
                onClick={handleRegenerateSlug}
                className="inline-flex items-center gap-1 text-xs text-ink-soft hover:text-forest-deep transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                Generate from title
              </button>
            )}
          </div>
          <input
            id="event-slug"
            type="text"
            placeholder="diwali-yakshagana-bonn"
            aria-invalid={errors.slug ? true : undefined}
            aria-describedby={
              errors.slug ? "event-slug-error" : "event-slug-hint"
            }
            className={`${inputClass} font-mono`}
            {...slugRegistration}
            onChange={(e) => {
              slugRegistration.onChange(e);
              setValue("slugManuallyEdited", true);
            }}
          />
          <p id="event-slug-hint" className="mt-1.5 text-xs text-ink-soft">
            Public URL path:{" "}
            <span className="font-mono">/events/…</span> (lowercase letters,
            numbers, and hyphens).
          </p>
          {errors.slug && (
            <p id="event-slug-error" className={errorClass}>
              {errors.slug.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <label htmlFor="event-description" className="eyebrow text-ink-soft">
              Description <span className="text-crimson">*</span>
            </label>
            <span
              className={`font-mono text-xs tabular-nums ${
                watchedDescription.length > 5000
                  ? "text-crimson"
                  : "text-ink-soft"
              }`}
            >
              {watchedDescription.length} / 5000
            </span>
          </div>
          <textarea
            id="event-description"
            rows={5}
            maxLength={5000}
            placeholder="Describe the performance, prasanga, schedule, or workshop details…"
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={
              errors.description ? "event-description-error" : undefined
            }
            className={`${inputClass} resize-y`}
            {...register("description")}
          />
          {errors.description && (
            <p id="event-description-error" className={errorClass}>
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="event-type" className={labelClass}>
            Event type <span className="text-crimson">*</span>
          </label>
          <Controller
            control={control}
            name="eventType"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <SelectTrigger
                  id="event-type"
                  className="w-full h-10 bg-background px-3.5 text-sm"
                  aria-invalid={errors.eventType ? true : undefined}
                >
                  <SelectValue>
                    {EVENT_TYPE_LABELS[field.value]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPE_VALUES.map((typeValue) => (
                    <SelectItem key={typeValue} value={typeValue}>
                      {EVENT_TYPE_LABELS[typeValue]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.eventType && (
            <p className={errorClass}>{errors.eventType.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="event-status" className={labelClass}>
            Status <span className="text-crimson">*</span>
          </label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <SelectTrigger
                  id="event-status"
                  className="w-full h-10 bg-background px-3.5 text-sm"
                  aria-invalid={errors.status ? true : undefined}
                >
                  <SelectValue>{POST_STATUS_LABELS[field.value]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {POST_STATUS_VALUES.map((statusValue) => (
                    <SelectItem key={statusValue} value={statusValue}>
                      {POST_STATUS_LABELS[statusValue]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className={errorClass}>{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Date & time */}
      <div className="border-t border-border pt-6">
        <h3 className="font-serif text-xl text-forest-deep mb-4">
          Date &amp; time{" "}
          <span className="font-sans text-xs font-normal text-ink-soft">
            (Europe/Berlin)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="event-start-date" className={labelClass}>
              Start date &amp; time <span className="text-crimson">*</span>
            </label>
            <input
              id="event-start-date"
              type="datetime-local"
              aria-invalid={errors.startDate ? true : undefined}
              aria-describedby={
                errors.startDate ? "event-start-date-error" : undefined
              }
              className={inputClass}
              {...register("startDate")}
            />
            {errors.startDate && (
              <p id="event-start-date-error" className={errorClass}>
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="event-end-date" className={labelClass}>
              End date &amp; time (optional)
            </label>
            <input
              id="event-end-date"
              type="datetime-local"
              aria-invalid={errors.endDate ? true : undefined}
              aria-describedby={
                errors.endDate ? "event-end-date-error" : undefined
              }
              className={inputClass}
              {...register("endDate")}
            />
            {errors.endDate && (
              <p id="event-end-date-error" className={errorClass}>
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="border-t border-border pt-6">
        <h3 className="font-serif text-xl text-forest-deep mb-4">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="event-venue" className={labelClass}>
              Venue name
            </label>
            <input
              id="event-venue"
              type="text"
              placeholder="e.g. Kulturzentrum Bonn"
              className={inputClass}
              {...register("venueName")}
            />
            {errors.venueName && (
              <p className={errorClass}>{errors.venueName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="event-address" className={labelClass}>
              Address
            </label>
            <input
              id="event-address"
              type="text"
              placeholder="Street and house number"
              className={inputClass}
              {...register("address")}
            />
            {errors.address && (
              <p className={errorClass}>{errors.address.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="event-city" className={labelClass}>
              City
            </label>
            <input
              id="event-city"
              type="text"
              placeholder="e.g. Bonn, Munich, Berlin"
              className={inputClass}
              {...register("city")}
            />
            {errors.city && (
              <p className={errorClass}>{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="event-country" className={labelClass}>
              Country <span className="text-crimson">*</span>
            </label>
            <input
              id="event-country"
              type="text"
              placeholder="Germany"
              className={inputClass}
              {...register("country")}
            />
            {errors.country && (
              <p className={errorClass}>{errors.country.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Booking toggle */}
      <div className="border-t border-border pt-6 flex items-center justify-between gap-4">
        <div>
          <label
            htmlFor="event-booking-required"
            className="text-sm font-medium text-foreground block"
          >
            Booking required
          </label>
          <p className="text-xs text-ink-soft mt-0.5">
            Indicate whether attendees need to reserve seats or register in
            advance.
          </p>
        </div>
        <Controller
          control={control}
          name="bookingRequired"
          render={({ field }) => (
            <Switch
              id="event-booking-required"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          )}
        />
      </div>

      {/* Actions */}
      <div className="border-t border-border pt-6 flex flex-wrap items-center justify-end gap-3">
        <Button asChild type="button" variant="outline" disabled={isSubmitting}>
          <Link href="/admin/events">Cancel</Link>
        </Button>
        <Button type="submit" variant="forest" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {mode === "create" ? "Creating…" : "Saving…"}
            </>
          ) : mode === "create" ? (
            "Create event"
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </form>
  );
}
