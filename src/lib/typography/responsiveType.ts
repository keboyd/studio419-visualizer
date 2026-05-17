import type { TypeSettings } from "@/data/types";

export const defaultTypeSettings: TypeSettings = {
  headlineDesktop: 60,
  headlineMobile: 40,
  headlineLineHeight: 102,
  headlineTracking: -15,
  headlineWeight: 700,
  bodyDesktop: 16,
  bodyMobile: 16,
  bodyLineHeight: 145,
  bodyWeight: 400,
  bodyTracking: 0
};

export function responsiveClamp(min: number, max: number) {
  return `clamp(${min}px, calc(${min}px + (${max} - ${min}) * ((100vw - 390px) / (1440 - 390))), ${Math.max(min, max)}px)`;
}
