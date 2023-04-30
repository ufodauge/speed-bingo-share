import React, { createContext, ReactNode, useContext, useState } from "react";

import { UnimplementedFunctionCalledException } from "@/class/exception/unimplementedFunctionCalled";
import { UnknownThemeNameException } from "@/class/exception/unknownThemeName";
import { useQuery } from "@/lib/hooks/useQuery";
import { getTheme } from "@/lib/theme/getTheme";
import { isThemeName, ThemeName, ThemeNames } from "@/types/theme/theme";
import { css, ThemeProvider } from "@emotion/react";

type ThemeActionProps = {
  toggle: () => void;
  setTheme: (themeName: ThemeName) => void;
};

const ThemeAction = createContext<ThemeActionProps>({
  toggle: () => {
    throw new UnimplementedFunctionCalledException();
  },
  setTheme: () => {
    throw new UnimplementedFunctionCalledException();
  },
});

type Props = {
  children?: ReactNode;
};

const ThemeWrapper: React.FC<Props> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  useQuery(
    (v) => {
      const theme = v.theme;
      if (!isThemeName(theme)) {
        throw new UnknownThemeNameException(theme);
      }
      setThemeName(theme);
    },
    { theme: "light" }
  );

  const themeAction: ThemeActionProps = {
    toggle: () => {
      const index = ThemeNames.findIndex((v) => v === themeName);
      setThemeName(ThemeNames[(index + 1) % ThemeNames.length]);
    },
    setTheme: setThemeName,
  };

  const theme = getTheme(themeName);

  const style = css({
    backgroundColor: theme.base,
    transitionDuration: ".2s",
    transitionTimingFunction: "ease-in-out",
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeAction.Provider value={themeAction}>
        <div css={style}>{children}</div>
      </ThemeAction.Provider>
    </ThemeProvider>
  );
};

export const useThemeAction = () => useContext(ThemeAction);

export default ThemeWrapper;
