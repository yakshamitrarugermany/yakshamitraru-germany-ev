import { INQUIRY_TYPE_VALUES } from "@/lib/inquiries-utils";
import {
  DEFAULT_PHONE_COUNTRY,
  INVALID_PHONE_MESSAGE,
  parseAndValidatePhone,
} from "@/lib/phone";
import { isSupportedCountry } from "libphonenumber-js/min";
import { z } from "zod";

export const BOOKING_EVENT_TYPES = [
  "Full production",
  "Festival slot",
  "Private event",
  "Indian Embassy Event",
  "Deutsch Indische Verein",
  "University event",
  "Concert set",
  "Workshop / lecture",
  "Other",
] as const;

export const AUDIENCE_SIZES = [
  "Under 50",
  "50–100",
  "100–150",
  "150+",
] as const;

export const inquiryFormSchema = z
  .object({
    inquiryType: z.enum(INQUIRY_TYPE_VALUES).optional(),
    name: z
      .string()
      .trim()
      .min(2, "Please share your name (at least 2 characters)")
      .max(100, "Name must be at most 100 characters"),
    organization: z
      .string()
      .trim()
      .max(160, "Organisation must be at most 160 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address")
      .email("Please enter a valid email address")
      .max(255, "Email must be at most 255 characters"),
    phoneCountry: z
      .string()
      .trim()
      .default(DEFAULT_PHONE_COUNTRY)
      .refine((val) => isSupportedCountry(val), INVALID_PHONE_MESSAGE),
    phone: z.string().trim().max(40, INVALID_PHONE_MESSAGE),
    city: z
      .string()
      .trim()
      .max(120, "City / Venue must be at most 120 characters"),
    requestedEventType: z.string().trim().max(80),
    dateMode: z.enum(["exact", "custom"]),
    dateExact: z.string().trim().max(60),
    dateCustom: z.string().trim().max(60),
    expectedAudience: z.string().trim().max(40),
    message: z
      .string()
      .trim()
      .min(10, "A short brief (at least 10 characters) helps us respond well")
      .max(3000, "Message must be at most 3000 characters"),
    consentGiven: z
      .boolean()
      .refine(
        (v) => v === true,
        "Please agree that we may use your details to respond to this inquiry",
      ),
    eventSlug: z.string().trim().max(160).optional(),
    // Hidden honeypot field — must stay empty for real submissions
    website: z.string().max(200).optional(),
  })
  .superRefine((data, ctx) => {
    const result = parseAndValidatePhone(data.phone, data.phoneCountry);
    if (!result.valid) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: INVALID_PHONE_MESSAGE,
      });
    }
  });

export type InquiryFormValues = z.input<typeof inquiryFormSchema>;
