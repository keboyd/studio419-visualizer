export type HeroColorTokens = {
  bg: string;
  text: string;
  muted: string;
  eyebrow: string;
  ctaBg: string;
  ctaText: string;
  secondary: string;
  accent1: string;
  accent2: string;
  accent3: string;
};

export type HeroTypographyTokens = {
  headlineDesktop: number;
  headlineMobile: number;
  bodyDesktop: number;
  bodyMobile: number;
  headlineLeading: number;
  bodyLeading: number;
  headlineTracking: string;
  bodyTracking: string;
};

export type HeroLayoutTokens = {
  alignment: "left" | "center" | "right";
  headlineWidth: string;
  bodyWidth: string;
  paddingXDesktop: number;
  paddingXMobile: number;
  ctaRadius: string;
  eyebrowGap: number;
  headlineBodyGap: number;
  bodyCtaGap: number;
  ctaLinkGap: number;
};

export type HeroTokens = {
  colors: HeroColorTokens;
  typography: HeroTypographyTokens;
  layout: HeroLayoutTokens;
};
