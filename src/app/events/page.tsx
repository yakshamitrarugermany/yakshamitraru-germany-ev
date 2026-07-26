import type { Metadata } from "next";
import EventsClient from "./EventsClient";
import heroAsset from "@/assets/hero.jpg.asset.json";

export const metadata: Metadata = {
  title: "Events & Tour Dates — Yakshamitraru Germany e.V.",
  description:
    "Yakshagana performances across Germany and Europe. Season calendar, past productions and tour map from Yakshamitraru Germany e.V.",
  openGraph: {
    title: "Events & Tour Dates — Yakshamitraru Germany e.V.",
    description: "Season calendar, past productions and tour map. Book Yakshagana for a European stage.",
    images: [{ url: heroAsset.url }],
  },
  twitter: {
    images: [heroAsset.url],
  },
};

export default function EventsPage() {
  return <EventsClient />;
}
