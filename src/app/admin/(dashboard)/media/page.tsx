import { AdminPlaceholder } from "@/components/admin/AdminPlaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media",
};

export default function AdminMediaPage() {
  return (
    <AdminPlaceholder
      section="Media"
      description="Photo uploads, gallery curation, and video embeds will be managed here soon."
    />
  );
}
