import type { SavedSetup } from "@/data/types";
import { exportAiBrief } from "./exportAiBrief";
import { exportCss } from "./exportCss";
import { exportDtcg } from "./exportDtcg";
import { exportFigmaNotes } from "./exportFigmaNotes";
import { exportFigmaVariablesJson } from "./exportFigmaVariablesJson";
import { exportFramerPrompt } from "./exportFramerPrompt";
import { exportHtmlCss } from "./exportHtmlCss";
import { exportJson } from "./exportJson";
import { exportTokensStudio } from "./exportTokensStudio";

export const exportFormats = [
  { value: "ai", label: "AI + Dev Brief" },
  { value: "css", label: "CSS Variables + Mini CSS" },
  { value: "html", label: "Mini HTML + CSS" },
  { value: "json", label: "JSON" },
  { value: "framer", label: "Framer Prompt" },
  { value: "figma", label: "Figma Notes" },
  { value: "dtcg", label: "DTCG JSON" },
  { value: "tokens-studio", label: "Tokens Studio JSON" },
  { value: "figma-variables", label: "Figma Variables JSON" }
] as const;

export type ExportFormat = (typeof exportFormats)[number]["value"];

export function exportSetup(format: ExportFormat, setup: SavedSetup) {
  switch (format) {
    case "css":
      return exportCss(setup);
    case "html":
      return exportHtmlCss(setup);
    case "json":
      return exportJson(setup);
    case "framer":
      return exportFramerPrompt(setup);
    case "figma":
      return exportFigmaNotes(setup);
    case "dtcg":
      return exportDtcg(setup);
    case "tokens-studio":
      return exportTokensStudio(setup);
    case "figma-variables":
      return exportFigmaVariablesJson(setup);
    default:
      return exportAiBrief(setup);
  }
}
