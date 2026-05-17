export const paletteCategories = [
  { value: "all", label: "All Palettes" },
  { value: "semantic", label: "Semantic Sets", group: "Semantic Sets" },
  { value: "research", label: "Research Library", group: "Full Research Library" },
  { value: "brands", label: "Brand-Inspired Systems", group: "Brand-Inspired Systems" },
  { value: "custom", label: "Custom Palettes", group: "Custom Palettes" }
] as const;

export type PaletteLibrary = (typeof paletteCategories)[number]["value"];
