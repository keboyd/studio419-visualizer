import { calculateResponsiveHeroMetrics } from "./responsiveHeroMath";
import type { previewModes } from "./migrationContract";

type NativeHeroPreviewProps = {
  boundsVisible: boolean;
  previewMode: (typeof previewModes)[number];
  viewportWidth: number;
};

export function NativeHeroPreview({ boundsVisible, previewMode, viewportWidth }: NativeHeroPreviewProps) {
  const metrics = calculateResponsiveHeroMetrics(viewportWidth);

  return (
    <section
      className="hero"
      data-bounds-visible={boundsVisible}
      data-preview-mode={previewMode}
      data-native-region="hero-preview"
      data-viewport-width={viewportWidth}
      style={
        {
          "--hero-body-size": `${metrics.bodySize}px`,
          "--hero-headline-size": `${metrics.headlineSize}px`,
          "--hero-padding-x": `${metrics.paddingX}px`
        } as React.CSSProperties
      }
    >
      <span className="padding-label-x" id="nativePaddingLabelX">
        padding-x {metrics.paddingX}px
      </span>
      <div className="hero-inner" id="nativeHeroInner">
        <div className="eyebrow" id="nativeEyebrow">
          Selected font pairing
        </div>
        <h1 className="headline" id="nativeHeadline">
          Structure creates the signal.
        </h1>
        <p className="body" id="nativeBodyText">
          Explore responsive type pairings, color systems, contrast-safe hero treatments, and exportable starter design
          tokens.
        </p>
      </div>
    </section>
  );
}
