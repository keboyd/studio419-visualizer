export const prototypeSource = {
  path: "/prototype/v244.html",
  title: "Font Pair & Palette Visualizer parity prototype"
} as const;

export const prototypeRegions = {
  shell: {
    ariaLabel: "Font Pair & Palette Visualizer",
    frameClassName: "prototype-frame",
    hostClassName: "app-shell"
  },
  header: {
    selector: "header.topbar-v39",
    screenshot: "header.png"
  },
  desktop: {
    screenshot: "desktop-full.png"
  }
} as const;

export const inspectorPanels = [
  {
    key: "color",
    label: "Brand",
    selector: '[data-major-group="color"]',
    screenshot: "brand-panel.png"
  },
  {
    key: "type",
    label: "Type",
    selector: '[data-major-group="type"]',
    screenshot: "type-panel.png"
  },
  {
    key: "layout",
    label: "Layout",
    selector: '[data-major-group="layout"]',
    screenshot: "layout-panel.png"
  },
  {
    key: "save",
    label: "Presets & Export",
    selector: '[data-major-group="save"]',
    screenshot: "presets-panel.png"
  },
  {
    key: "about",
    label: "About",
    selector: '[data-major-group="about"]',
    screenshot: "about-panel.png"
  }
] as const;

export const modalReferences = {
  customPalette: {
    heading: "Build a custom palette",
    selector: "#customPaletteModal .modal",
    screenshot: "Build a custom palette.png",
    triggerName: "Custom"
  }
} as const;
