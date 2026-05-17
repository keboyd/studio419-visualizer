import type { SavedSetup } from "@/data/types";
import { brandDisclaimer, isBrandInspired } from "@/data/brandEnrichment";

export function exportAiBrief(setup: SavedSetup) {
  const palette = setup.state.paletteName;
  const disclaimer = isBrandInspired(undefined, undefined, palette.startsWith("Brand /")) ? `\n\n${brandDisclaimer}` : "";

  return `AI + Dev Brief\n\nName: ${setup.name}\nFont pair: ${setup.state.pair}\nPalette: ${palette}\nColor usage: Light=${setup.state.colorUsageByMode.light}, Dark=${setup.state.colorUsageByMode.dark}, Brand=${setup.state.colorUsageByMode.brand}\n\nHero copy:\nEyebrow: ${setup.state.copy.eyebrow}\nHeadline: ${setup.state.copy.headline}\nBody: ${setup.state.copy.body}\nCTA: ${setup.state.copy.cta}\n\nMachine-readable token package:\n${JSON.stringify(setup, null, 2)}${disclaimer}`;
}
