export type Mode = "light" | "dark" | "brand";
export type ColorUsage = "minimal" | "editorial" | "brand" | "campaign" | "maximal";

export type ColorRole =
  | "bg"
  | "text"
  | "muted"
  | "line"
  | "panel"
  | "brand"
  | "onBrand"
  | "accent"
  | "onAccent"
  | "success"
  | "warning"
  | "danger";

export type PaletteMode = Record<ColorRole, string> & {
  heroOverrides?: Partial<HeroColorRoles>;
};

export type Palette = {
  name: string;
  climate?: string;
  source?: string;
  sourceType?: string;
  unofficial?: boolean;
  rawHex?: string[];
  group?: string;
  library?: string;
  enrichment?: string;
  light: PaletteMode;
  dark: PaletteMode;
  brand: PaletteMode;
};

export type FontCategoryMap = Record<string, string[]>;

export type SampleCopy = {
  eyebrow: string;
  headline: string;
  body: string;
  cta: string;
  link: string;
};

export type SampleCopyMap = Record<string, SampleCopy>;

export type FontPair = {
  headline: string;
  body: string;
};

export type HeroColorRoles = {
  bg: string;
  panel: string;
  text: string;
  muted: string;
  eyebrow: string;
  ctaBg: string;
  ctaText: string;
  secondaryLink: string;
  primary: string;
  secondary: string;
  tertiary: string;
};

export type TypeSettings = {
  headlineDesktop: number;
  headlineMobile: number;
  headlineLineHeight: number;
  headlineTracking: number;
  headlineWeight: number;
  bodyDesktop: number;
  bodyMobile: number;
  bodyLineHeight: number;
  bodyWeight: number;
  bodyTracking: number;
};

export type LayoutSettings = {
  alignment: "left" | "center" | "right";
  headlineWidth: number;
  bodyWidth: number;
  heroPaddingX: number;
  eyebrowGap: number;
  headlineBodyGap: number;
  bodyCtaGap: number;
  ctaLinkGap: number;
  ctaRadius: "full" | "lg" | "md" | "sm" | "square";
};

export type VisualizerState = {
  fontCategory: string;
  pair: string;
  paletteLibrary: string;
  paletteName: string;
  mode: Mode;
  colorUsageByMode: Record<Mode, ColorUsage>;
  colorOverrides: Record<ColorUsage, Partial<Record<keyof HeroColorRoles, string | "auto">>>;
  copy: SampleCopy;
  type: TypeSettings;
  layout: LayoutSettings;
  viewportWidth: number;
};

export type SavedSetup = {
  id: string;
  type: "studio419.hero-preset";
  version: "0.1.0";
  name: string;
  createdAt: string;
  updatedAt?: string;
  summary: string;
  state: VisualizerState;
  tokens: {
    modes: Record<Mode, PaletteMode>;
    hero: Record<Mode, HeroColorRoles>;
  };
};
