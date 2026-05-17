import type { FontPair } from "@/data/types";

export function parseFontPair(pair: string): FontPair {
  const [headline, body] = pair.split(/\s+&\s+/);
  return {
    headline: headline || pair,
    body: body || headline || pair
  };
}

export function googleFontsHref(pair: string) {
  const fonts = [...new Set(Object.values(parseFontPair(pair)))];
  const families = fonts.map((font) => `family=${font.replace(/\s+/g, "+")}:wght@300;400;500;600;700;800;900`).join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
