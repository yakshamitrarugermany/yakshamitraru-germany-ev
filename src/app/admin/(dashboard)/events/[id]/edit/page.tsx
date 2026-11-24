import { AdminEventForm } from "@/components/admin/AdminEventForm";
import { calendarDateToInput } from "@/lib/events-utils";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Event",
};

export default async function EditAdminEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      yakshaganaTitle: true,
      organisedBy: true,
      artists: true,
      slug: true,
      description: true,
      eventType: true,
      startDate: true,
      venueName: true,
      address: true,
      city: true,
      country: true,
      bookingRequired: true,
      status: true,
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <section className="space-y-6 max-w-3xl">
      <div>
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-forest-deep transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </Link>
        <p className="eyebrow text-ink-soft mt-4">Admin / Events</p>
        <h2 className="mt-1 font-serif text-3xl text-forest-deep">
          Edit Event
        </h2>
      </div>

      <AdminEventForm
        mode="edit"
        eventId={event.id}
        defaultValues={{
          title: event.title,
          yakshaganaTitle: event.yakshaganaTitle ?? "",
          organisedBy: event.organisedBy ?? "",
          artists: event.artists ?? [],
          slug: event.slug,
          slugManuallyEdited: true,
          description: event.description,
          eventType: event.eventType,
          startDate: calendarDateToInput(event.startDate),
          venueName: event.venueName ?? "",
          address: event.address ?? "",
          city: event.city ?? "",
          country: event.country,
          bookingRequired: event.bookingRequired,
          status: event.status,
        }}
      />
    </section>
  );
}
