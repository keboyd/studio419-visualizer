import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Font Pair & Palette Visualizer",
  description:
    "Studio419 / Future Craft tool for exploring font pairings and color palettes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
