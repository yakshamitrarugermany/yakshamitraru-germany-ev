import { AdminEventForm } from "@/components/admin/AdminEventForm";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Event",
};

export default function NewAdminEventPage() {
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
        <h2 className="mt-1 font-serif text-3xl text-forest-deep">New Event</h2>
      </div>

      <AdminEventForm mode="create" />
    </section>
  );
}
