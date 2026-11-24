import heroAsset from "@/assets/hero.jpg.asset.json";
import {
  getPublicEvents,
  hasPublicPastEvents,
  parseEventTypeParam,
  parseWhenParam,
} from "@/lib/public-events";
import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events & Tour Dates — Yakshamitraru Germany e.V.",
  description:
    "Yakshagana performances across Germany and Europe. Season calendar, past productions and tour map from Yakshamitraru Germany e.V.",
  openGraph: {
    title: "Events & Tour Dates — Yakshamitraru Germany e.V.",
    description:
      "Season calendar, past productions and tour map. Book Yakshagana for a European stage.",
    images: [{ url: heroAsset.url }],
  },
  twitter: {
    images: [heroAsset.url],
  },
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{
    when?: string | string[];
    type?: string | string[];
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const when = parseWhenParam(resolvedSearchParams.when);
  const type = parseEventTypeParam(resolvedSearchParams.type);

  const events = await getPublicEvents({ when, type });
  const hasPastEvents =
    when === "upcoming" && events.length === 0
      ? await hasPublicPastEvents()
      : false;

  return (
    <EventsClient
      events={events}
      when={when}
      type={type}
      hasPastEvents={hasPastEvents}
    />
  );
}
