"use client";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface PublicLayoutChromeProps {
  children: ReactNode;
}

export function PublicLayoutChrome({ children }: PublicLayoutChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname?.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
