// const options = [
//   { text: ..., value: ... },
//   { text: ..., value: ... },
//   ...,
//   { group: ..., values: [
//      { text: ..., value: ... },
//      { text: ..., value: ... },
//      ...,
//   ] },
// ]

import { css, useTheme } from "@emotion/react";

type Option = { text: string; value: any };
type Group = { group: string; values: Option[] };
type Options = (Option | Group)[];

const isOption = (v: any): v is Option =>
  Object.keys(v).includes("text") &&
  Object.keys(v).includes("value") &&
  Object.keys(v).length === 2;

type Props = {
  options: Options;
};

const Selector: React.FC<Props> = ({ options }) => {
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
    <select css={style}>
      {options.map((v, i) => {
        if (isOption(v)) {
          return (
            <option value={v.value} key={i}>
              {v.text}
            </option>
          );
        }

        // optgroup process
        return (
          <optgroup label={v.group} key={i}>
            {v.values.map((w, j) => (
              <option value={w.value} key={j}>
                {w.text}
              </option>
            ))}
          </optgroup>
        );
      })}
    </select>
  );
};

export default Selector;
