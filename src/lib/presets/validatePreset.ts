import type { SavedSetup } from "@/data/types";

export function validatePreset(setup: SavedSetup) {
  const issues: string[] = [];
  if (!setup.id) issues.push("Missing id");
  if (!setup.name) issues.push("Missing name");
  if (!setup.tokens?.hero?.light || !setup.tokens?.hero?.dark || !setup.tokens?.hero?.brand) issues.push("Missing multi-mode hero tokens");
  return { valid: issues.length === 0, issues };
}
