import { readFileSync } from "node:fs";
import path from "node:path";

type PrototypePalette = {
  group?: string;
  name: string;
};

export type PrototypeHeaderOption = {
  label: string;
  value: string;
};

export type PrototypeHeaderCategoryOption = PrototypeHeaderOption & {
  pairs: PrototypeHeaderOption[];
};

export type PrototypeHeaderPaletteOption = PrototypeHeaderOption & {
  group?: string;
};

export type PrototypeHeaderData = {
  fontCategoryOptions: PrototypeHeaderCategoryOption[];
  fontCategories: string[];
  fontPairs: string[];
  paletteOptions: PrototypeHeaderPaletteOption[];
  paletteCategories: string[];
  palettes: string[];
};

let headerDataCache: PrototypeHeaderData | undefined;

const defaultHeaderData: PrototypeHeaderData = {
  fontCategoryOptions: [
    {
      label: "Modernist Core",
      value: "Modernist Core",
      pairs: [{ label: "1. Inter & Lora", value: "Inter & Lora" }]
    }
  ],
  fontCategories: ["Modernist Core"],
  fontPairs: ["Inter & Lora"],
  paletteOptions: [{ label: "1. AI / Agentic Teal", value: "AI / Agentic Teal", group: "Semantic Sets" }],
  paletteCategories: ["All Palettes", "Semantic Sets", "Full Research Library", "Custom Palettes", "Brand-Inspired Systems"],
  palettes: ["1. AI / Agentic Teal"]
};

function readPrototypeHtml() {
  return readFileSync(path.join(process.cwd(), "public", "prototype", "v244.html"), "utf8");
}

function extractLiteral(html: string, startMarker: string, endMarker: string) {
  const start = html.indexOf(startMarker);
  if (start < 0) {
    return undefined;
  }

  const literalStart = start + startMarker.length;
  const end = html.indexOf(endMarker, literalStart);
  if (end < 0) {
    return undefined;
  }

  return html.slice(literalStart, end);
}

function parsePrototypeLiteral<T>(literal: string | undefined): T | undefined {
  if (!literal) {
    return undefined;
  }

  return Function(`"use strict"; return (${literal});`)() as T;
}

export function getPrototypeHeaderData(): PrototypeHeaderData {
  if (headerDataCache) {
    return headerDataCache;
  }

  let nextHeaderData = defaultHeaderData;

  try {
    const html = readPrototypeHtml();
    const categories = parsePrototypeLiteral<Record<string, string[]>>(
      extractLiteral(html, "const CATEGORIES=", ";\n\nCATEGORIES[")
    );
    const palettes = parsePrototypeLiteral<PrototypePalette[]>(extractLiteral(html, "let PALETTES=", ";\n\n/*"));

    const fontCategoryNames = categories ? Object.keys(categories) : defaultHeaderData.fontCategories;
    const firstFontCategory = fontCategoryNames[0] ?? defaultHeaderData.fontCategories[0];
    const fontPairNames = categories?.[firstFontCategory] ?? defaultHeaderData.fontPairs;
    const fontPairs = fontPairNames.map((pair, index) => `${index + 1}. ${pair}`);
    const fontCategoryOptions = categories
      ? fontCategoryNames.map((category) => ({
          label: `${category} (${categories[category]?.length ?? 0})`,
          value: category,
          pairs: (categories[category] ?? []).map((pair, index) => ({
            label: `${index + 1}. ${pair}`,
            value: pair
          }))
        }))
      : defaultHeaderData.fontCategoryOptions;
    const fontCategories = categories
      ? fontCategoryNames.map((category) => `${category} (${categories[category]?.length ?? 0})`)
      : defaultHeaderData.fontCategories;
    const paletteNames =
      palettes?.map((palette, index) => `${index + 1}. ${palette.name}`) ?? nextHeaderData.palettes;
    const paletteOptions =
      palettes?.map((palette, index) => ({
        label: `${index + 1}. ${palette.name}`,
        value: palette.name,
        group: palette.group
      })) ?? nextHeaderData.paletteOptions;
    const paletteGroups = palettes?.flatMap((palette) => (palette.group ? [palette.group] : [])) ?? [];

    nextHeaderData = {
      fontCategoryOptions,
      fontCategories,
      fontPairs,
      paletteOptions,
      paletteCategories: ["All Palettes", ...Array.from(new Set(paletteGroups))],
      palettes: paletteNames
    };
  } catch {
    nextHeaderData = defaultHeaderData;
  }

  headerDataCache = nextHeaderData;

  return headerDataCache;
}
