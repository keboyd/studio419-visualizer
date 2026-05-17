export const brandDisclaimer =
  "Brand-inspired palettes are unofficial references for visual exploration. Trademarks belong to their respective owners.";

export function isBrandInspired(group?: string, sourceType?: string, unofficial?: boolean) {
  return Boolean(unofficial || sourceType === "public_reference" || group === "Brand-Inspired Systems");
}
