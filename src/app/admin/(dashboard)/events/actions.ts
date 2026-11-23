"use server";

import { auth } from "@/lib/auth";
import { berlinInputToUtcDate } from "@/lib/events-utils";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eventFormSchema, type EventFormValues } from "./schema";

export type EventActionResult =
  | { success: true; id?: string; slug?: string }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof EventFormValues, string>>;
    };

async function requireAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

async function resolveUniqueSlug(
  baseSlug: string,
  excludeId?: string,
): Promise<string> {
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.event.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || (excludeId && existing.id === excludeId)) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

function isSlugUniqueViolation(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as { code?: string; meta?: { target?: unknown } };
  if (err.code !== "P2002") return false;
  const target = err.meta?.target;
  if (Array.isArray(target)) return target.includes("slug");
  if (typeof target === "string") return target.includes("slug");
  return true;
}

function extractFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Partial<Record<keyof EventFormValues, string>> {
  const fieldErrors: Partial<Record<keyof EventFormValues, string>> = {};
  for (const issue of issues) {
    const key = issue.path[0] as keyof EventFormValues | undefined;
    if (key && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

export async function createEventAction(
  rawInput: EventFormValues,
): Promise<EventActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  const parsed = eventFormSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors: extractFieldErrors(parsed.error.issues),
    };
  }

  const data = parsed.data;
  const startUtc = berlinInputToUtcDate(data.startDate);
  const endUtc = data.endDate ? berlinInputToUtcDate(data.endDate) : null;

  if (!startUtc) {
    return {
      success: false,
      error: "Please enter a valid start date and time.",
      fieldErrors: { startDate: "Please enter a valid start date and time" },
    };
  }

  if (data.endDate && !endUtc) {
    return {
      success: false,
      error: "Please enter a valid end date and time.",
      fieldErrors: { endDate: "Please enter a valid end date and time" },
    };
  }

  try {
    let finalSlug = data.slug;
    if (data.slugManuallyEdited) {
      const existing = await prisma.event.findUnique({
        where: { slug: finalSlug },
        select: { id: true },
      });
      if (existing) {
        return {
          success: false,
          error: "Please check the highlighted fields and try again.",
          fieldErrors: {
            slug: "This slug is already taken. Please choose a different slug.",
          },
        };
      }
    } else {
      finalSlug = await resolveUniqueSlug(finalSlug);
    }

    const created = await prisma.event.create({
      data: {
        title: data.title,
        slug: finalSlug,
        description: data.description,
        eventType: data.eventType,
        startDate: startUtc,
        endDate: endUtc,
        venueName: data.venueName || null,
        address: data.address || null,
        city: data.city || null,
        country: data.country || "Germany",
        bookingRequired: data.bookingRequired,
        status: data.status,
        createdById: session.user.id,
      },
      select: { id: true, slug: true },
    });

    revalidatePath("/admin/events");
    revalidatePath("/events");
    revalidatePath(`/events/${created.slug}`);

    return { success: true, id: created.id, slug: created.slug };
  } catch (err) {
    if (isSlugUniqueViolation(err)) {
      return {
        success: false,
        error: "Please check the highlighted fields and try again.",
        fieldErrors: {
          slug: "This slug is already taken. Please choose a different slug.",
        },
      };
    }
    console.error("Failed to create event:", err);
    return {
      success: false,
      error: "Could not save the event right now. Please try again.",
    };
  }
}

export async function updateEventAction(
  eventId: string,
  rawInput: EventFormValues,
): Promise<EventActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!eventId || typeof eventId !== "string") {
    return { success: false, error: "Invalid event ID." };
  }

  const existing = await prisma.event.findUnique({
    where: { id: eventId },
    select: { id: true, slug: true },
  });
  if (!existing) {
    return { success: false, error: "Event not found." };
  }

  const parsed = eventFormSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors: extractFieldErrors(parsed.error.issues),
    };
  }

  const data = parsed.data;
  const startUtc = berlinInputToUtcDate(data.startDate);
  const endUtc = data.endDate ? berlinInputToUtcDate(data.endDate) : null;

  if (!startUtc) {
    return {
      success: false,
      error: "Please enter a valid start date and time.",
      fieldErrors: { startDate: "Please enter a valid start date and time" },
    };
  }

  if (data.endDate && !endUtc) {
    return {
      success: false,
      error: "Please enter a valid end date and time.",
      fieldErrors: { endDate: "Please enter a valid end date and time" },
    };
  }

  try {
    let finalSlug = data.slug;
    if (data.slugManuallyEdited !== false) {
      const slugOwner = await prisma.event.findUnique({
        where: { slug: finalSlug },
        select: { id: true },
      });
      if (slugOwner && slugOwner.id !== eventId) {
        return {
          success: false,
          error: "Please check the highlighted fields and try again.",
          fieldErrors: {
            slug: "This slug is already taken. Please choose a different slug.",
          },
        };
      }
    } else {
      finalSlug = await resolveUniqueSlug(finalSlug, eventId);
    }

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: data.title,
        slug: finalSlug,
        description: data.description,
        eventType: data.eventType,
        startDate: startUtc,
        endDate: endUtc,
        venueName: data.venueName || null,
        address: data.address || null,
        city: data.city || null,
        country: data.country || "Germany",
        bookingRequired: data.bookingRequired,
        status: data.status,
      },
      select: { id: true, slug: true },
    });

    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/${eventId}/edit`);
    revalidatePath("/events");
    revalidatePath(`/events/${existing.slug}`);
    if (updated.slug !== existing.slug) {
      revalidatePath(`/events/${updated.slug}`);
    }

    return { success: true, id: updated.id, slug: updated.slug };
  } catch (err) {
    if (isSlugUniqueViolation(err)) {
      return {
        success: false,
        error: "Please check the highlighted fields and try again.",
        fieldErrors: {
          slug: "This slug is already taken. Please choose a different slug.",
        },
      };
    }
    console.error("Failed to update event:", err);
    return {
      success: false,
      error: "Could not update the event right now. Please try again.",
    };
  }
}

export async function deleteEventAction(
  eventId: string,
): Promise<EventActionResult> {
  const session = await requireAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin session required." };
  }

  if (!eventId || typeof eventId !== "string") {
    return { success: false, error: "Invalid event ID." };
  }

  try {
    const existing = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, slug: true },
    });

    if (!existing) {
      return { success: false, error: "Event not found." };
    }

    // Related Inquiries and Media keep existing with eventId set to null via onDelete: SetNull
    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/admin/events");
    revalidatePath("/events");
    revalidatePath(`/events/${existing.slug}`);

    return { success: true, id: existing.id, slug: existing.slug };
  } catch (err) {
    console.error("Failed to delete event:", err);
    return {
      success: false,
      error: "Could not delete the event right now. Please try again.",
    };
  }
}
