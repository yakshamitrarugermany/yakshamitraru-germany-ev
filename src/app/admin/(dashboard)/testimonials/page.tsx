import { AdminPlaceholder } from "@/components/admin/AdminPlaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function AdminTestimonialsPage() {
  return (
    <AdminPlaceholder
      section="Testimonials"
      description="Submitted audience reviews and approval moderation will be managed here soon."
    />
  );
}
