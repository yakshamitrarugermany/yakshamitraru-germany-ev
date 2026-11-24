"use client";

import { Toaster } from "@/components/ui/sonner";
import { useSyncExternalStore } from "react";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

function subscribeToMobileQuery(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getIsMobileSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function AdminToaster() {
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getIsMobileSnapshot,
    getServerSnapshot,
  );

  return (
    <Toaster
      position={isMobile ? "top-center" : "bottom-right"}
      closeButton
      duration={4000}
      visibleToasts={4}
      containerAriaLabel="Admin notifications"
    />
  );
}
