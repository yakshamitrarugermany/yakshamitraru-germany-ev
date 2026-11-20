import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";

export interface EventItem {
  slug: string;
  organizer: string;
  title: string;
  date: string;
  time: string;
  location: string;
  iso: string;
  city: string;
  country: string;
  image: string;
  status: "upcoming" | "past";
}

export const EVENTS: EventItem[] = [
  {
    slug: "diwali-yakshagana-bonn-2026",
    organizer: "Indian Students Association of Bonn Cologne",
    title: "Diwali — Yakshagana: A Celebration of Karnataka's Traditional Art Form",
    date: "28th November 2026",
    time: "Arrival from 3:30 PM",
    location: "Bonn-Lengsdorf",
    iso: "2026-11-28",
    city: "Bonn-Lengsdorf",
    country: "Germany",
    image: "/images/events/event1.jpg",
    status: "upcoming",
  },
  {
    slug: "kannada-rajyotsava-2026",
    organizer: "Finland Kannada Association RY.",
    title: "Kannada Rajyotsava 2026",
    date: "07th November 2026",
    time: "from 14:00",
    location: "Vattuniemi Primary School, Vattuniemenkatu 00210 Helsinki, Finland",
    iso: "2026-11-07",
    city: "Helsinki",
    country: "Finland",
    image: perf2.url || perf1.url,
    status: "past",
  },
];

export const UPCOMING_EVENTS = EVENTS.filter((e) => e.status === "upcoming");
export const PAST_EVENTS = EVENTS.filter((e) => e.status === "past");
