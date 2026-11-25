"use client";

import { Button } from "@/components/ui/button";
import { showAdminErrorToast } from "@/lib/admin-toast";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Image as ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  MessageSquareQuote,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
] as const;

interface AdminShellProps {
  user: {
    name: string;
    email: string;
  };
  children: ReactNode;
}

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const activeItem =
    ADMIN_NAV_ITEMS.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname === item.href || pathname?.startsWith(`${item.href}/`),
    ) ?? ADMIN_NAV_ITEMS[0];

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await authClient.signOut();
      router.replace("/admin/login");
      router.refresh();
    } catch {
      showAdminErrorToast(
        "Could not log out right now. Please try again.",
        "admin-signout-error",
      );
      setSigningOut(false);
    }
  }

  function renderNavLinks(onNavigate?: () => void) {
    return (
      <nav aria-label="Admin navigation" className="flex-1 px-3 py-4 space-y-1">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-saffron/15 text-saffron"
                  : "text-cream/80 hover:bg-cream/10 hover:text-cream",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  const sidebarBrand = (
    <div className="flex h-16 items-center gap-3 border-b border-cream/10 px-5">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-forest">
        <Image
          src="/images/logos/Yakshamitraru_e.V_Logo_Circle.png"
          alt="Yakshamitraru Germany"
          fill
          className="object-cover"
        />
      </div>
      <div className="min-w-0 leading-tight">
        <div className="font-serif text-base text-cream truncate">
          Yakshamitraru
        </div>
        <div className="eyebrow text-[10px] text-saffron/80">Admin</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh flex bg-background text-foreground [&_input::placeholder]:text-muted-foreground/70 [&_textarea::placeholder]:text-muted-foreground/70 [&_input[type=date]:invalid]:text-muted-foreground/70 [&_[data-slot=select-trigger][data-placeholder]]:text-muted-foreground/70">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col bg-forest-deep text-cream border-r border-cream/10">
        {sidebarBrand}
        {renderNavLinks()}
      </aside>

      {/* Mobile slide-over sheet */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation"
        >
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-10 flex w-72 max-w-[85vw] flex-col bg-forest-deep text-cream shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-cream/10 px-5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-forest">
                  <Image
                    src="/images/logos/Yakshamitraru_e.V_Logo_Circle.png"
                    alt="Yakshamitraru Germany"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="font-serif text-base text-cream truncate">
                    Yakshamitraru
                  </div>
                  <div className="eyebrow text-[10px] text-saffron/80">
                    Admin
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="text-cream/80 hover:bg-cream/10 hover:text-cream"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {renderNavLinks(() => setMobileMenuOpen(false))}
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-serif text-xl sm:text-2xl text-forest-deep truncate">
              {activeItem.label}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="text-sm font-medium text-foreground truncate max-w-35 sm:max-w-55">
              {user.name}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              {signingOut ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Logging out…
                </>
              ) : (
                <>
                  <LogOut className="h-3.5 w-3.5" />
                  Log out
                </>
              )}
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
