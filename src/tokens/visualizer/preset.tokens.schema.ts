import type { HeroTokens } from "./hero.tokens.schema";

export type PreviewMode = "light" | "dark" | "brand";

export type ColorUsage = "minimal" | "editorial" | "brand" | "campaign" | "maximal";

export type VisualizerPresetTokens = {
  id: string;
  type: "hero-preset";
  name: string;
  createdAt: string;
  hero: HeroTokens & {
    pair: string;
    category: string;
    previewMode: PreviewMode;
    colorUsageByMode: Record<PreviewMode, ColorUsage>;
    sourceNote?: string;
  };
};
