import perf1 from "@/assets/perf1.jpg.asset.json";
import { EVENTS as STATIC_EVENTS, type EventItem } from "@/data/events";
import type { EventType } from "@/generated/prisma/enums";
import type { Event as PrismaEvent } from "@/generated/prisma/client";
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
  const organizer =
    event.venueName?.trim() || EVENT_TYPE_LABELS[event.eventType];
  const locationParts = [event.address, event.city, event.country]
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p));
  const location =
    locationParts.join(", ") || event.venueName?.trim() || event.country;

  return {
    slug: event.slug,
    organizer,
    title: event.title,
    date: formatBerlinPublicDate(event.startDate),
    time: formatBerlinPublicTime(event.startDate, event.endDate),
    location,
    iso: formatBerlinCalendarIso(event.startDate),
    city: event.city?.trim() || event.country,
    country: event.country,
    image: event.coverImageUrl || perf1.url,
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
    console.warn(
      "Falling back to static events because database query failed:",
      err instanceof Error ? err.message : err,
    );
    return getStaticFallbackEvents(when, type);
  }
}

export async function getPublicEventBySlug(
  slug: string,
): Promise<EventItem | null> {
  if (!process.env.DATABASE_URL?.trim()) {
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
    console.warn(
      "Falling back to static event detail because database query failed:",
      err instanceof Error ? err.message : err,
    );
    return STATIC_EVENTS.find((item) => item.slug === slug) ?? null;
  }
}
