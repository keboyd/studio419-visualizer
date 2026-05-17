import type { Mode, Palette, SavedSetup, VisualizerState } from "@/data/types";
import { paletteStrengthText } from "@/lib/color/paletteStrength";
import { resolveHeroRoles } from "@/lib/color/colorEngine";

export function createPreset(state: VisualizerState, palette: Palette, name?: string): SavedSetup {
  const modes = {
    light: palette.light,
    dark: palette.dark,
    brand: palette.brand
  };
  const hero = Object.fromEntries(
    (["light", "dark", "brand"] as Mode[]).map((mode) => [
      mode,
      resolveHeroRoles(palette, mode, state.colorUsageByMode, state.colorOverrides[state.colorUsageByMode[mode]] || {})
    ])
  ) as SavedSetup["tokens"]["hero"];
  const activeStrength = paletteStrengthText(palette, palette[state.mode]);

  return {
    id: `hero-${Date.now()}`,
    type: "studio419.hero-preset",
    version: "0.1.0",
    name: name || `${palette.name} · ${state.pair}`,
    createdAt: new Date().toISOString(),
    summary: `${state.pair} with ${palette.name}. ${activeStrength}.`,
    state,
    tokens: { modes, hero }
  };
}
