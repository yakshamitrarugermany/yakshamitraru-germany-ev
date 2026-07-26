import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/**
 * PageContainer — Top-level page shell with header, `<main>` landmark, footer
 * and base background. Every route wraps its content here so the a11y
 * landmarks and viewport-height behaviour stay consistent.
 */
export function PageContainer({
  children,
  className,
  withHeader = true,
  withFooter = true,
  mainClassName,
}: {
  children: ReactNode;
  className?: string;
  withHeader?: boolean;
  withFooter?: boolean;
  mainClassName?: string;
}) {
  return (
    <div className={cn("min-h-dvh bg-background flex flex-col", className)}>
      {withHeader && <SiteHeader />}
      <main id="main" className={cn("flex-1", mainClassName)}>
        {children}
      </main>
      {withFooter && <SiteFooter />}
    </div>
  );
}
