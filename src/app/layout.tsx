import type { Metadata } from "next";
import { Geist, PT_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt_serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PokeAPI Nextlane Sergio Carrascosa",
  description: "Technical Test: Interactive Pokémon Gallery with React/Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${ptSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
