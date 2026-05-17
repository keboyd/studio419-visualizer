import type { ColorUsage, HeroColorRoles, PaletteMode } from "@/data/types";
import { bestContrastColor } from "./contrast";

export function heroColorRoles(colors: PaletteMode, usage: ColorUsage): HeroColorRoles {
  const primary = colors.brand || colors.accent || colors.text;
  const secondary = colors.accent || colors.brand || colors.text;
  const tertiary = colors.success || colors.warning || secondary;
  const surface = usage === "brand" || usage === "campaign" ? colors.bg : colors.panel || colors.bg;
  const isBrandFill = usage === "brand" || usage === "maximal";
  const bg = isBrandFill ? primary : colors.bg;
  const panel = usage === "campaign" ? surface : bg;
  const text = isBrandFill ? colors.onBrand || bestContrastColor(bg, [colors.text, colors.onAccent]) : colors.text;
  const muted = isBrandFill ? bestContrastColor(bg, [colors.muted, colors.onBrand, colors.text]) : colors.muted;
  const ctaBg = usage === "minimal" || usage === "editorial" ? primary : secondary;
  const ctaText = bestContrastColor(ctaBg, [colors.onBrand, colors.onAccent, colors.bg, colors.panel, colors.text]);

  return {
    bg,
    panel,
    text,
    muted,
    eyebrow: usage === "minimal" ? primary : tertiary,
    ctaBg,
    ctaText,
    secondaryLink: usage === "minimal" ? primary : secondary,
    primary,
    secondary,
    tertiary
  };
}

export function applyHeroOverrides(
  roles: HeroColorRoles,
  overrides: Partial<Record<keyof HeroColorRoles, string | "auto">> = {}
) {
  return Object.fromEntries(
    Object.entries(roles).map(([key, value]) => [key, overrides[key as keyof HeroColorRoles] && overrides[key as keyof HeroColorRoles] !== "auto" ? overrides[key as keyof HeroColorRoles] : value])
  ) as HeroColorRoles;
}
