import type { SavedSetup } from "@/data/types";

export function toDtcg(setup: SavedSetup) {
  const modeTokens = Object.fromEntries(
    Object.entries(setup.tokens.hero).map(([mode, roles]) => [
      mode,
      Object.fromEntries(
        Object.entries(roles).map(([role, value]) => [
          role,
          {
            $type: "color",
            $value: value
          }
        ])
      )
    ])
  );

  return {
    $schema: "https://design-tokens.github.io/community-group/format/",
    studio419: {
      visualizer: {
        hero: modeTokens
      }
    }
  };
}
