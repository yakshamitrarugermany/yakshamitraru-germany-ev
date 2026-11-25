import { Button } from "@/components/ui/button";
import type { InquiryStatus } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import {
  EVENT_TYPE_LABELS,
  formatBerlinDateTime,
  formatCalendarDateShort,
  getBerlinTodayCalendarDate,
} from "@/lib/events-utils";
import {
  INQUIRY_STATUS_LABELS,
  INQUIRY_TYPE_LABELS,
} from "@/lib/inquiries-utils";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Calendar,
  FileEdit,
  Mail,
  MessageSquareQuote,
  Plus,
} from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

const inquiryStatusBadgeStyles: Record<InquiryStatus, string> = {
  NEW: "bg-saffron/20 text-forest-deep border-saffron/40",
  CONTACTED: "bg-forest-deep/10 text-forest-deep border-forest-deep/20",
  CLOSED: "bg-muted text-ink-soft border-border",
};

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const adminName = session?.user.name?.trim() || "Admin";
  const todayBerlinDate = getBerlinTodayCalendarDate();

  const [
    newInquiriesCount,
    pendingReviewsCount,
    upcomingEventsCount,
    draftEventsCount,
    latestInquiries,
    nextEvents,
  ] = await Promise.all([
    prisma.inquiry.count({
      where: { status: "NEW" },
    }),
    prisma.testimonial.count({
      where: { status: "PENDING" },
    }),
    prisma.event.count({
      where: {
        status: "PUBLISHED",
        startDate: { gte: todayBerlinDate },
      },
    }),
    prisma.event.count({
      where: { status: "DRAFT" },
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        status: true,
      },
    }),
    prisma.event.findMany({
      where: {
        status: "PUBLISHED",
        startDate: { gte: todayBerlinDate },
      },
      orderBy: [{ startDate: "asc" }, { createdAt: "asc" }],
      take: 3,
      select: {
        id: true,
        title: true,
        eventType: true,
        startDate: true,
        city: true,
      },
    }),
  ]);

  const statCards = [
    {
      label: "New inquiries",
      count: newInquiriesCount,
      href: "/admin/inquiries?status=NEW",
      icon: Mail,
    },
    {
      label: "Pending reviews",
      count: pendingReviewsCount,
      href: "/admin/testimonials?tab=pending",
      icon: MessageSquareQuote,
    },
    {
      label: "Upcoming events",
      count: upcomingEventsCount,
      href: "/admin/events?when=upcoming&status=PUBLISHED",
      icon: Calendar,
    },
    {
      label: "Draft events",
      count: draftEventsCount,
      href: "/admin/events?status=DRAFT",
      icon: FileEdit,
    },
  ];

  return (
    <section className="space-y-8">
      {/* Greeting & primary action */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-ink-soft">Admin / Dashboard</p>
          <h2 className="mt-1 font-serif text-3xl text-forest-deep">
            Welcome back, {adminName}
          </h2>
        </div>

        <Button asChild variant="forest">
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New event
          </Link>
        </Button>
      </div>

      {/* Count cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs transition-colors hover:border-forest-deep/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow text-ink-soft">{card.label}</span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-forest-deep transition-colors group-hover:bg-forest-deep group-hover:text-cream">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <span className="font-serif text-4xl text-forest-deep tabular-nums leading-none">
                  {card.count}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft group-hover:text-forest-deep transition-colors">
                  View
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Lists: Latest inquiries & Next events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Latest inquiries */}
        <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 sm:px-6 py-4">
            <h3 className="font-serif text-2xl text-forest-deep">
              Latest inquiries
            </h3>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-forest-deep transition-colors"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          {latestInquiries.length === 0 ? (
            <div className="p-8 sm:p-10 text-center">
              <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-forest-deep">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-3 font-serif text-xl text-forest-deep">
                No inquiries yet
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                New booking requests and general messages will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {latestInquiries.map((inquiry) => (
                <li key={inquiry.id}>
                  <Link
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 hover:bg-muted/40 transition-colors"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="font-medium text-sm text-foreground truncate">
                        {inquiry.name}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-soft">
                        <span>{INQUIRY_TYPE_LABELS[inquiry.type]}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {formatBerlinDateTime(inquiry.createdAt)}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "shrink-0 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        inquiryStatusBadgeStyles[inquiry.status],
                      )}
                    >
                      {INQUIRY_STATUS_LABELS[inquiry.status]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Next events */}
        <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 sm:px-6 py-4">
            <h3 className="font-serif text-2xl text-forest-deep">
              Next events
            </h3>
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-forest-deep transition-colors"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          {nextEvents.length === 0 ? (
            <div className="p-8 sm:p-10 text-center">
              <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-forest-deep">
                <Calendar className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-3 font-serif text-xl text-forest-deep">
                No upcoming published events
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Publish an event dated today or later to see it listed here.
              </p>
              <div className="mt-5 flex justify-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/events/new">
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    New event
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {nextEvents.map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/admin/events/${event.id}/edit`}
                    className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 hover:bg-muted/40 transition-colors"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="font-medium text-sm text-foreground truncate">
                        {event.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-soft">
                        <span className="font-mono tabular-nums text-foreground">
                          {formatCalendarDateShort(event.startDate)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{EVENT_TYPE_LABELS[event.eventType]}</span>
                        {event.city && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{event.city}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
                      Edit
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
