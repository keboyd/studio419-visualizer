import { appSemanticTokens } from "./semantic.tokens";

export const appComponentTokens = {
  shell: {
    background: appSemanticTokens.background,
    color: appSemanticTokens.text,
    fontFamily: appSemanticTokens.fontSans
  },
  parityFrame: {
    width: appSemanticTokens.viewportWidth,
    height: appSemanticTokens.viewportHeight,
    border: appSemanticTokens.frameBorder
  }
} as const;
