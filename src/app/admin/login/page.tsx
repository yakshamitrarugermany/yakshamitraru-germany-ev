import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function AdminLoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <main className="min-h-dvh flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-forest mb-4">
            <Image
              src="/images/logos/Yakshamitraru_e.V_Logo_Circle.png"
              alt="Yakshamitraru Germany e.V."
              fill
              className="object-cover"
            />
          </div>
          <p className="eyebrow text-ink-soft">Yakshamitraru Germany e.V.</p>
          <h1 className="mt-1.5 font-serif text-3xl text-forest-deep">
            Admin Sign In
          </h1>
        </div>

        <AdminLoginForm />
      </div>
    </main>
  );
}
