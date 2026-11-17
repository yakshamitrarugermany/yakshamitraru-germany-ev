import { BookSection } from "@/components/site/BookSection";
import { Hero } from "@/components/site/Hero";

import type { Metadata } from "next";

import heroAsset from "@/assets/hero.jpg.asset.json";
import { SectionSeparator } from "@/components/site/Section";
import { UpcomingPerformanceDefault } from "@/components/site/UpcomingPerformanceDefualt";

export const metadata: Metadata = {
  title: "Yakshamitraru Germany e.V. — Yakshagana across Europe",
  description:
    "A registered German cultural association bringing Yakshagana — the 400-year-old dance-theatre of India — to stages across Europe. Book a performance.",
  openGraph: {
    title: "Yakshamitraru Germany e.V. — Yakshagana across Europe",
    description:
      "Ancient dance-theatre. Modern European stages. Book a Yakshagana performance with Yakshamitraru Germany e.V.",
    images: [{ url: heroAsset.url }],
  },
  twitter: {
    images: [heroAsset.url],
  },
};

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        {/* <UpcomingPerformance /> */}
        <UpcomingPerformanceDefault />
        {/* <SectionSeparator /> */}
        {/* <Testimonials />
        <SectionSeparator />
        <AboutSection />
        <SectionSeparator />
        <FeaturedArtists />
        <SectionSeparator />
        <GalleryPreview />
        <Mission /> */}
        <BookSection />
        <SectionSeparator />
        {/* <Newsletter /> */}
      </main>
    </>
  );
}
