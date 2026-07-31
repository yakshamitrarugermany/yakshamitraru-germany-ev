import { AboutSection } from "@/components/site/AboutSection";
import { BookSection } from "@/components/site/BookSection";
import { FeaturedArtists } from "@/components/site/FeaturedArtists";
import { Hero } from "@/components/site/Hero";
import { Mission } from "@/components/site/Mission";
import { PageContainer } from "@/components/site/PageContainer";
import { UpcomingPerformance } from "@/components/site/UpcomingPerformance";
import type { Metadata } from "next";

import heroAsset from "@/assets/hero.jpg.asset.json";
import { GalleryPreview } from "@/components/site/GalleryPreview";
import { Newsletter } from "@/components/site/Newsletter";
import { SectionSeparator } from "@/components/site/Section";
import { Testimonials } from "@/components/site/Testimonials";

export const metadata: Metadata = {
  title: "Yakshamitraru Germany e.V. — Yakshagana across Europe",
  description:
    "A registered German cultural association bringing Yakshagana — the 400-year-old dance-theatre of coastal Karnataka — to stages across Europe. Book a performance.",
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
    <PageContainer>
      <main>
        <Hero />
        <UpcomingPerformance />
        <SectionSeparator />
        <Testimonials />
        <SectionSeparator />
        <AboutSection />
        <SectionSeparator />
        <FeaturedArtists />
        <SectionSeparator />
        <GalleryPreview />
        <SectionSeparator />
        <Mission />
        <BookSection />
        <Newsletter />
      </main>
    </PageContainer>
  );
}
