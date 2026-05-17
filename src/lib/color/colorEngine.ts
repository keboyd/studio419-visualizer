import type { ColorUsage, Mode, Palette, PaletteMode } from "@/data/types";
import { applyHeroOverrides, heroColorRoles } from "./paletteRoles";

export const defaultColorUsageByMode: Record<Mode, ColorUsage> = {
  light: "minimal",
  dark: "minimal",
  brand: "campaign"
};

export function resolvePaletteMode(palette: Palette, mode: Mode): PaletteMode {
  return palette[mode] || palette.light;
}

export function resolveHeroRoles(
  palette: Palette,
  mode: Mode,
  usageByMode: Record<Mode, ColorUsage>,
  overrides: Partial<Record<string, string | "auto">> = {}
) {
  const usage = usageByMode[mode] || defaultColorUsageByMode[mode];
  return applyHeroOverrides(heroColorRoles(resolvePaletteMode(palette, mode), usage), overrides);
}
