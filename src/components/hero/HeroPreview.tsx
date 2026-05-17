import type { HeroColorRoles, LayoutSettings, SampleCopy, TypeSettings } from "@/data/types";
import type { CSSProperties } from "react";
import { parseFontPair } from "@/lib/typography/fontPairing";
import { responsiveClamp } from "@/lib/typography/responsiveType";

type HeroPreviewProps = {
  pair: string;
  copy: SampleCopy;
  roles: HeroColorRoles;
  type: TypeSettings;
  layout: LayoutSettings;
};

const radiusMap: Record<LayoutSettings["ctaRadius"], string> = {
  full: "var(--radius-full)",
  lg: "var(--radius-lg)",
  md: "var(--radius-md)",
  sm: "var(--radius-sm)",
  square: "0px"
};

export function HeroPreview({ pair, copy, roles, type, layout }: HeroPreviewProps) {
  const fonts = parseFontPair(pair);
  const style = {
    "--hero-bg": roles.bg,
    "--hero-panel": roles.panel,
    "--hero-text": roles.text,
    "--hero-muted": roles.muted,
    "--hero-eyebrow": roles.eyebrow,
    "--hero-cta-bg": roles.ctaBg,
    "--hero-cta-text": roles.ctaText,
    "--hero-secondary": roles.secondaryLink,
    "--hero-align": layout.alignment,
    "--hero-justify": layout.alignment === "center" ? "center" : layout.alignment === "right" ? "flex-end" : "flex-start",
    "--hero-headline-size": responsiveClamp(type.headlineMobile, type.headlineDesktop),
    "--hero-body-size": responsiveClamp(type.bodyMobile, type.bodyDesktop),
    "--hero-headline-leading": String(type.headlineLineHeight / 100),
    "--hero-body-leading": String(type.bodyLineHeight / 100),
    "--hero-headline-tracking": `${(type.headlineTracking / 1000).toFixed(3)}em`,
    "--hero-body-tracking": `${(type.bodyTracking / 1000).toFixed(3)}em`,
    "--hero-headline-weight": String(type.headlineWeight),
    "--hero-body-weight": String(type.bodyWeight),
    "--hero-pad-x": `${layout.heroPaddingX}px`,
    "--hero-headline-width": `${layout.headlineWidth}ch`,
    "--hero-body-width": `${layout.bodyWidth}ch`,
    "--hero-eyebrow-gap": `${layout.eyebrowGap}px`,
    "--hero-headline-body-gap": `${layout.headlineBodyGap}px`,
    "--hero-body-cta-gap": `${layout.bodyCtaGap}px`,
    "--hero-cta-link-gap": `${layout.ctaLinkGap}px`,
    "--hero-cta-radius": radiusMap[layout.ctaRadius],
    "--hero-headline-font": `"${fonts.headline}", var(--font-ui)`,
    "--hero-body-font": `"${fonts.body}", var(--font-ui)`
  } as CSSProperties;

  return (
    <section className="hero-preview" style={style}>
      <div className="hero-preview-inner">
        <p className="hero-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.headline}</h1>
        <p className="hero-body">{copy.body}</p>
        <div className="hero-actions">
          <a className="hero-cta" href="#">
            {copy.cta}
          </a>
          <a className="hero-secondary" href="#">
            {copy.link}
          </a>
        </div>
      </div>
    </section>
  );
}
