import type { SavedSetup, VisualizerState } from "@/data/types";

export function loadPreset(setup: SavedSetup): VisualizerState {
  return setup.state;
}
