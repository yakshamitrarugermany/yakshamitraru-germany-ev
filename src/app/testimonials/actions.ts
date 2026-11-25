"use server";

import { prisma } from "@/lib/prisma";
import {
  testimonialFormSchema,
  type TestimonialFormInput,
} from "./schema";

export type SubmitTestimonialResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof TestimonialFormInput, string>>;
    };

export async function submitTestimonialAction(
  rawInput: TestimonialFormInput,
): Promise<SubmitTestimonialResult> {
  // Silently succeed if the hidden honeypot field is filled
  if (
    rawInput &&
    typeof rawInput.website === "string" &&
    rawInput.website.trim().length > 0
  ) {
    return { success: true };
  }

  const parsed = testimonialFormSchema.safeParse(rawInput);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof TestimonialFormInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof TestimonialFormInput | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      success: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Enforce consentGiven = true explicitly on the server
  if (data.consentGiven !== true) {
    return {
      success: false,
      error:
        "Please agree that your review, together with your name, role, event and city, may be published on this website.",
      fieldErrors: {
        consentGiven:
          "Please agree that your review, together with your name, role, event and city, may be published on this website",
      },
    };
  }

  const normalizedEmail = data.email.trim().toLowerCase();

  try {
    // Rate-limit per email: reject if 3 or more submissions in the last 24 hours (any status)
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await prisma.testimonial.count({
      where: {
        email: {
          equals: normalizedEmail,
          mode: "insensitive",
        },
        createdAt: {
          gte: since,
        },
      },
    });

    if (recentCount >= 3) {
      return {
        success: false,
        error:
          "You have already submitted several reviews in the last 24 hours. Please try again tomorrow.",
      };
    }

    // Always insert with status PENDING — never set APPROVED from the form
    await prisma.testimonial.create({
      data: {
        name: data.name,
        email: normalizedEmail,
        role: data.role,
        event: data.event,
        city: data.city,
        text: data.text,
        consentGiven: true,
        status: "PENDING",
      },
    });

    return { success: true };
  } catch (err) {
    console.error("[testimonials] Failed to save testimonial submission.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error:
        "We could not save your review right now. Please try again in a moment.",
    };
  }
}
