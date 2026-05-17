import type { SavedSetup } from "@/data/types";
import { migratePreset } from "@/lib/presets/migratePreset";

export function exportPresetLibrary(setups: SavedSetup[]) {
  return JSON.stringify(
    {
      type: "studio419.visualizer-library",
      version: "0.1.0",
      exportedAt: new Date().toISOString(),
      setups
    },
    null,
    2
  );
}

export function importPresetLibrary(text: string) {
  const parsed = JSON.parse(text) as { setups?: unknown[] };
  return (parsed.setups || []).map(migratePreset).filter(Boolean) as SavedSetup[];
}
