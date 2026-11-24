import {
  AdminEventsTable,
  type AdminEventRow,
} from "@/components/admin/AdminEventsTable";
import { AdminFlashToast } from "@/components/admin/AdminFlashToast";
import { Button } from "@/components/ui/button";
import type { PostStatus } from "@/generated/prisma/enums";
import {
  formatCalendarDateShort,
  getBerlinTodayCalendarDate,
  POST_STATUS_LABELS,
  POST_STATUS_VALUES,
} from "@/lib/events-utils";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
};

type AdminEventsWhenFilter = "ALL" | "upcoming" | "past";

const WHEN_TABS: Array<{ value: AdminEventsWhenFilter; label: string }> = [
  { value: "ALL", label: "All dates" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

const STATUS_TABS: Array<{ value: PostStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All statuses" },
  ...POST_STATUS_VALUES.map((status) => ({
    value: status,
    label: POST_STATUS_LABELS[status],
  })),
];

function parseStatusFilter(raw?: string | string[]): PostStatus | "ALL" {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value && POST_STATUS_VALUES.includes(value as PostStatus)) {
    return value as PostStatus;
  }
  return "ALL";
}

function parseWhenFilter(raw?: string | string[]): AdminEventsWhenFilter {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === "upcoming" || value === "past") {
    return value;
  }
  return "ALL";
}

function buildFilterHref(
  when: AdminEventsWhenFilter,
  status: PostStatus | "ALL",
): string {
  const params = new URLSearchParams();
  if (when !== "ALL") params.set("when", when);
  if (status !== "ALL") params.set("status", status);
  const qs = params.toString();
  return qs ? `/admin/events?${qs}` : "/admin/events";
}

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{
    when?: string | string[];
    status?: string | string[];
    saved?: string | string[];
  }>;
}) {
  const resolved = await searchParams;
  const activeWhen = parseWhenFilter(resolved.when);
  const activeStatus = parseStatusFilter(resolved.status);
  const savedFlag = Array.isArray(resolved.saved)
    ? resolved.saved[0]
    : resolved.saved;

  const todayBerlinDate = getBerlinTodayCalendarDate();

  const dbEvents = await prisma.event.findMany({
    where: {
      ...(activeStatus === "ALL" ? {} : { status: activeStatus }),
      ...(activeWhen === "upcoming"
        ? { startDate: { gte: todayBerlinDate } }
        : activeWhen === "past"
          ? { startDate: { lt: todayBerlinDate } }
          : {}),
    },
    orderBy: { startDate: activeWhen === "upcoming" ? "asc" : "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      eventType: true,
      startDate: true,
      city: true,
      status: true,
    },
  });

  const rows: AdminEventRow[] = dbEvents.map((event) => ({
    id: event.id,
    title: event.title,
    slug: event.slug,
    eventType: event.eventType,
    startDateLabel: formatCalendarDateShort(event.startDate),
    city: event.city,
    status: event.status,
  }));

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-ink-soft">Admin / Events</p>
          <h2 className="mt-1 font-serif text-3xl text-forest-deep">Events</h2>
        </div>

        <Button asChild variant="forest">
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4" />
            New event
          </Link>
        </Button>
      </div>

      {savedFlag === "created" && (
        <AdminFlashToast
          message="Event created."
          toastId="admin-event-saved"
          clearParam="saved"
        />
      )}
      {savedFlag === "updated" && (
        <AdminFlashToast
          message="Event saved."
          toastId="admin-event-saved"
          clearParam="saved"
        />
      )}

      {/* Upcoming / Past & Status filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <nav
          aria-label="Filter events by timeframe"
          className="flex flex-wrap items-center gap-2"
        >
          {WHEN_TABS.map((tab) => {
            const isActive = activeWhen === tab.value;
            return (
              <Link
                key={tab.value}
                href={buildFilterHref(tab.value, activeStatus)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-saffron bg-saffron/20 text-forest-deep"
                    : "border-border bg-card text-ink-soft hover:border-forest-deep/40 hover:text-forest-deep",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <nav
          aria-label="Filter events by status"
          className="flex flex-wrap items-center gap-2"
        >
          {STATUS_TABS.map((tab) => {
            const isActive = activeStatus === tab.value;
            return (
              <Link
                key={tab.value}
                href={buildFilterHref(activeWhen, tab.value)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-forest-deep bg-forest-deep text-cream"
                    : "border-border bg-card text-ink-soft hover:border-forest-deep/40 hover:text-forest-deep",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <AdminEventsTable
        events={rows}
        activeStatus={activeStatus}
        activeWhen={activeWhen}
      />
    </section>
  );
}
