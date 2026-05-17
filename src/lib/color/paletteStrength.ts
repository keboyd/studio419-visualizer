import type { Palette, PaletteMode } from "@/data/types";

const roleKeys = ["bg", "text", "muted", "line", "panel", "brand", "onBrand", "accent", "onAccent", "success", "warning", "danger"] as const;

function normalizeHex(value?: string) {
  const color = String(value || "").trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(color)) return `#${color.slice(1).split("").map((ch) => ch + ch).join("")}`;
  return color;
}

export function paletteStrength(palette: Palette, colors: PaletteMode) {
  const values = roleKeys.map((key) => colors[key]).filter(Boolean).map(normalizeHex);
  const unique = new Set(values);
  const raw = new Set((palette.rawHex || []).map(normalizeHex));
  const repeatedCore = ["bg", "panel", "brand"].filter((key) => normalizeHex(colors[key as keyof Pick<PaletteMode, "bg" | "panel" | "brand">]) === normalizeHex(colors.bg)).length;
  const level = unique.size >= 8 ? "Rich" : unique.size >= 6 ? "Good" : unique.size >= 4 ? "Limited" : "Thin";
  const flags: string[] = [];

  if (repeatedCore >= 3) flags.push("core repeats");
  if (normalizeHex(colors.brand) === normalizeHex(colors.accent)) flags.push("brand=accent");
  if (unique.size <= 4 && !palette.enrichment) flags.push("needs enrichment");
  if (raw.size >= 5 && unique.size < 6) flags.push("underused raw colors");
  if (palette.enrichment) flags.push("enriched");

  return { level, unique: unique.size, total: roleKeys.length, raw: raw.size, flags };
}

export function paletteStrengthText(palette: Palette, colors: PaletteMode) {
  const score = paletteStrength(palette, colors);
  return `Strength: ${score.level} · ${score.unique}/${score.total} tokens${score.raw ? ` · ${score.raw} raw` : ""}${
    score.flags.length ? ` · ${score.flags.join(", ")}` : ""
  }`;
}
