"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const updateTestimonialNameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(100, "Name must be 100 characters or fewer.");

export type TestimonialAdminActionResult =
  | { success: true }
  | { success: false; error: string };

export type MoveTestimonialActionResult =
  | { success: true; newPosition: number; total: number }
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

export async function approveTestimonialAction(
  testimonialId: string,
): Promise<TestimonialAdminActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!testimonialId || typeof testimonialId !== "string") {
    return { success: false, error: "Invalid review ID." };
  }

  try {
    const outcome = await prisma.$transaction(async (tx) => {
      const existing = await tx.testimonial.findUnique({
        where: { id: testimonialId },
        select: { id: true, status: true },
      });

      if (!existing) {
        return { found: false as const };
      }

      if (existing.status === "APPROVED") {
        return { found: true as const };
      }

      const maxAgg = await tx.testimonial.aggregate({
        where: { status: "APPROVED" },
        _max: { sortOrder: true },
      });

      const nextSortOrder = (maxAgg._max.sortOrder ?? 0) + 1;

      await tx.testimonial.update({
        where: { id: testimonialId },
        data: {
          status: "APPROVED",
          sortOrder: nextSortOrder,
        },
      });

      return { found: true as const };
    });

    if (!outcome.found) {
      return { success: false, error: "Review not found." };
    }

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return { success: true };
  } catch (err) {
    console.error("[admin/testimonials] Failed to approve testimonial.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error: "Could not approve the review right now. Please try again.",
    };
  }
}

export async function rejectTestimonialAction(
  testimonialId: string,
): Promise<TestimonialAdminActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!testimonialId || typeof testimonialId !== "string") {
    return { success: false, error: "Invalid review ID." };
  }

  try {
    const existing = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: { id: true },
    });

    if (!existing) {
      return { success: false, error: "Review not found." };
    }

    await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        status: "REJECTED",
        sortOrder: 0,
      },
    });

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return { success: true };
  } catch (err) {
    console.error("[admin/testimonials] Failed to reject testimonial.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error: "Could not update the review right now. Please try again.",
    };
  }
}

export async function moveTestimonialAction(
  testimonialId: string,
  direction: "up" | "down",
): Promise<MoveTestimonialActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!testimonialId || typeof testimonialId !== "string") {
    return { success: false, error: "Invalid review ID." };
  }

  if (direction !== "up" && direction !== "down") {
    return { success: false, error: "Invalid move direction." };
  }

  try {
    const outcome = await prisma.$transaction(async (tx) => {
      const approvedRows = await tx.testimonial.findMany({
        where: { status: "APPROVED" },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }, { id: "asc" }],
        select: { id: true },
      });

      const currentIndex = approvedRows.findIndex(
        (row) => row.id === testimonialId,
      );
      if (currentIndex === -1) {
        return { found: false as const };
      }

      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex < 0 || targetIndex >= approvedRows.length) {
        return {
          found: true as const,
          newPosition: currentIndex + 1,
          total: approvedRows.length,
        };
      }

      const reordered = [...approvedRows];
      const [moved] = reordered.splice(currentIndex, 1);
      reordered.splice(targetIndex, 0, moved);

      // Renumber all APPROVED reviews 1..n in one transaction after swapping neighbours
      for (let i = 0; i < reordered.length; i += 1) {
        await tx.testimonial.update({
          where: { id: reordered[i].id },
          data: { sortOrder: i + 1 },
        });
      }

      return {
        found: true as const,
        newPosition: targetIndex + 1,
        total: reordered.length,
      };
    });

    if (!outcome.found) {
      return { success: false, error: "Approved review not found." };
    }

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return {
      success: true,
      newPosition: outcome.newPosition,
      total: outcome.total,
    };
  } catch (err) {
    console.error("[admin/testimonials] Failed to reorder testimonial.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error: "Could not reorder the review right now. Please try again.",
    };
  }
}

export async function updateTestimonialNameAction(
  testimonialId: string,
  rawName: string,
): Promise<TestimonialAdminActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!testimonialId || typeof testimonialId !== "string") {
    return { success: false, error: "Invalid review ID." };
  }

  const parsed = updateTestimonialNameSchema.safeParse(rawName);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Please enter a valid name.",
    };
  }

  try {
    const existing = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: { id: true },
    });

    if (!existing) {
      return { success: false, error: "Review not found." };
    }

    await prisma.testimonial.update({
      where: { id: testimonialId },
      data: { name: parsed.data },
    });

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return { success: true };
  } catch (err) {
    console.error("[admin/testimonials] Failed to update testimonial name.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error: "Could not update the name right now. Please try again.",
    };
  }
}

export async function deleteTestimonialAction(
  testimonialId: string,
): Promise<TestimonialAdminActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!testimonialId || typeof testimonialId !== "string") {
    return { success: false, error: "Invalid review ID." };
  }

  try {
    const existing = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: { id: true },
    });

    if (!existing) {
      return { success: false, error: "Review not found." };
    }

    await prisma.testimonial.delete({
      where: { id: testimonialId },
    });

    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return { success: true };
  } catch (err) {
    console.error("[admin/testimonials] Failed to delete testimonial.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error: "Could not delete the review right now. Please try again.",
    };
  }
}
