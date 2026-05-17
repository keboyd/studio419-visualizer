export function colorToRgb(color: string) {
  let value = String(color || "").trim().replace("#", "");
  if (value.length === 3) value = value.split("").map((ch) => ch + ch).join("");
  const number = parseInt(value || "000000", 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255
  };
}

export function luminance(color: string) {
  const rgb = colorToRgb(color);
  const convert = (value: number) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * convert(rgb.r) + 0.7152 * convert(rgb.g) + 0.0722 * convert(rgb.b);
}

export function contrast(foreground: string, background: string) {
  const l1 = luminance(foreground);
  const l2 = luminance(background);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function contrastLabel(ratio: number, threshold = 4.5) {
  if (ratio >= threshold) return "AA";
  if (threshold === 4.5 && ratio >= 3) return "Large only";
  return "Fail";
}

export function contrastClass(ratio: number, threshold = 4.5) {
  if (ratio >= threshold) return "pass";
  if (threshold === 4.5 && ratio >= 3) return "warn";
  return "fail";
}

export function bestContrastColor(background: string, candidates: string[]) {
  return candidates
    .filter(Boolean)
    .concat(["#FFFFFF", "#000000"])
    .sort((a, b) => contrast(b, background) - contrast(a, background))[0];
}
