import type { SavedSetup } from "@/data/types";

export function exportFigmaVariablesJson(setup: SavedSetup) {
  return JSON.stringify(
    {
      collections: [
        {
          name: "Studio419 Visualizer Hero",
          modes: ["light", "dark", "brand"],
          variables: Object.keys(setup.tokens.hero.light).map((name) => ({
            name: `hero/${name}`,
            type: "COLOR",
            valuesByMode: {
              light: setup.tokens.hero.light[name as keyof typeof setup.tokens.hero.light],
              dark: setup.tokens.hero.dark[name as keyof typeof setup.tokens.hero.dark],
              brand: setup.tokens.hero.brand[name as keyof typeof setup.tokens.hero.brand]
            }
          }))
        }
      ],
      notes:
        "Import manually or transform this artifact through the Figma Variables API. Brand-inspired palettes are unofficial references for visual exploration."
    },
    null,
    2
  );
}
