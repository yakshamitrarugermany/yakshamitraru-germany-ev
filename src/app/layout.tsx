import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yakshamitraru Germany e.V. — Yakshagana across Europe",
  description:
    "Yakshamitraru Germany e.V. is a registered cultural organization presenting Yakshagana — a 400-year-old South Indian dance-theatre — on stages across Europe.",
  authors: [{ name: "Yakshamitraru Germany e.V." }],
  openGraph: {
    title: "Yakshamitraru Germany e.V.",
    description: "Yakshagana dance-theatre, performed across Europe.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-dvh flex flex-col bg-background text-foreground antialiased selection:bg-saffron/30">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
