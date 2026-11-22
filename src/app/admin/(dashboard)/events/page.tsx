import { AdminPlaceholder } from "@/components/admin/AdminPlaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};

export default function AdminEventsPage() {
  return (
    <AdminPlaceholder
      section="Events"
      description="Management for upcoming performances, workshops, and past events will appear here soon."
    />
  );
}
