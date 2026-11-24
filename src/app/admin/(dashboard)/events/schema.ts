import {
  EVENT_TYPE_VALUES,
  MAX_EVENT_ARTIST_NAME_LENGTH,
  MAX_EVENT_ARTISTS,
  parseCalendarDateToUtcDate,
  POST_STATUS_VALUES,
  SLUG_REGEX,
} from "@/lib/events-utils";
import { z } from "zod";

export const eventFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Event name must be at least 3 characters")
    .max(120, "Event name must be at most 120 characters"),
  yakshaganaTitle: z
    .string()
    .trim()
    .max(160, "Yakshagana title must be at most 160 characters"),
  organisedBy: z
    .string()
    .trim()
    .max(160, "Organised by must be at most 160 characters"),
  artists: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Artist name cannot be empty")
        .max(
          MAX_EVENT_ARTIST_NAME_LENGTH,
          `Each artist name must be at most ${MAX_EVENT_ARTIST_NAME_LENGTH} characters`,
        ),
    )
    .max(MAX_EVENT_ARTISTS, `You can add at most ${MAX_EVENT_ARTISTS} artists`),
  slug: z
    .string()
    .trim()
    .min(1, "Page link is required")
    .max(160, "Page link must be at most 160 characters")
    .regex(
      SLUG_REGEX,
      "Page link must contain only lowercase letters, numbers, and single hyphens",
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
    .min(1, "Event date is required")
    .refine(
      (val) => parseCalendarDateToUtcDate(val) !== null,
      "Please enter a valid event date",
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
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
