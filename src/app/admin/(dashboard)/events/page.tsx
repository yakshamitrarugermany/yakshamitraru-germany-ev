import {
  AdminEventsTable,
  type AdminEventRow,
} from "@/components/admin/AdminEventsTable";
import { Button } from "@/components/ui/button";
import type { PostStatus } from "@/generated/prisma/enums";
import {
  formatBerlinDateTime,
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

const STATUS_TABS: Array<{ value: PostStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All" },
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

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string | string[];
    saved?: string | string[];
  }>;
}) {
  const resolved = await searchParams;
  const activeStatus = parseStatusFilter(resolved.status);
  const savedFlag = Array.isArray(resolved.saved)
    ? resolved.saved[0]
    : resolved.saved;

  const dbEvents = await prisma.event.findMany({
    where: activeStatus === "ALL" ? undefined : { status: activeStatus },
    orderBy: { startDate: "desc" },
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
    startDateLabel: formatBerlinDateTime(event.startDate),
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
        <div
          role="status"
          className="rounded-md border border-forest-deep/20 bg-forest-deep/5 px-4 py-3 text-sm text-forest-deep"
        >
          Event created successfully.
        </div>
      )}
      {savedFlag === "updated" && (
        <div
          role="status"
          className="rounded-md border border-forest-deep/20 bg-forest-deep/5 px-4 py-3 text-sm text-forest-deep"
        >
          Event updated successfully.
        </div>
      )}

      {/* Status filter */}
      <nav
        aria-label="Filter events by status"
        className="flex flex-wrap items-center gap-2"
      >
        {STATUS_TABS.map((tab) => {
          const isActive = activeStatus === tab.value;
          const href =
            tab.value === "ALL"
              ? "/admin/events"
              : `/admin/events?status=${tab.value}`;

          return (
            <Link
              key={tab.value}
              href={href}
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

      <AdminEventsTable events={rows} activeStatus={activeStatus} />
    </section>
  );
}
