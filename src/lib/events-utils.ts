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

export const MAX_EVENT_ARTISTS = 30;
export const MAX_EVENT_ARTIST_NAME_LENGTH = 80;

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

export function normalizeArtistList(rawArtists: readonly string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of rawArtists) {
    const trimmed = item.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(trimmed);
    if (result.length >= MAX_EVENT_ARTISTS) break;
  }

  return result;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Parses a calendar date input ("YYYY-MM-DD") into a UTC midnight Date suitable
 * for Prisma `@db.Date` without any local timezone shifting.
 */
export function parseCalendarDateToUtcDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

/**
 * Formats a Prisma `@db.Date` value as "YYYY-MM-DD" using UTC components
 * so the calendar date never shifts across timezones.
 */
export function calendarDateToInput(date: Date): string {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
}

const berlinDatePartsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: BERLIN_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Returns today's calendar date string ("YYYY-MM-DD") in Europe/Berlin.
 */
export function getBerlinTodayDateString(now: Date = new Date()): string {
  const parts = berlinDatePartsFormatter.formatToParts(now);
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }
  return `${map.year}-${map.month}-${map.day}`;
}

/**
 * Returns today's Europe/Berlin calendar date as a UTC midnight Date
 * for direct comparison against `@db.Date` columns.
 */
export function getBerlinTodayCalendarDate(now: Date = new Date()): Date {
  return parseCalendarDateToUtcDate(getBerlinTodayDateString(now))!;
}

const shortCalendarDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

/**
 * Formats a `@db.Date` value for admin tables (e.g. "28 Nov 2026"), no time.
 */
export function formatCalendarDateShort(date: Date): string {
  return shortCalendarDateFormatter.format(date);
}

const publicCalendarDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Formats a `@db.Date` value for public cards, detail pages, and metadata
 * (e.g. "28 November 2026"), without time.
 */
export function formatCalendarDatePublic(date: Date): string {
  return publicCalendarDateFormatter.format(date);
}

/**
 * Returns a midday-UTC ISO string for a `@db.Date` value so calendar badge
 * components reading UTC date parts stay exact across all timezones.
 */
export function formatCalendarDateIso(date: Date): string {
  return `${calendarDateToInput(date)}T12:00:00Z`;
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

/**
 * Formats a full timestamp (e.g. Inquiry.createdAt) in Europe/Berlin.
 */
export function formatBerlinDateTime(date: Date): string {
  return adminDateTimeFormatter.format(date);
}
