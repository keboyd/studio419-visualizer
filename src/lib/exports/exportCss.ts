import type { SavedSetup } from "@/data/types";

export function exportCss(setup: SavedSetup) {
  const mode = setup.state.mode;
  const roles = setup.tokens.hero[mode];
  const lines = Object.entries(roles).map(([key, value]) => `  --hero-${key.replace(/[A-Z]/g, "-$&").toLowerCase()}: ${value};`);

  return `/* ${setup.summary} */\n:root {\n${lines.join("\n")}\n  --hero-headline-desktop: ${setup.state.type.headlineDesktop}px;\n  --hero-headline-mobile: ${setup.state.type.headlineMobile}px;\n  --hero-body-desktop: ${setup.state.type.bodyDesktop}px;\n  --hero-body-mobile: ${setup.state.type.bodyMobile}px;\n}\n\n.hero {\n  background: var(--hero-bg);\n  color: var(--hero-text);\n  padding-inline: var(--hero-padding-x, ${setup.state.layout.heroPaddingX}px);\n}`;
}
