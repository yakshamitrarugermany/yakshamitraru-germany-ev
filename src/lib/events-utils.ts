import type { EventType, PostStatus } from "@/generated/prisma/enums";

export const BERLIN_TIME_ZONE = "Europe/Berlin";

export const EVENT_TYPE_VALUES = [
  "PERFORMANCE",
  "WORKSHOP",
  "CLASS_SESSION",
  "OTHER",
] as const satisfies readonly EventType[];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  PERFORMANCE: "Performance",
  WORKSHOP: "Workshop",
  CLASS_SESSION: "Class session",
  OTHER: "Other",
};

export const POST_STATUS_VALUES = [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
] as const satisfies readonly PostStatus[];

export const POST_STATUS_LABELS: Record<PostStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugifyEventTitle(title: string): string {
  return title
    .replace(/ä/gi, "ae")
    .replace(/ö/gi, "oe")
    .replace(/ü/gi, "ue")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface DateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const berlinPartsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: BERLIN_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export function getBerlinDateParts(date: Date): DateParts {
  const parts = berlinPartsFormatter.formatToParts(date);
  const map: Record<string, number> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      map[part.type] = Number(part.value);
    }
  }
  return {
    year: map.year,
    month: map.month,
    day: map.day,
    hour: map.hour === 24 ? 0 : map.hour,
    minute: map.minute,
    second: map.second,
  };
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Converts a UTC Date to a `datetime-local` input string ("YYYY-MM-DDTHH:mm")
 * expressed in Europe/Berlin local time.
 */
export function utcDateToBerlinInput(date: Date): string {
  const p = getBerlinDateParts(date);
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}T${pad2(p.hour)}:${pad2(p.minute)}`;
}

/**
 * Interprets a `datetime-local` input string ("YYYY-MM-DDTHH:mm") as wall-clock
 * time in Europe/Berlin and returns the corresponding UTC Date.
 */
export function berlinInputToUtcDate(value: string): Date | null {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = match[6] ? Number(match[6]) : 0;

  // Validate calendar bounds (e.g. reject 2026-02-31)
  const check = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  if (
    Number.isNaN(check.getTime()) ||
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day ||
    check.getUTCHours() !== hour ||
    check.getUTCMinutes() !== minute
  ) {
    return null;
  }

  let utcMs = Date.UTC(year, month - 1, day, hour, minute, second);
  for (let i = 0; i < 2; i++) {
    const berlinParts = getBerlinDateParts(new Date(utcMs));
    const berlinAsUtcMs = Date.UTC(
      berlinParts.year,
      berlinParts.month - 1,
      berlinParts.day,
      berlinParts.hour,
      berlinParts.minute,
      berlinParts.second,
    );
    const offsetMs = berlinAsUtcMs - utcMs;
    utcMs = Date.UTC(year, month - 1, day, hour, minute, second) - offsetMs;
  }

  const result = new Date(utcMs);
  return Number.isNaN(result.getTime()) ? null : result;
}

/**
 * Returns the UTC Date representing 00:00:00 of today in Europe/Berlin.
 */
export function getBerlinTodayStartUtc(now: Date = new Date()): Date {
  const p = getBerlinDateParts(now);
  return (
    berlinInputToUtcDate(`${p.year}-${pad2(p.month)}-${pad2(p.day)}T00:00`) ??
    new Date(Date.UTC(p.year, p.month - 1, p.day, 0, 0, 0))
  );
}

const adminDateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: BERLIN_TIME_ZONE,
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function formatBerlinDateTime(date: Date): string {
  return adminDateTimeFormatter.format(date);
}

const publicDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: BERLIN_TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
});

const publicTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: BERLIN_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function formatBerlinPublicDate(date: Date): string {
  return publicDateFormatter.format(date);
}

export function formatBerlinPublicTime(
  startDate: Date,
  endDate?: Date | null,
): string {
  const startTime = publicTimeFormatter.format(startDate);
  if (!endDate) return startTime;

  const startParts = getBerlinDateParts(startDate);
  const endParts = getBerlinDateParts(endDate);
  const endTime = publicTimeFormatter.format(endDate);

  if (
    startParts.year === endParts.year &&
    startParts.month === endParts.month &&
    startParts.day === endParts.day
  ) {
    return startTime === endTime ? startTime : `${startTime} – ${endTime}`;
  }

  return `${startTime} – ${publicDateFormatter.format(endDate)}, ${endTime}`;
}

/**
 * Returns a midday-UTC ISO string for the event's Europe/Berlin calendar date
 * so calendar badge components rendering `new Date(iso).getDate()` stay exact
 * across all timezones.
 */
export function formatBerlinCalendarIso(date: Date): string {
  const p = getBerlinDateParts(date);
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}T12:00:00Z`;
}
