import type { Metadata } from "next";
import localFont from "next/font/local";
import { PublicLayoutChrome } from "@/components/admin/PublicLayoutChrome";
import "./globals.css";

const cormorant = localFont({
  src: [
    {
      path: "../fonts/cormorant-garamond/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../fonts/cormorant-garamond/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const manrope = localFont({
  src: "../fonts/manrope/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  style: "normal",
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
        <PublicLayoutChrome>{children}</PublicLayoutChrome>
      </body>
    </html>
  );
}
