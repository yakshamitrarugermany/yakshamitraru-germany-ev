import {
  AdminTestimonialsManager,
  type AdminTestimonialItem,
} from "@/components/admin/AdminTestimonialsManager";
import type { TestimonialStatus } from "@/generated/prisma/enums";
import { formatBerlinDateTime } from "@/lib/events-utils";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
};

function parseTabParam(raw?: string | string[]): TestimonialStatus | null {
  const value = (Array.isArray(raw) ? raw[0] : raw)?.toUpperCase();
  if (value === "PENDING" || value === "APPROVED" || value === "REJECTED") {
    return value;
  }
  return null;
}

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const resolved = await searchParams;
  const requestedTab = parseTabParam(resolved.tab);

  const [pendingRows, approvedRows, rejectedRows] = await Promise.all([
    prisma.testimonial.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.testimonial.findMany({
      where: { status: "APPROVED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }, { id: "asc" }],
    }),
    prisma.testimonial.findMany({
      where: { status: "REJECTED" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const toItem = (row: (typeof pendingRows)[number]): AdminTestimonialItem => ({
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    event: row.event,
    city: row.city,
    text: row.text,
    status: row.status,
    sortOrder: row.sortOrder,
    createdAtLabel: formatBerlinDateTime(row.createdAt),
  });

  const pending = pendingRows.map(toItem);
  const approved = approvedRows.map(toItem);
  const rejected = rejectedRows.map(toItem);

  const initialTab: TestimonialStatus =
    requestedTab ?? (pending.length > 0 ? "PENDING" : "APPROVED");

  return (
    <section className="space-y-6">
      <div>
        <p className="eyebrow text-ink-soft">Admin / Testimonials</p>
        <h2 className="mt-1 font-serif text-3xl text-forest-deep">
          Testimonials
        </h2>
      </div>

      <AdminTestimonialsManager
        pending={pending}
        approved={approved}
        rejected={rejected}
        initialTab={initialTab}
      />
    </section>
  );
}
