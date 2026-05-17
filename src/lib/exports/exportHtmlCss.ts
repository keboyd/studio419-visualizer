import type { SavedSetup } from "@/data/types";
import { exportCss } from "./exportCss";

export function exportHtmlCss(setup: SavedSetup) {
  return `${exportCss(setup)}\n\n<section class="hero">\n  <p class="hero__eyebrow">${setup.state.copy.eyebrow}</p>\n  <h1>${setup.state.copy.headline}</h1>\n  <p>${setup.state.copy.body}</p>\n  <a href="#">${setup.state.copy.cta}</a>\n</section>`;
}
