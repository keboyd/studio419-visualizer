import type { SavedSetup } from "@/data/types";

export function exportFigmaNotes(setup: SavedSetup) {
  return `Figma Notes\n\nCreate variable collections for app mode and hero mode. Add color variables for light, dark, and brand mode using the token package below. Type anchors should become text style notes until typography variables are formalized.\n\n${JSON.stringify(setup.tokens, null, 2)}`;
}
