export const appTitle = "Font Pair & Palette Visualizer";

export const headerControlGroups = [
  {
    label: "Type",
    selector: ".header-type-group-v183",
    controls: ["headerCategorySelect", "headerPairSelect", "counter"]
  },
  {
    label: "Color",
    selector: ".header-color-group-v183",
    controls: ["headerPaletteCategorySelect", "paletteSelect", "paletteCounter"]
  },
  {
    label: "UI",
    selector: ".header-ui-controls-v183",
    controls: ["chromeModeSelect"]
  }
] as const;

export const chromeModeOptions = ["Auto", "Light", "Dark"] as const;

export const viewportPresets = [
  { label: "Retina / 5K", value: "retina", width: 2560 },
  { label: "Ultrawide", value: "ultrawide", width: 1920 },
  { label: "Desktop", value: "desktop", width: 1440 },
  { label: "Foldable", value: "foldable", width: 768 },
  { label: "Mobile", value: "mobile", width: 390 }
] as const;

export const viewportRange = {
  defaultWidth: 1440,
  maxWidth: 2560,
  minWidth: 390,
  step: 10
} as const;

export const zoomRange = {
  defaultScale: 1,
  maxScale: 2.5,
  minScale: 0.35,
  step: 0.1
} as const;

export const responsiveTypeAnchors = {
  bodyDesktop: 16,
  bodyMobile: 16,
  desktopWidth: 1440,
  headlineDesktop: 60,
  headlineMobile: 40,
  largeScreenMaxLift: 1.18,
  mobileWidth: 390
} as const;

export const responsiveTypeControls = [
  {
    id: "headlineDesktop",
    label: "Headline Desktop",
    max: 96,
    min: 36,
    step: 1,
    value: responsiveTypeAnchors.headlineDesktop
  },
  {
    id: "headlineMobile",
    label: "Headline Mobile",
    max: 72,
    min: 28,
    step: 1,
    value: responsiveTypeAnchors.headlineMobile
  },
  {
    id: "bodyDesktop",
    label: "Body Desktop",
    max: 24,
    min: 14,
    step: 1,
    value: responsiveTypeAnchors.bodyDesktop
  },
  {
    id: "bodyMobile",
    label: "Body Mobile",
    max: 22,
    min: 14,
    step: 1,
    value: responsiveTypeAnchors.bodyMobile
  }
] as const;

export const heroPaddingAnchors = {
  desktop: 48,
  mobile: 36
} as const;

export const previewModes = ["Light", "Dark", "Brand"] as const;

export const colorUsageModes = ["Minimal", "Editorial", "Brand", "Campaign", "Maximal"] as const;

export const colorUsageScopes = ["Light", "Dark", "Brand"] as const;

export const elementColorOverrides = [
  "Hero Background",
  "Eyebrow",
  "Headline",
  "Body",
  "CTA Background",
  "CTA Text",
  "Secondary Link"
] as const;

export const brandPanelRequiredLabels = [
  "Palette Library",
  "Jump to Palette",
  "Active Palette",
  "Palette Strength",
  "Palette Source",
  "Color Usage by Mode",
  "Element Colors",
  "Hero Contrast Audit"
] as const;

export const heroContrastAuditTargets = ["Eyebrow", "Headline", "Body", "CTA", "Secondary Link"] as const;

export const layoutControls = [
  "Hero Layout",
  "Hero Padding X Desktop",
  "Headline Width",
  "Body Text Width",
  "Eyebrow Gap",
  "Headline → Body Gap",
  "Body → CTA Gap",
  "CTA → Text Link Gap",
  "CTA Radius"
] as const;

export const heroLayoutOptions = ["Left", "Centered", "Right"] as const;

export const ctaRadiusOptions = ["Circle", "Lg", "Md", "Sm", "Square"] as const;

export const layoutControlDefaults = {
  bodyTextWidth: 560,
  bodyToCtaGap: 24,
  ctaRadius: "Circle",
  ctaToTextLinkGap: 16,
  eyebrowGap: 16,
  headlineToBodyGap: 18,
  headlineWidth: 780,
  heroLayout: "Left",
  heroPaddingXDesktop: heroPaddingAnchors.desktop
} as const;

export const layoutRangeControls = [
  {
    id: "heroPaddingXDesktop",
    label: "Hero Padding X Desktop",
    max: 96,
    min: 24,
    step: 1,
    value: layoutControlDefaults.heroPaddingXDesktop
  },
  {
    id: "headlineWidth",
    label: "Headline Width",
    max: 980,
    min: 420,
    step: 10,
    value: layoutControlDefaults.headlineWidth
  },
  {
    id: "bodyTextWidth",
    label: "Body Text Width",
    max: 760,
    min: 320,
    step: 10,
    value: layoutControlDefaults.bodyTextWidth
  },
  {
    id: "eyebrowGap",
    label: "Eyebrow Gap",
    max: 40,
    min: 4,
    step: 1,
    value: layoutControlDefaults.eyebrowGap
  },
  {
    id: "headlineToBodyGap",
    label: "Headline → Body Gap",
    max: 48,
    min: 8,
    step: 1,
    value: layoutControlDefaults.headlineToBodyGap
  },
  {
    id: "bodyToCtaGap",
    label: "Body → CTA Gap",
    max: 56,
    min: 8,
    step: 1,
    value: layoutControlDefaults.bodyToCtaGap
  },
  {
    id: "ctaToTextLinkGap",
    label: "CTA → Text Link Gap",
    max: 40,
    min: 4,
    step: 1,
    value: layoutControlDefaults.ctaToTextLinkGap
  }
] as const;

export const savedSetupActions = [
  "Save Active Setup",
  "Update Selected Setup",
  "Copy Preset List",
  "Clear Presets",
  "Duplicate",
  "Delete",
  "Previous",
  "Next",
  "Export Preset Library",
  "Import Preset Library",
  "Reset App Settings"
] as const;

export const presetBrowserActions = ["Duplicate", "Delete", "Previous", "Next"] as const;

export const presetLibraryImportModes = [
  { label: "Merge with existing", value: "merge" },
  { label: "Replace existing", value: "replace" }
] as const;

export const exportFormats = [
  "AI + Dev Brief",
  "CSS Variables + Mini CSS",
  "Mini HTML + CSS",
  "JSON",
  "Framer Prompt",
  "Figma Notes"
] as const;

export const exportFormatValues = ["ai", "css", "html", "json", "framer", "figma"] as const;

export const exportActions = ["Copy Export", "Copy CSS", "Download Export"] as const;

export const brandReferenceDisclaimer =
  "Brand-inspired palettes are unofficial references for visual exploration. Trademarks belong to their respective owners.";
