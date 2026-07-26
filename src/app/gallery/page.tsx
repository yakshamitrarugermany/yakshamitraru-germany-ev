import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import heroAsset from "@/assets/hero.jpg.asset.json";

export const metadata: Metadata = {
  title: "Gallery — Yakshamitraru Germany e.V.",
  description:
    "Photographs and film from Yakshamitraru Germany's Yakshagana performances, rehearsals and backstage moments across Europe.",
  openGraph: {
    title: "Gallery — Yakshamitraru Germany e.V.",
    description: "An immersive gallery of stage, studio and street from our European tour.",
    images: [{ url: heroAsset.url }],
  },
  twitter: {
    images: [heroAsset.url],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
