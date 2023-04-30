import { css, useTheme } from "@emotion/react";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const Label: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  const style = {
    label: css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "inherit",
    }),
    text: css({
      color: theme.baseContent,
      transition: "inherit",
      fontWeight: "bold"
    }),
  };

  return (
    <label css={style.label}>
      <span css={style.text}>{children}</span>
    </label>
  );
};

export default Label;
