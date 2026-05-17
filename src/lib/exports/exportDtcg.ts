import type { SavedSetup } from "@/data/types";
import { toDtcg } from "@/lib/tokens/toDtcg";

export function exportDtcg(setup: SavedSetup) {
  return JSON.stringify(toDtcg(setup), null, 2);
}
