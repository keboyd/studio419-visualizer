import type { SavedSetup } from "@/data/types";

export function exportFramerPrompt(setup: SavedSetup) {
  return `Create a responsive hero section for Studio419 using this token package. Preserve the font pairing, color roles, responsive type anchors, CTA radius, and spacing values. Use semantic CSS variables rather than hard-coded colors.\n\n${JSON.stringify(setup, null, 2)}`;
}
