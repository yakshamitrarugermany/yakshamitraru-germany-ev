import type { Metadata } from "next";
import { PageContainer } from "@/components/site/PageContainer";
import { Hero } from "@/components/site/Hero";
import { Mission } from "@/components/site/Mission";
import { BookSection } from "@/components/site/BookSection";
import { UpcomingPerformance } from "@/components/site/UpcomingPerformance";
import { FeaturedArtists } from "@/components/site/FeaturedArtists";
import { UpcomingEvents } from "@/components/site/UpcomingEvents";
import { GalleryPreview } from "@/components/site/GalleryPreview";
import { Testimonials } from "@/components/site/Testimonials";
import { Newsletter } from "@/components/site/Newsletter";
import heroAsset from "@/assets/hero.jpg.asset.json";

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
        <Mission />
        <FeaturedArtists />
        <UpcomingEvents />
        <GalleryPreview />
        <Testimonials />
        <BookSection />
        <Newsletter />
      </main>
    </PageContainer>
  );
}
