import { z } from "zod";

export const TESTIMONIAL_ROLES = [
  "Host",
  "Audience member",
  "Organiser",
  "Fellow artist",
  "Other",
] as const;

export type TestimonialRole = (typeof TESTIMONIAL_ROLES)[number];

export const testimonialFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please share your name (at least 2 characters)")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address")
    .max(255, "Email must be 255 characters or fewer"),
  role: z
    .string()
    .refine(
      (val): val is TestimonialRole =>
        (TESTIMONIAL_ROLES as readonly string[]).includes(val),
      { message: "Please select your role" },
    ),
  event: z
    .string()
    .trim()
    .min(2, "Please enter the event or venue (at least 2 characters)")
    .max(120, "Event or venue must be 120 characters or fewer"),
  city: z
    .string()
    .trim()
    .min(2, "Please enter the city (at least 2 characters)")
    .max(80, "City must be 80 characters or fewer"),
  text: z
    .string()
    .trim()
    .min(30, "Please share at least 30 characters about your experience")
    .max(1500, "Review must be 1500 characters or fewer"),
  consentGiven: z.boolean().refine((val) => val === true, {
    message:
      "Please agree that your review, together with your name, role, event and city, may be published on this website",
  }),
  website: z.string().optional().or(z.literal("")),
});

export type TestimonialFormInput = z.input<typeof testimonialFormSchema>;
export type TestimonialFormOutput = z.output<typeof testimonialFormSchema>;
