import { EVENTS as STATIC_EVENTS, type EventItem } from "@/data/events";
import type { Event as PrismaEvent } from "@/generated/prisma/client";
import type { EventType } from "@/generated/prisma/enums";
import {
  EVENT_TYPE_LABELS,
  EVENT_TYPE_VALUES,
  formatBerlinCalendarIso,
  formatBerlinPublicDate,
  formatBerlinPublicTime,
  getBerlinTodayStartUtc,
} from "@/lib/events-utils";
import { prisma } from "@/lib/prisma";

export type PublicEventsWhen = "upcoming" | "past";

const DEFAULT_EVENT_IMAGE = "/images/events/event1.jpg";

export function parseWhenParam(raw?: string | string[]): PublicEventsWhen {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === "past" ? "past" : "upcoming";
}

export function parseEventTypeParam(
  raw?: string | string[],
): EventType | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return undefined;
  return EVENT_TYPE_VALUES.includes(value as EventType)
    ? (value as EventType)
    : undefined;
}

function sanitizeDbErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  return raw
    .replace(/postgres(?:ql)?:\/\/[^\s"'`]+/gi, "[REDACTED_URL]")
    .replace(/(password|pwd|secret|token)=[^\s&;"'`]+/gi, "$1=[REDACTED]")
    .replace(/\b[\w.-]+@[\w.-]+\.\w+\b/g, "[REDACTED_EMAIL]")
    .slice(0, 300);
}

function getPrismaErrorCode(err: unknown): string {
  if (!err || typeof err !== "object") return "";
  const code = (err as { code?: unknown }).code;
  return typeof code === "string" ? code : "";
}

function isDatabaseUnreachableError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const code = getPrismaErrorCode(err);
  if (/^P10\d\d$/.test(code)) return true;
  if (
    [
      "ECONNREFUSED",
      "ENOTFOUND",
      "ETIMEDOUT",
      "EHOSTUNREACH",
      "ECONNRESET",
      "EAI_AGAIN",
    ].includes(code)
  ) {
    return true;
  }

  const e = err as {
    name?: string;
    message?: string;
    meta?: { driverAdapterError?: { name?: string; message?: string } };
  };
  const combined = `${e.name ?? ""} ${e.message ?? ""} ${e.meta?.driverAdapterError?.name ?? ""} ${e.meta?.driverAdapterError?.message ?? ""}`;
  return /DatabaseNotReachable|Can't reach database server|Connection terminated|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|PrismaClientInitializationError/i.test(
    combined,
  );
}

export function mapDbEventToEventItem(
  event: Pick<
    PrismaEvent,
    | "slug"
    | "title"
    | "eventType"
    | "startDate"
    | "endDate"
    | "venueName"
    | "address"
    | "city"
    | "country"
    | "coverImageUrl"
  >,
  todayStartUtc: Date = getBerlinTodayStartUtc(),
): EventItem {
  const country = event.country?.trim() || "Germany";
  const venueName = event.venueName?.trim() || "";
  const organizer =
    venueName || EVENT_TYPE_LABELS[event.eventType] || "Yakshamitraru Germany e.V.";
  const locationParts = [event.address, event.city, country]
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p));
  const location = locationParts.join(", ") || venueName || country;
  const coverImage = event.coverImageUrl?.trim();

  return {
    slug: event.slug,
    organizer,
    title: event.title,
    date: formatBerlinPublicDate(event.startDate),
    time: formatBerlinPublicTime(event.startDate, event.endDate),
    location,
    iso: formatBerlinCalendarIso(event.startDate),
    city: event.city?.trim() || country,
    country,
    image: coverImage || DEFAULT_EVENT_IMAGE,
    status:
      event.startDate.getTime() >= todayStartUtc.getTime()
        ? "upcoming"
        : "past",
  };
}

function getStaticFallbackEvents(
  when: PublicEventsWhen,
  type?: EventType,
): EventItem[] {
  // Static fallback items are all performances
  if (type && type !== "PERFORMANCE") {
    return [];
  }
  const filtered = STATIC_EVENTS.filter((e) => e.status === when);
  return filtered.sort((a, b) =>
    when === "upcoming"
      ? a.iso.localeCompare(b.iso)
      : b.iso.localeCompare(a.iso),
  );
}

export async function getPublicEvents(options: {
  when: PublicEventsWhen;
  type?: EventType;
}): Promise<EventItem[]> {
  const { when, type } = options;

  if (!process.env.DATABASE_URL?.trim()) {
    console.error(
      "[public-events] DATABASE_URL is not configured; falling back to static events.",
    );
    return getStaticFallbackEvents(when, type);
  }

  try {
    const todayStartUtc = getBerlinTodayStartUtc();
    const rows = await prisma.event.findMany({
      where: {
        status: "PUBLISHED",
        startDate:
          when === "upcoming"
            ? { gte: todayStartUtc }
            : { lt: todayStartUtc },
        ...(type ? { eventType: type } : {}),
      },
      orderBy: {
        startDate: when === "upcoming" ? "asc" : "desc",
      },
      select: {
        slug: true,
        title: true,
        eventType: true,
        startDate: true,
        endDate: true,
        venueName: true,
        address: true,
        city: true,
        country: true,
        coverImageUrl: true,
      },
    });

    return rows.map((row) => mapDbEventToEventItem(row, todayStartUtc));
  } catch (err) {
    console.error("[public-events] Failed to load events from database:", {
      code: getPrismaErrorCode(err) || undefined,
      message: sanitizeDbErrorMessage(err),
    });
    if (isDatabaseUnreachableError(err)) {
      return getStaticFallbackEvents(when, type);
    }
    throw err;
  }
}

export async function getPublicEventBySlug(
  slug: string,
): Promise<EventItem | null> {
  if (!process.env.DATABASE_URL?.trim()) {
    console.error(
      "[public-events] DATABASE_URL is not configured; falling back to static event detail.",
    );
    return STATIC_EVENTS.find((item) => item.slug === slug) ?? null;
  }

  try {
    const todayStartUtc = getBerlinTodayStartUtc();
    const row = await prisma.event.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },
      select: {
        slug: true,
        title: true,
        eventType: true,
        startDate: true,
        endDate: true,
        venueName: true,
        address: true,
        city: true,
        country: true,
        coverImageUrl: true,
      },
    });

    return row ? mapDbEventToEventItem(row, todayStartUtc) : null;
  } catch (err) {
    console.error("[public-events] Failed to load event detail from database:", {
      code: getPrismaErrorCode(err) || undefined,
      message: sanitizeDbErrorMessage(err),
    });
    if (isDatabaseUnreachableError(err)) {
      return STATIC_EVENTS.find((item) => item.slug === slug) ?? null;
    }
    throw err;
  }
}
