import type { Metadata } from "next";
import ArtistsClient from "./ArtistsClient";
import heroAsset from "@/assets/hero.jpg.asset.json";

export const metadata: Metadata = {
  title: "Artists & Ensemble — Yakshamitraru Germany e.V.",
  description:
    "Meet the artists of Yakshamitraru Germany e.V. — vesha, bhagavata, chende and maddale performers bringing Yakshagana to European stages.",
  openGraph: {
    title: "Artists & Ensemble — Yakshamitraru Germany e.V.",
    description:
      "The performers, musicians and himmela artists of Yakshamitraru Germany e.V.",
    images: [{ url: heroAsset.url }],
  },
  twitter: {
    images: [heroAsset.url],
  },
};

export default function ArtistsPage() {
  return <ArtistsClient />;
}
