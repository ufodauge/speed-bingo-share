import { ButtonHTMLAttributes, ReactNode } from "react";
import { SerializedStyles, css, useTheme } from "@emotion/react";
import { hexToHsl } from "@/lib/utils/colorConversion";

type Props = {
  customProps: ButtonHTMLAttributes<HTMLButtonElement>;
  outlined?: boolean;
  children?: ReactNode;
  customStyle?: SerializedStyles;
};

const Button: React.FC<Props> = ({
  children,
  customProps,
  outlined,
  customStyle,
}) => {
  const theme = useTheme();

  const { h, s, l } = hexToHsl(theme.neutral);

  const style = {
    default: css({
      padding: 0,
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
          ${Math.floor(l * 100)}% / 0.2
        )`,
      },
    }),
    outlined: css({
      backgroundColor: theme.base100,
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineColor: theme.base300,
      color: theme.baseContent,
    }),
  };

  const styles = [style.default, outlined ? style.outlined : null, customStyle];

  return (
    <button type="button" css={styles} {...customProps}>
      {children}
    </button>
  );
};

export default Button;
