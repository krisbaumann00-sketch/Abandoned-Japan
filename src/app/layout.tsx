import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abandoned Japan — Seto Inland Sea Conservation",
  description:
    "Documenting, preserving, and gently reviving the abandoned islands, traditional villages, and akiya of rural Japan. Respectful storytelling, interactive mapping, and direct connections to local conservation efforts.",
  keywords: [
    "abandoned Japan",
    "akiya",
    "Seto Inland Sea",
    "Japanese islands",
    "rural revival",
    "conservation",
    "Takaikamishima",
    "wabi-sabi",
  ],
  openGraph: {
    title: "Abandoned Japan — Seto Inland Sea Conservation",
    description:
      "Turning abandonment into awareness, and awareness into action.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
