import type { SavedSetup } from "@/data/types";
import { toDtcg } from "./toDtcg";

export function toTokensStudio(setup: SavedSetup) {
  const dtcg = toDtcg(setup);

  return {
    $metadata: {
      tokenSetOrder: ["studio419/visualizer/hero"]
    },
    "studio419/visualizer/hero": dtcg.studio419.visualizer.hero
  };
}
