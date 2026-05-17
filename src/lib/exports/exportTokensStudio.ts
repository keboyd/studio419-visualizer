import type { SavedSetup } from "@/data/types";
import { toTokensStudio } from "@/lib/tokens/toTokensStudio";

export function exportTokensStudio(setup: SavedSetup) {
  return JSON.stringify(toTokensStudio(setup), null, 2);
}
