import { tokenPathToCssVar } from "./resolveTokens";

export function toCssVariables(tokens: Record<string, string>, prefix = "") {
  return Object.entries(tokens)
    .map(([path, value]) => `${prefix}${tokenPathToCssVar(path)}: ${value};`)
    .join("\n");
}

export function objectToCssVariables(values: Record<string, string | number>, prefix = "--") {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [`${prefix}${key.replace(/[A-Z]/g, "-$&").toLowerCase()}`, String(value)])
  ) as Record<string, string>;
}
