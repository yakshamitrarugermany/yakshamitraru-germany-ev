import {
  berlinInputToUtcDate,
  EVENT_TYPE_VALUES,
  POST_STATUS_VALUES,
  SLUG_REGEX,
} from "@/lib/events-utils";
import { z } from "zod";

export const eventFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(120, "Title must be at most 120 characters"),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .max(160, "Slug must be at most 160 characters")
      .regex(
        SLUG_REGEX,
        "Slug must contain only lowercase letters, numbers, and single hyphens",
      ),
    slugManuallyEdited: z.boolean().optional(),
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(5000, "Description must be at most 5000 characters"),
    eventType: z.enum(EVENT_TYPE_VALUES),
    startDate: z
      .string()
      .trim()
      .min(1, "Start date and time are required")
      .refine(
        (val) => berlinInputToUtcDate(val) !== null,
        "Please enter a valid start date and time",
      ),
    endDate: z
      .string()
      .trim()
      .refine(
        (val) => val === "" || berlinInputToUtcDate(val) !== null,
        "Please enter a valid end date and time",
      ),
    venueName: z
      .string()
      .trim()
      .max(200, "Venue name must be at most 200 characters"),
    address: z
      .string()
      .trim()
      .max(300, "Address must be at most 300 characters"),
    city: z.string().trim().max(120, "City must be at most 120 characters"),
    country: z
      .string()
      .trim()
      .min(1, "Country is required")
      .max(120, "Country must be at most 120 characters"),
    bookingRequired: z.boolean(),
    status: z.enum(POST_STATUS_VALUES),
  })
  .superRefine((data, ctx) => {
    if (data.endDate) {
      const start = berlinInputToUtcDate(data.startDate);
      const end = berlinInputToUtcDate(data.endDate);
      if (start && end && end.getTime() < start.getTime()) {
        ctx.addIssue({
          code: "custom",
          path: ["endDate"],
          message: "End date must not be before start date",
        });
      }
    }
  });

export type EventFormValues = z.infer<typeof eventFormSchema>;
