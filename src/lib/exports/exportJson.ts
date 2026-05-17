import type { SavedSetup } from "@/data/types";

export function exportJson(setup: SavedSetup) {
  return JSON.stringify(
    {
      summary: {
        name: setup.name,
        pairing: setup.state.pair,
        palette: setup.state.paletteName,
        modes: setup.state.colorUsageByMode
      },
      tokenPackage: setup
    },
    null,
    2
  );
}
