import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { InquiryStatus, InquiryType } from "@/generated/prisma/enums";
import { formatBerlinDateTime } from "@/lib/events-utils";
import {
  INQUIRY_STATUS_LABELS,
  INQUIRY_STATUS_VALUES,
  INQUIRY_TYPE_LABELS,
  INQUIRY_TYPE_VALUES,
} from "@/lib/inquiries-utils";
import { formatPhoneForDisplay } from "@/lib/phone";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Eye, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inquiries",
};

const STATUS_TABS: Array<{ value: InquiryStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All statuses" },
  ...INQUIRY_STATUS_VALUES.map((status) => ({
    value: status,
    label: INQUIRY_STATUS_LABELS[status],
  })),
];

const TYPE_TABS: Array<{ value: InquiryType | "ALL"; label: string }> = [
  { value: "ALL", label: "All types" },
  ...INQUIRY_TYPE_VALUES.map((type) => ({
    value: type,
    label: INQUIRY_TYPE_LABELS[type],
  })),
];

const statusBadgeStyles: Record<InquiryStatus, string> = {
  NEW: "bg-saffron/20 text-forest-deep border-saffron/40",
  CONTACTED: "bg-forest-deep/10 text-forest-deep border-forest-deep/20",
  CLOSED: "bg-muted text-ink-soft border-border",
};

function parseStatusFilter(raw?: string | string[]): InquiryStatus | "ALL" {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value && INQUIRY_STATUS_VALUES.includes(value as InquiryStatus)) {
    return value as InquiryStatus;
  }
  return "ALL";
}

function parseTypeFilter(raw?: string | string[]): InquiryType | "ALL" {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value && INQUIRY_TYPE_VALUES.includes(value as InquiryType)) {
    return value as InquiryType;
  }
  return "ALL";
}

function buildFilterHref(
  status: InquiryStatus | "ALL",
  type: InquiryType | "ALL",
): string {
  const params = new URLSearchParams();
  if (status !== "ALL") params.set("status", status);
  if (type !== "ALL") params.set("type", type);
  const qs = params.toString();
  return qs ? `/admin/inquiries?${qs}` : "/admin/inquiries";
}

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string | string[];
    type?: string | string[];
    deleted?: string | string[];
  }>;
}) {
  const resolved = await searchParams;
  const activeStatus = parseStatusFilter(resolved.status);
  const activeType = parseTypeFilter(resolved.type);
  const deletedFlag = Array.isArray(resolved.deleted)
    ? resolved.deleted[0]
    : resolved.deleted;

  const inquiries = await prisma.inquiry.findMany({
    where: {
      ...(activeStatus !== "ALL" ? { status: activeStatus } : {}),
      ...(activeType !== "ALL" ? { type: activeType } : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      type: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      event: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  const isFiltered = activeStatus !== "ALL" || activeType !== "ALL";

  return (
    <section className="space-y-6">
      <div>
        <p className="eyebrow text-ink-soft">Admin / Inquiries</p>
        <h2 className="mt-1 font-serif text-3xl text-forest-deep">Inquiries</h2>
      </div>

      {deletedFlag === "1" && (
        <div
          role="status"
          className="rounded-md border border-forest-deep/20 bg-forest-deep/5 px-4 py-3 text-sm text-forest-deep"
        >
          Inquiry permanently deleted.
        </div>
      )}

      {/* Status & Type filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <nav
          aria-label="Filter inquiries by status"
          className="flex flex-wrap items-center gap-2"
        >
          {STATUS_TABS.map((tab) => {
            const isActive = activeStatus === tab.value;
            return (
              <Link
                key={tab.value}
                href={buildFilterHref(tab.value, activeType)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
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

        <nav
          aria-label="Filter inquiries by type"
          className="flex flex-wrap items-center gap-2"
        >
          {TYPE_TABS.map((tab) => {
            const isActive = activeType === tab.value;
            return (
              <Link
                key={tab.value}
                href={buildFilterHref(activeStatus, tab.value)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
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
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 md:p-14 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-forest-deep">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-serif text-2xl text-forest-deep">
            {isFiltered ? "No matching inquiries" : "No inquiries yet"}
          </h3>
          <p className="mt-2 mx-auto max-w-md text-sm text-ink-soft leading-relaxed">
            {isFiltered
              ? "Try clearing or changing the status or type filters."
              : "Booking requests and general inquiries submitted through the website will appear here."}
          </p>
          {isFiltered && (
            <div className="mt-6 flex justify-center">
              <Button asChild variant="outline">
                <Link href="/admin/inquiries">Show all inquiries</Link>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="px-4 py-3">Received</TableHead>
                <TableHead className="px-4 py-3">Type</TableHead>
                <TableHead className="px-4 py-3">Name</TableHead>
                <TableHead className="px-4 py-3">Email</TableHead>
                <TableHead className="px-4 py-3">Phone</TableHead>
                <TableHead className="px-4 py-3">Status</TableHead>
                <TableHead className="px-4 py-3">Linked event</TableHead>
                <TableHead className="px-4 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => {
                const formattedPhone = formatPhoneForDisplay(inquiry.phone);
                return (
                  <TableRow key={inquiry.id}>
                    <TableCell className="px-4 py-3.5 font-mono text-xs tabular-nums text-foreground">
                      {formatBerlinDateTime(inquiry.createdAt)}
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-ink-soft">
                      {INQUIRY_TYPE_LABELS[inquiry.type]}
                    </TableCell>
                    <TableCell className="px-4 py-3.5 font-medium text-foreground max-w-[200px] truncate">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="hover:text-forest-deep hover:underline underline-offset-4"
                      >
                        {inquiry.name}
                      </Link>
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-ink-soft max-w-[220px] truncate">
                      {inquiry.email}
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-ink-soft whitespace-nowrap">
                      {formattedPhone ? (
                        formattedPhone.telHref ? (
                          <a
                            href={formattedPhone.telHref}
                            className="hover:text-forest-deep hover:underline underline-offset-4"
                          >
                            {formattedPhone.display}
                          </a>
                        ) : (
                          formattedPhone.display
                        )
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          statusBadgeStyles[inquiry.status],
                        )}
                      >
                        {INQUIRY_STATUS_LABELS[inquiry.status]}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-ink-soft max-w-[200px] truncate">
                      {inquiry.event ? inquiry.event.title : "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/inquiries/${inquiry.id}`}>
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
