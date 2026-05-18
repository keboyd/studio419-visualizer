import { appBaseTokens } from "./base.tokens";

export const appSemanticTokens = {
  background: appBaseTokens.color.neutral950,
  text: appBaseTokens.color.neutral50,
  fontSans: appBaseTokens.font.sans,
  bodyMargin: appBaseTokens.space.none,
  frameBorder: appBaseTokens.border.none,
  viewportWidth: appBaseTokens.size.viewportWidth,
  viewportHeight: appBaseTokens.size.viewportHeight,
  viewportMinHeight: appBaseTokens.size.viewportHeight
} as const;
