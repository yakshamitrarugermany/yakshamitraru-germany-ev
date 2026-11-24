import about from "@/assets/about.jpg.asset.json";
import hero from "@/assets/hero.jpg.asset.json";
import perf1 from "@/assets/perf1.jpg.asset.json";
import perf2 from "@/assets/perf2.jpg.asset.json";
import perf3 from "@/assets/perf3.jpg.asset.json";

export interface ArtistItem {
  name: string;
  role: string;
  image: string;
  heroImage: string;
  lines: [string, string];
  href: string;
}

export const ARTISTS: ArtistItem[] = [
  {
    name: "Apurva Beleyur",
    role: "Mummela",
    image: hero.url,
    heroImage: "/images/artists/apurva.jpeg",
    lines: ["Apurva Beleyur", "(Founder)"],
    href: "/artists",
  },
  {
    name: "Shashidhar Nairy",
    role: "Mummela",
    image: perf1.url,
    heroImage: "/images/artists/shashi.jpeg",
    lines: ["Shashidhar", "Nairy"],
    href: "/artists",
  },
  {
    name: "Sushma Ravindra",
    role: "Mummela",
    image: perf2.url,
    heroImage: "/images/artists/sushma.jpg",
    lines: ["Sushma", "Ravindra"],
    href: "/artists",
  },
  {
    name: "Shreehari Hosamane",
    role: "Mummela",
    image: perf3.url,
    heroImage: "/images/artists/shreehari.jpeg",
    lines: ["Shreehari", "Hosamane"],
    href: "/artists",
  },
  {
    name: "Prateek Hegde Bengle",
    role: "Mummela",
    image: about.url,
    heroImage: "/images/artists/prateek.jpeg",
    lines: ["Prateek Hegde", "Bengle"],
    href: "/artists",
  },
];
