import { z } from "zod";

export const TESTIMONIAL_ROLES = [
  "Host",
  "Audience member",
  "Organiser",
  "Fellow artist",
  "Other",
] as const;

export const DISPLAY_NAME_MODES = ["FULL", "FIRST"] as const;

export const testimonialFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please share your name (at least 2 characters)")
    .max(120, "Name must be 120 characters or fewer"),
  displayNameMode: z.enum(DISPLAY_NAME_MODES),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be 255 characters or fewer"),
  role: z.enum(TESTIMONIAL_ROLES, {
    message: "Please select your role",
  }),
  event: z
    .string()
    .trim()
    .max(160, "Event or venue must be 160 characters or fewer")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .max(120, "City must be 120 characters or fewer")
    .optional()
    .or(z.literal("")),
  text: z
    .string()
    .trim()
    .min(30, "Please share at least 30 characters about your experience")
    .max(1500, "Review must be 1500 characters or fewer"),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: "Please agree that your review may be published on this website",
  }),
  website: z.string().optional().or(z.literal("")),
});

export type TestimonialFormInput = z.infer<typeof testimonialFormSchema>;
