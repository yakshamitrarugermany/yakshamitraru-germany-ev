import { EVENTS as STATIC_EVENTS, type EventItem } from "@/data/events";
import type { Event as PrismaEvent } from "@/generated/prisma/client";
import type { EventType } from "@/generated/prisma/enums";
import {
  EVENT_TYPE_VALUES,
  formatCalendarDateIso,
  formatCalendarDatePublic,
  getBerlinTodayCalendarDate,
} from "@/lib/events-utils";
import { prisma } from "@/lib/prisma";

export type PublicEventsWhen = "upcoming" | "past";

export interface PublicEventItem extends EventItem {
  yakshaganaTitle?: string | null;
  organisedBy?: string | null;
  artists?: string[];
}

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

function mapStaticEvent(item: EventItem): PublicEventItem {
  return {
    ...item,
    time: "",
    yakshaganaTitle: null,
    organisedBy: item.organizer?.trim() || null,
    artists: [],
  };
}

export function mapDbEventToEventItem(
  event: Pick<
    PrismaEvent,
    | "slug"
    | "title"
    | "yakshaganaTitle"
    | "organisedBy"
    | "artists"
    | "eventType"
    | "startDate"
    | "venueName"
    | "address"
    | "city"
    | "country"
    | "coverImageUrl"
  >,
  todayBerlinDate: Date = getBerlinTodayCalendarDate(),
): PublicEventItem {
  const country = event.country?.trim() || "Germany";
  const venueName = event.venueName?.trim() || "";
  const organisedBy = event.organisedBy?.trim() || null;
  const yakshaganaTitle = event.yakshaganaTitle?.trim() || null;
  const organizer = organisedBy || venueName || "";

  const locationParts = [event.address, event.city, country]
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p));
  const location = locationParts.join(", ") || venueName || country;
  const coverImage = event.coverImageUrl?.trim();

  return {
    slug: event.slug,
    organizer,
    title: event.title,
    yakshaganaTitle,
    organisedBy,
    artists: (event.artists ?? []).map((a) => a.trim()).filter(Boolean),
    date: formatCalendarDatePublic(event.startDate),
    time: "",
    location,
    iso: formatCalendarDateIso(event.startDate),
    city: event.city?.trim() || country,
    country,
    image: coverImage || DEFAULT_EVENT_IMAGE,
    status:
      event.startDate.getTime() >= todayBerlinDate.getTime()
        ? "upcoming"
        : "past",
  };
}

function getStaticFallbackEvents(
  when: PublicEventsWhen,
  type?: EventType,
): PublicEventItem[] {
  // Static fallback items are all performances
  if (type && type !== "PERFORMANCE") {
    return [];
  }
  const filtered = STATIC_EVENTS.filter((e) => e.status === when).map(
    mapStaticEvent,
  );
  return filtered.sort((a, b) =>
    when === "upcoming"
      ? a.iso.localeCompare(b.iso)
      : b.iso.localeCompare(a.iso),
  );
}

const PUBLIC_EVENT_SELECT = {
  slug: true,
  title: true,
  yakshaganaTitle: true,
  organisedBy: true,
  artists: true,
  eventType: true,
  startDate: true,
  venueName: true,
  address: true,
  city: true,
  country: true,
  coverImageUrl: true,
} as const;

export async function getPublicEvents(options: {
  when: PublicEventsWhen;
  type?: EventType;
}): Promise<PublicEventItem[]> {
  const { when, type } = options;

  if (!process.env.DATABASE_URL?.trim()) {
    console.error(
      "[public-events] DATABASE_URL is not configured; falling back to static events.",
    );
    return getStaticFallbackEvents(when, type);
  }

  try {
    const todayBerlinDate = getBerlinTodayCalendarDate();
    const rows = await prisma.event.findMany({
      where: {
        status: "PUBLISHED",
        startDate:
          when === "upcoming"
            ? { gte: todayBerlinDate }
            : { lt: todayBerlinDate },
        ...(type ? { eventType: type } : {}),
      },
      orderBy: {
        startDate: when === "upcoming" ? "asc" : "desc",
      },
      select: PUBLIC_EVENT_SELECT,
    });

    return rows.map((row) => mapDbEventToEventItem(row, todayBerlinDate));
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

export async function hasPublicPastEvents(): Promise<boolean> {
  if (!process.env.DATABASE_URL?.trim()) {
    return STATIC_EVENTS.some((e) => e.status === "past");
  }

  try {
    const todayBerlinDate = getBerlinTodayCalendarDate();
    const count = await prisma.event.count({
      where: {
        status: "PUBLISHED",
        startDate: { lt: todayBerlinDate },
      },
    });
    return count > 0;
  } catch (err) {
    console.error("[public-events] Failed to check past events count:", {
      code: getPrismaErrorCode(err) || undefined,
      message: sanitizeDbErrorMessage(err),
    });
    if (isDatabaseUnreachableError(err)) {
      return STATIC_EVENTS.some((e) => e.status === "past");
    }
    throw err;
  }
}

export async function getPublicEventBySlug(
  slug: string,
): Promise<PublicEventItem | null> {
  if (!process.env.DATABASE_URL?.trim()) {
    console.error(
      "[public-events] DATABASE_URL is not configured; falling back to static event detail.",
    );
    const staticMatch = STATIC_EVENTS.find((item) => item.slug === slug);
    return staticMatch ? mapStaticEvent(staticMatch) : null;
  }

  try {
    const todayBerlinDate = getBerlinTodayCalendarDate();
    const row = await prisma.event.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },
      select: PUBLIC_EVENT_SELECT,
    });

    return row ? mapDbEventToEventItem(row, todayBerlinDate) : null;
  } catch (err) {
    console.error("[public-events] Failed to load event detail from database:", {
      code: getPrismaErrorCode(err) || undefined,
      message: sanitizeDbErrorMessage(err),
    });
    if (isDatabaseUnreachableError(err)) {
      const staticMatch = STATIC_EVENTS.find((item) => item.slug === slug);
      return staticMatch ? mapStaticEvent(staticMatch) : null;
    }
    throw err;
  }
}
