import React, { createContext, useEffect, useState } from "react";

import { ThemeName, ThemeNames, isThemeName } from "@/types/theme";
import assert from "assert";
import { useRouter } from "next/router";

type ThemeValueProps = {
  theme: ThemeName;
};

type ThemeActionProps = {
  toggle: () => void;
  setTheme: (v: ThemeName) => void;
};

export const ThemeValue = createContext<ThemeValueProps>({
  theme: "light",
});

export const ThemeAction = createContext<ThemeActionProps>({
  toggle: () => {
    console.log("not implemented");
  },
  setTheme: () => {
    console.log("not implemented");
  },
});

type Props = {
  children?: React.ReactNode;
};

const ThemeWrapper: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>("light");
  const [themeIndex, setThemeIndex] = useState(0);

  const router = useRouter();
  const query = router.query;

  useEffect(()=>{
    assert(
      query.theme === undefined ||
        (typeof query.theme === "string" && isThemeName(query.theme))
    );
    setTheme(query.theme ?? theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[router.isReady])

  return (
    <ThemeValue.Provider value={{ theme }}>
      <ThemeAction.Provider
        value={{
          toggle: () => {
            setThemeIndex(
              themeIndex === ThemeNames.length - 1 ? 0 : themeIndex + 1
            );
            setTheme(ThemeNames[themeIndex]);
          },
          setTheme: (v) => {
            setTheme(v);
            console.log(v);
          },
        }}
      >
        <div data-theme={theme}>{children}</div>
      </ThemeAction.Provider>
    </ThemeValue.Provider>
  );
};

export default ThemeWrapper;
