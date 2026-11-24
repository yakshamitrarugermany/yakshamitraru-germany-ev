"use server";

import type { InquiryStatus } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { INQUIRY_STATUS_VALUES } from "@/lib/inquiries-utils";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export type InquiryAdminActionResult =
  | { success: true }
  | { success: false; error: string };

async function requireAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function updateInquiryStatusAction(
  inquiryId: string,
  status: InquiryStatus,
): Promise<InquiryAdminActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!inquiryId || typeof inquiryId !== "string") {
    return { success: false, error: "Invalid inquiry ID." };
  }

  if (!INQUIRY_STATUS_VALUES.includes(status)) {
    return { success: false, error: "Invalid inquiry status." };
  }

  try {
    const existing = await prisma.inquiry.findUnique({
      where: { id: inquiryId },
      select: { id: true },
    });
    if (!existing) {
      return { success: false, error: "Inquiry not found." };
    }

    await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status },
    });

    revalidatePath("/admin/inquiries");
    revalidatePath(`/admin/inquiries/${inquiryId}`);

    return { success: true };
  } catch (err) {
    console.error("[admin/inquiries] Failed to update inquiry status.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error: "Could not update the status right now. Please try again.",
    };
  }
}

export async function deleteInquiryAction(
  inquiryId: string,
): Promise<InquiryAdminActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!inquiryId || typeof inquiryId !== "string") {
    return { success: false, error: "Invalid inquiry ID." };
  }

  try {
    const existing = await prisma.inquiry.findUnique({
      where: { id: inquiryId },
      select: { id: true },
    });
    if (!existing) {
      return { success: false, error: "Inquiry not found." };
    }

    await prisma.inquiry.delete({
      where: { id: inquiryId },
    });

    revalidatePath("/admin/inquiries");
    revalidatePath(`/admin/inquiries/${inquiryId}`);

    return { success: true };
  } catch (err) {
    console.error("[admin/inquiries] Failed to delete inquiry.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error: "Could not delete the inquiry right now. Please try again.",
    };
  }
}
