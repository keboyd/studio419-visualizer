import { heroPaddingAnchors, responsiveTypeAnchors } from "./migrationContract";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function interpolate(width: number, mobileValue: number, desktopValue: number) {
  const progress = clamp(
    (width - responsiveTypeAnchors.mobileWidth) /
      (responsiveTypeAnchors.desktopWidth - responsiveTypeAnchors.mobileWidth),
    0,
    1
  );

  return mobileValue + (desktopValue - mobileValue) * progress;
}

function largeScreenLift(width: number) {
  if (width <= responsiveTypeAnchors.desktopWidth) {
    return 1;
  }

  const progress = clamp(
    (width - responsiveTypeAnchors.desktopWidth) /
      (2560 - responsiveTypeAnchors.desktopWidth),
    0,
    1
  );

  return 1 + (responsiveTypeAnchors.largeScreenMaxLift - 1) * progress;
}

export function calculateResponsiveHeroMetrics(width: number) {
  const lift = largeScreenLift(width);

  return {
    bodySize: Math.round(
      interpolate(width, responsiveTypeAnchors.bodyMobile, responsiveTypeAnchors.bodyDesktop) * lift
    ),
    headlineSize: Math.round(
      interpolate(width, responsiveTypeAnchors.headlineMobile, responsiveTypeAnchors.headlineDesktop) * lift
    ),
    paddingX: Math.round(interpolate(width, heroPaddingAnchors.mobile, heroPaddingAnchors.desktop))
  };
}
