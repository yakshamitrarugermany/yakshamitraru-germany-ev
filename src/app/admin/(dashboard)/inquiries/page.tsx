import { AdminPlaceholder } from "@/components/admin/AdminPlaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiries",
};

export default function AdminInquiriesPage() {
  return (
    <AdminPlaceholder
      section="Inquiries"
      description="Performance booking requests and general inquiries will be reviewed and tracked here soon."
    />
  );
}
