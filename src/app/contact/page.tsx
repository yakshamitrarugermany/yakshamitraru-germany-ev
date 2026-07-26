import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import heroAsset from "@/assets/hero.jpg.asset.json";

export const metadata: Metadata = {
  title: "Contact & Book — Yakshamitraru Germany e.V.",
  description:
    "Book Yakshagana for your stage in Europe. Enquiry form, WhatsApp, direct contact and address of Yakshamitraru Germany e.V.",
  openGraph: {
    title: "Contact & Book — Yakshamitraru Germany e.V.",
    description: "Enquiry form, WhatsApp and direct contact for performances across Europe.",
    images: [{ url: heroAsset.url }],
  },
  twitter: {
    images: [heroAsset.url],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
