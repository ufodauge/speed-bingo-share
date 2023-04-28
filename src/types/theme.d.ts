export type ColorCode = `#${string}`;

declare module "@emotion/react" {
  export interface Theme {
    primary: ColorCode;
    primaryContent: ColorCode;
    secondary: ColorCode;
    secondaryContent: ColorCode;
    accent: ColorCode;
    accentContent: ColorCode;
    neutral: ColorCode;
    neutralContent: ColorCode;
    base100: ColorCode;
    base200: ColorCode;
    base300: ColorCode;
    baseContent: ColorCode;
    highlightColor1: ColorCode;
    highlightColor2: ColorCode;
    highlightColor3: ColorCode;
    highlightColor4: ColorCode;
  }
}
