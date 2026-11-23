"use server";

import { sendInquiryEmails } from "@/lib/email";
import {
  resolveInquiryType,
  stripHeaderLineBreaks,
} from "@/lib/inquiries-utils";
import { INVALID_PHONE_MESSAGE, parseAndValidatePhone } from "@/lib/phone";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { inquiryFormSchema, type InquiryFormValues } from "./schema";

export type SubmitInquiryResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof InquiryFormValues, string>>;
    };

const MAX_INQUIRIES_PER_EMAIL_24H = 5;

export async function submitInquiryAction(
  rawInput: InquiryFormValues,
): Promise<SubmitInquiryResult> {
  // Silently succeed if the hidden honeypot field is filled
  if (
    rawInput &&
    typeof rawInput.website === "string" &&
    rawInput.website.trim().length > 0
  ) {
    return { success: true };
  }

  const parsed = inquiryFormSchema.safeParse(rawInput);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof InquiryFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof InquiryFormValues | undefined;
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
        "Please agree that we may use your details to respond to this inquiry.",
      fieldErrors: {
        consentGiven:
          "Please agree that we may use your details to respond to this inquiry",
      },
    };
  }

  // Re-parse and re-validate phone on the server; always persist server-formatted E.164
  const parsedPhone = parseAndValidatePhone(data.phone, data.phoneCountry);
  if (!parsedPhone.valid) {
    return {
      success: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors: {
        phone: INVALID_PHONE_MESSAGE,
      },
    };
  }
  const phoneE164 = parsedPhone.e164;

  const normalizedEmail = data.email.trim().toLowerCase();
  const safeName = stripHeaderLineBreaks(data.name);
  const preferredDate =
    (data.dateMode === "exact" ? data.dateExact : data.dateCustom)?.trim() ||
    null;

  let savedInquiry: {
    id: string;
    type: "EVENT_BOOKING" | "GENERAL";
    linkedEventTitle: string | null;
  };

  try {
    // Rate-limit per email: reject if 5 or more inquiries in the last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await prisma.inquiry.count({
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

    if (recentCount >= MAX_INQUIRIES_PER_EMAIL_24H) {
      return {
        success: false,
        error:
          "You have already sent several inquiries in the last 24 hours. Please wait a little while before sending another one.",
      };
    }

    // Only link to PUBLISHED events if an event slug was provided
    let linkedEvent: { id: string; title: string } | null = null;
    if (data.eventSlug) {
      linkedEvent = await prisma.event.findFirst({
        where: {
          slug: data.eventSlug,
          status: "PUBLISHED",
        },
        select: { id: true, title: true },
      });
    }

    const inquiryType = resolveInquiryType({
      inquiryType: data.inquiryType,
      eventId: linkedEvent?.id ?? null,
      requestedEventType: data.requestedEventType,
      city: data.city,
      preferredDate,
      expectedAudience: data.expectedAudience,
    });

    // Save the inquiry FIRST with status NEW
    const created = await prisma.inquiry.create({
      data: {
        type: inquiryType,
        name: safeName,
        email: normalizedEmail,
        phone: phoneE164,
        organization: data.organization || null,
        city: data.city || null,
        requestedEventType: data.requestedEventType || null,
        preferredDate,
        expectedAudience: data.expectedAudience || null,
        message: data.message,
        eventId: linkedEvent?.id ?? null,
        consentGiven: true,
        status: "NEW",
      },
      select: { id: true, type: true },
    });

    savedInquiry = {
      id: created.id,
      type: created.type,
      linkedEventTitle: linkedEvent?.title ?? null,
    };

    revalidatePath("/admin/inquiries");
  } catch (err) {
    console.error("[inquiry] Failed to save inquiry to database.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
    return {
      success: false,
      error:
        "We could not submit your inquiry right now. Please try again in a moment.",
    };
  }

  // Send emails after saving — failures must NOT fail the visitor's submission
  try {
    await sendInquiryEmails({
      inquiryId: savedInquiry.id,
      type: savedInquiry.type,
      name: safeName,
      email: normalizedEmail,
      phone: phoneE164,
      organization: data.organization || null,
      city: data.city || null,
      requestedEventType: data.requestedEventType || null,
      preferredDate,
      expectedAudience: data.expectedAudience || null,
      linkedEventTitle: savedInquiry.linkedEventTitle,
      message: data.message,
    });
  } catch (err) {
    console.error("[inquiry] Unexpected error in email dispatch.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
  }

  return { success: true };
}
