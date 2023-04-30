import { css, useTheme } from "@emotion/react";
import { ChangeEventHandler } from "react";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const TextInput: React.FC<Props> = ({ placeholder, value, onChange }) => {
  const theme = useTheme();
  const style = css({
    width: "100%",
    backgroundColor: theme.baseVariant,
    color: theme.baseContent,
    borderColor: theme.baseVariant,
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    padding: "1rem",
    transition: "inherit",
  });

  return (
    <input
      css={style}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
