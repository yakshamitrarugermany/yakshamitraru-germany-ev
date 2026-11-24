"use client";

import { showAdminSuccessToast } from "@/lib/admin-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface AdminFlashToastProps {
  message: string;
  toastId: string;
  clearParam: string;
}

export function AdminFlashToast({
  message,
  toastId,
  clearParam,
}: AdminFlashToastProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    showAdminSuccessToast(message, toastId);

    const nextParams = new URLSearchParams(searchParams.toString());
    if (nextParams.has(clearParam)) {
      nextParams.delete(clearParam);
      const qs = nextParams.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
  }, [message, toastId, clearParam, pathname, router, searchParams]);

  return null;
}
