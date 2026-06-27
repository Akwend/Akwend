import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akwend — Creative Developer",
  description:
    "Portfolio de Kelyan Leroy, développeur web passionné par la technologie, le design et l'innovation.",
  keywords: ["développeur web", "frontend", "portfolio", "creative developer"],
  openGraph: {
    title: "Akwend — Creative Developer",
    description: "Portfolio interactif d'un développeur web passionné.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
