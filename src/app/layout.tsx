import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
