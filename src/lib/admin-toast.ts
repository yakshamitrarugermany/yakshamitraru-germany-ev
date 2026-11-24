"use client";

import { toast } from "sonner";

export const ADMIN_TOAST_SUCCESS_DURATION = 4000;
export const ADMIN_TOAST_ERROR_DURATION = 8000;

export function showAdminSuccessToast(message: string, id: string) {
  toast.success(message, {
    id,
    duration: ADMIN_TOAST_SUCCESS_DURATION,
    closeButton: true,
  });
}

export function showAdminErrorToast(message: string, id: string) {
  toast.error(message, {
    id,
    duration: ADMIN_TOAST_ERROR_DURATION,
    closeButton: true,
  });
}
