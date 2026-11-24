import heroAsset from "@/assets/hero.jpg.asset.json";
import type { LinkedEventPreview } from "@/components/site/EnquiryForm";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Book — Yakshamitraru Germany e.V.",
  description:
    "Book Yakshagana for your stage in Europe. Enquiry form, WhatsApp, direct contact and address of Yakshamitraru Germany e.V.",
  openGraph: {
    title: "Contact & Book — Yakshamitraru Germany e.V.",
    description:
      "Enquiry form, WhatsApp and direct contact for performances across Europe.",
    images: [{ url: heroAsset.url }],
  },
  twitter: {
    images: [heroAsset.url],
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string | string[] }>;
}) {
  const resolved = await searchParams;
  const rawSlug = Array.isArray(resolved.event)
    ? resolved.event[0]
    : resolved.event;
  const slug = rawSlug?.trim();

  let linkedEvent: LinkedEventPreview | null = null;
  if (slug && process.env.DATABASE_URL?.trim()) {
    try {
      const found = await prisma.event.findFirst({
        where: {
          slug,
          status: "PUBLISHED",
        },
        select: {
          slug: true,
          title: true,
        },
      });
      if (found) {
        linkedEvent = found;
      }
    } catch {
      // Ignore DB lookup errors so the contact page still renders cleanly
    }
  }

  return <ContactClient linkedEvent={linkedEvent} />;
}
