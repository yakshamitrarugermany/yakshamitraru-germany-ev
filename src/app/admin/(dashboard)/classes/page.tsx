import { AdminPlaceholder } from "@/components/admin/AdminPlaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes",
};

export default function AdminClassesPage() {
  return (
    <AdminPlaceholder
      section="Classes"
      description="Yakshagana training schedules, formats, and class listings will be managed here soon."
    />
  );
}
