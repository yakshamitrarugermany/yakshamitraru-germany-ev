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
import { showAdminErrorToast } from "@/lib/admin-toast";
import {
  EVENT_TYPE_LABELS,
  EVENT_TYPE_VALUES,
  getBerlinTodayDateString,
  MAX_EVENT_ARTIST_NAME_LENGTH,
  MAX_EVENT_ARTISTS,
  parseCalendarDateToUtcDate,
  POST_STATUS_LABELS,
  POST_STATUS_VALUES,
  slugifyEventTitle,
} from "@/lib/events-utils";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type KeyboardEvent } from "react";
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
const helperClass = "mt-1.5 text-xs text-ink-soft";

const SITE_URL_PREFIX = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(
  /\/+$/,
  "",
);

export function AdminEventForm({
  mode,
  eventId,
  defaultValues,
}: AdminEventFormProps) {
  const router = useRouter();
  const [artistDraft, setArtistDraft] = useState("");
  const [artistInputError, setArtistInputError] = useState<string | null>(null);

  const berlinTodayStr = useMemo(() => getBerlinTodayDateString(), []);

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
      yakshaganaTitle: defaultValues?.yakshaganaTitle ?? "",
      organisedBy: defaultValues?.organisedBy ?? "",
      artists: defaultValues?.artists ?? [],
      slug: defaultValues?.slug ?? "",
      slugManuallyEdited: defaultValues?.slugManuallyEdited ?? mode === "edit",
      description: defaultValues?.description ?? "",
      eventType: defaultValues?.eventType ?? "PERFORMANCE",
      startDate: defaultValues?.startDate ?? "",
      venueName: defaultValues?.venueName ?? "",
      address: defaultValues?.address ?? "",
      city: defaultValues?.city ?? "",
      country: defaultValues?.country ?? "Germany",
      bookingRequired: defaultValues?.bookingRequired ?? false,
      status: defaultValues?.status ?? "DRAFT",
    },
  });

  const watchedDescription = useWatch({ control, name: "description" }) ?? "";
  const watchedSlug = useWatch({ control, name: "slug" }) ?? "";
  const watchedSlugManual = useWatch({ control, name: "slugManuallyEdited" });
  const watchedStartDate = useWatch({ control, name: "startDate" }) ?? "";
  const watchedArtists = useWatch({ control, name: "artists" }) ?? [];

  const titleRegistration = register("title");
  const slugRegistration = register("slug");

  const startDatePlacement = useMemo<"upcoming" | "past" | null>(() => {
    if (!watchedStartDate || !parseCalendarDateToUtcDate(watchedStartDate)) {
      return null;
    }
    return watchedStartDate >= berlinTodayStr ? "upcoming" : "past";
  }, [watchedStartDate, berlinTodayStr]);

  const pageLinkPreview = `${SITE_URL_PREFIX ? SITE_URL_PREFIX : ""}/events/${
    watchedSlug.trim() || "<page-link>"
  }`;

  function addArtistsFromRaw(raw: string) {
    setArtistInputError(null);
    const current = getValues("artists") ?? [];
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (parts.length === 0) return;

    const existingKeys = new Set(current.map((a) => a.toLowerCase()));
    const next = [...current];

    for (const name of parts) {
      if (name.length > MAX_EVENT_ARTIST_NAME_LENGTH) {
        setArtistInputError(
          `Each artist name must be at most ${MAX_EVENT_ARTIST_NAME_LENGTH} characters.`,
        );
        return;
      }
      if (next.length >= MAX_EVENT_ARTISTS) {
        setArtistInputError(`You can add at most ${MAX_EVENT_ARTISTS} artists.`);
        break;
      }
      const key = name.toLowerCase();
      if (existingKeys.has(key)) {
        continue;
      }
      existingKeys.add(key);
      next.push(name);
    }

    setValue("artists", next, { shouldDirty: true, shouldValidate: true });
    setArtistDraft("");
  }

  function removeArtistAt(index: number) {
    setArtistInputError(null);
    const current = getValues("artists") ?? [];
    const next = current.filter((_, i) => i !== index);
    setValue("artists", next, { shouldDirty: true, shouldValidate: true });
  }

  function handleArtistKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (artistDraft.trim()) {
        addArtistsFromRaw(artistDraft);
      }
    } else if (
      e.key === "Backspace" &&
      artistDraft === "" &&
      watchedArtists.length > 0
    ) {
      removeArtistAt(watchedArtists.length - 1);
    }
  }

  async function onSubmit(values: EventFormValues) {
    // If user typed an artist name and immediately clicked Submit without Enter/comma
    let submitValues = values;
    if (artistDraft.trim()) {
      const trimmedDraft = artistDraft.trim();
      if (trimmedDraft.length > MAX_EVENT_ARTIST_NAME_LENGTH) {
        setArtistInputError(
          `Each artist name must be at most ${MAX_EVENT_ARTIST_NAME_LENGTH} characters.`,
        );
        return;
      }
      const current = values.artists ?? [];
      const exists = current.some(
        (a) => a.toLowerCase() === trimmedDraft.toLowerCase(),
      );
      if (!exists && current.length < MAX_EVENT_ARTISTS) {
        const merged = [...current, trimmedDraft];
        setValue("artists", merged, { shouldDirty: true });
        submitValues = { ...values, artists: merged };
      }
      setArtistDraft("");
    }

    try {
      const result =
        mode === "create"
          ? await createEventAction(submitValues)
          : await updateEventAction(eventId!, submitValues);

      if (result.success) {
        const flag = mode === "create" ? "created" : "updated";
        router.push(`/admin/events?saved=${flag}`);
        router.refresh();
        return;
      }

      let hasFieldErrors = false;
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (message) {
            hasFieldErrors = true;
            setError(field as keyof EventFormValues, {
              type: "server",
              message,
            });
          }
        }
      }

      if (!hasFieldErrors) {
        showAdminErrorToast(result.error, "admin-event-save-error");
      }
    } catch {
      showAdminErrorToast(
        "Something went wrong while saving. Please try again.",
        "admin-event-save-error",
      );
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
      {/* Core details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="event-title" className={labelClass}>
            Event name <span className="text-crimson">*</span>
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

        <div>
          <label htmlFor="event-yakshagana-title" className={labelClass}>
            Yakshagana title
          </label>
          <input
            id="event-yakshagana-title"
            type="text"
            placeholder="e.g. Vali Vadhe, Bhishma Vijaya"
            aria-invalid={errors.yakshaganaTitle ? true : undefined}
            aria-describedby="event-yakshagana-title-hint"
            className={inputClass}
            {...register("yakshaganaTitle")}
          />
          <p id="event-yakshagana-title-hint" className={helperClass}>
            Name of the Yakshagana play, if there is one
          </p>
          {errors.yakshaganaTitle && (
            <p className={errorClass}>{errors.yakshaganaTitle.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="event-organised-by" className={labelClass}>
            Organised by
          </label>
          <input
            id="event-organised-by"
            type="text"
            placeholder="e.g. Denmark Kannada Koota"
            aria-invalid={errors.organisedBy ? true : undefined}
            className={inputClass}
            {...register("organisedBy")}
          />
          {errors.organisedBy && (
            <p className={errorClass}>{errors.organisedBy.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <label htmlFor="event-slug" className="eyebrow text-ink-soft">
              Page link <span className="text-crimson">*</span>
            </label>
            {watchedSlugManual && (
              <button
                type="button"
                onClick={handleRegenerateSlug}
                className="inline-flex items-center gap-1 text-xs text-ink-soft hover:text-forest-deep transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                Generate from event name
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
          <p id="event-slug-hint" className={helperClass}>
            Preview:{" "}
            <span className="font-mono text-foreground">{pageLinkPreview}</span>
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
            placeholder="Describe the performance, prasanga, programme, or workshop details…"
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
          <p className={helperClass}>
            Only Published events appear on the website
          </p>
          {errors.status && (
            <p className={errorClass}>{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Event date */}
      <div className="border-t border-border pt-6">
        <h3 className="font-serif text-xl text-forest-deep mb-4">Event date</h3>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="event-start-date" className={labelClass}>
              Date <span className="text-crimson">*</span>
            </label>
            <input
              id="event-start-date"
              type="date"
              required
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

          {startDatePlacement && (
            <div className="sm:pb-2">
              <span
                role="status"
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                  startDatePlacement === "upcoming"
                    ? "border-forest-deep/20 bg-forest-deep/10 text-forest-deep"
                    : "border-border bg-muted text-ink-soft",
                )}
              >
                {startDatePlacement === "upcoming"
                  ? "Will appear under Upcoming"
                  : "Will appear under Past"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Artists who performed */}
      <div className="border-t border-border pt-6">
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <label htmlFor="event-artists-input" className="eyebrow text-ink-soft">
            Artists who performed
          </label>
          <span className="font-mono text-xs tabular-nums text-ink-soft">
            {watchedArtists.length} / {MAX_EVENT_ARTISTS}
          </span>
        </div>

        <div className="rounded-md border border-input bg-background px-3 py-2 focus-within:border-forest-deep transition-colors">
          {watchedArtists.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {watchedArtists.map((artist, index) => (
                <span
                  key={`${artist}-${index}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                >
                  <span>{artist}</span>
                  <button
                    type="button"
                    onClick={() => removeArtistAt(index)}
                    aria-label={`Remove ${artist}`}
                    className="text-ink-soft hover:text-crimson transition-colors cursor-pointer"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <input
            id="event-artists-input"
            type="text"
            value={artistDraft}
            maxLength={MAX_EVENT_ARTIST_NAME_LENGTH + 10}
            disabled={watchedArtists.length >= MAX_EVENT_ARTISTS}
            placeholder={
              watchedArtists.length >= MAX_EVENT_ARTISTS
                ? `Maximum of ${MAX_EVENT_ARTISTS} artists reached`
                : "Type an artist name and press Enter or comma…"
            }
            onChange={(e) => {
              const val = e.target.value;
              setArtistInputError(null);
              if (val.includes(",")) {
                addArtistsFromRaw(val);
              } else {
                setArtistDraft(val);
              }
            }}
            onKeyDown={handleArtistKeyDown}
            onBlur={() => {
              if (artistDraft.trim()) {
                addArtistsFromRaw(artistDraft);
              }
            }}
            className="w-full bg-transparent py-0.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
          />
        </div>
        <p className={helperClass}>
          Optional. Press Enter or comma to add a name; click × to remove.
        </p>
        {(artistInputError || errors.artists?.message) && (
          <p className={errorClass}>
            {artistInputError || errors.artists?.message}
          </p>
        )}
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
