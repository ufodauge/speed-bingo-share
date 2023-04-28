import { ButtonHTMLAttributes, ReactNode } from "react";
import { SerializedStyles, css, useTheme } from "@emotion/react";
import { hexToHsl } from "@/lib/utils/colorConversion";

type Props = {
  customProps: ButtonHTMLAttributes<HTMLButtonElement>;
  outlined?: boolean;
  ghost?: boolean;
  children?: ReactNode;
  customStyle?: SerializedStyles;
};

const Button: React.FC<Props> = ({
  children,
  customProps,
  outlined,
  ghost,
  customStyle,
}) => {
  const theme = useTheme();

  const { h, s, l } = hexToHsl(theme.neutral);

  const style = {
    default: css({
      padding: 0,
      borderRadius: "10px",
      cursor: "pointer",
      display: "inline-flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      fontWeight: "bold",
      backgroundColor: theme.neutral,
      color: theme.neutralContent,
      transitionProperty: "all",
      transitionDuration: "0.2s",
      transitionTimingFunction: "ease-in-out",
      "&:hover": {
        backgroundColor: `hsl(
          ${h}
          ${Math.floor(s * 100)}%
          ${Math.floor(l * 25)}% / 1
        )`,
      },
    }),
    ghost: css({
      backgroundColor: "transparent",
      color: theme.baseContent,
      position: "relative",
      "&:hover": {
        backgroundColor: `hsl(
            ${h}
            ${Math.floor(s * 100)}%
            ${Math.floor(l * 100)}%
            / 0.23
          )`,
      },
    }),
    outlined: css({
      backgroundColor: theme.base100,
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.base300,
      color: theme.baseContent,
      position: "relative",
      "&:hover": {
        backgroundColor: `hsl(
          ${h}
          ${Math.floor(s * 100)}%
          ${Math.floor(l * 100)}%
          / 0.23
        )`,
      },
    }),
  };

  const styles = [
    style.default,
    outlined ? style.outlined : null,
    ghost ? style.ghost : null,
    customStyle,
  ];

  return (
    <button type="button" css={styles} {...customProps}>
      {children}
    </button>
  );
};

export default Button;
