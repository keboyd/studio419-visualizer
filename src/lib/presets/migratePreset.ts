import type { SavedSetup } from "@/data/types";

export function migratePreset(value: unknown): SavedSetup | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<SavedSetup>;
  if (candidate.type === "studio419.hero-preset" && candidate.state && candidate.tokens) {
    return candidate as SavedSetup;
  }
  return null;
}
