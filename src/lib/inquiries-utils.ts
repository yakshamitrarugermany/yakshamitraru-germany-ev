import type { InquiryStatus, InquiryType } from "@/generated/prisma/enums";

export const INQUIRY_TYPE_VALUES = [
  "EVENT_BOOKING",
  "GENERAL",
] as const satisfies readonly InquiryType[];

export const INQUIRY_TYPE_LABELS: Record<InquiryType, string> = {
  EVENT_BOOKING: "Event booking",
  GENERAL: "General",
};

export const INQUIRY_STATUS_VALUES = [
  "NEW",
  "CONTACTED",
  "CLOSED",
] as const satisfies readonly InquiryStatus[];

export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  CLOSED: "Closed",
};

/**
 * Strips CR/LF characters so user input can never inject email headers or split subjects.
 */
export function stripHeaderLineBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function resolveInquiryType(input: {
  inquiryType?: InquiryType;
  eventId?: string | null;
  requestedEventType?: string | null;
  city?: string | null;
  preferredDate?: string | null;
  expectedAudience?: string | null;
}): InquiryType {
  if (input.inquiryType) {
    return input.inquiryType;
  }

  const hasBookingDetails =
    Boolean(input.eventId) ||
    Boolean(input.preferredDate?.trim()) ||
    Boolean(input.city?.trim()) ||
    Boolean(input.expectedAudience?.trim()) ||
    (Boolean(input.requestedEventType?.trim()) &&
      input.requestedEventType?.trim() !== "Other");

  return hasBookingDetails ? "EVENT_BOOKING" : "GENERAL";
}
