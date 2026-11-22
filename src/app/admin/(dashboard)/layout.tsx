import { AdminShell } from "@/components/admin/AdminShell";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
    >
      {children}
    </AdminShell>
  );
}
