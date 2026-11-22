import { AdminPlaceholder } from "@/components/admin/AdminPlaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <AdminPlaceholder
      section="Dashboard"
      description="Overview metrics, recent activity, and quick links for Yakshamitraru Germany e.V. will appear here soon."
    />
  );
}
