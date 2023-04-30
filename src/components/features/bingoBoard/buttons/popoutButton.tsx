import { CalcPopupWindowFeatures } from "@/lib/calcPopupWindowFeatures";
import {
  BoardActionsContext,
  BoardValuesContext,
} from "@/pages/contexts/BingoBoard";
import { ThemeValue } from "@/pages/contexts/Theme";
import { LineType } from "@/types/lineType";
import { Task } from "@/types/task";

import Button from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";
import { css, useTheme } from "@emotion/react";
import { relative } from "path";

type Props = {
  lineType: LineType;
};

export default function PopoutButton({ lineType }: Props) {
  //   const getTargetTaskTexts = (lineType: LineType): Task[] => {
  //     const result: Task[] = [];
  //     tasks
  //       .filter((v) => v.lineTypes.find((v) => v === lineType))
  //       .forEach((v) => result.push(v));
  //     return result;
  //   };
  // const targetTasks = getTargetTaskTexts(lineType);

  //   const { updateTargetedLine } = useContext(BoardActionsContext);
  //   const { lang } = useContext(BoardValuesContext);
  //   const { theme } = useContext(ThemeValue);

  //   const url = "/popout";
  //   const params: { [key: string]: string } = {
  //     taskIndex: targetTasks.map((v) => v.index).join(";"),
  //     header: lineType,
  //     layout: lineType === "card" ? "card" : "vertical",
  //     lang,
  //     theme,
  //   };
  //   const features = CalcPopupWindowFeatures(
  //     lineType === "card" ? "card" : "vertical"
  //   );

  //   const onClick = () =>
  //     window.open(
  //       `${url}?${Object.keys(params)
  //         .map((v) => `${v}=${params[v]}`)
  //         .join("&")}`,
  //       "_blank",
  //       features
  //     );

  // const sizePatcher = () => {
  //   if (lineType === "bltr" || lineType === "tlbr") {
  //     return { width: "4em", height: "4em" };
  //   } else if (lineType.match(/col\d+/)) {
  //     return { width: "10em", height: "4em" };
  //   } else if (lineType.match(/row\d+/)) {
  //     return { width: "4em", height: "10em" };
  //   } else if (lineType === "card") {
  //     return { flexGrow: 1, height: "4em" };
  //   }
  //   return { width: 0, height: 0 };
  // };

  //   const onMouseOver = () => updateTargetedLine(lineType);
  //   const onMouseOut = () => updateTargetedLine();

  const customProps: ButtonHTMLAttributes<HTMLButtonElement> = {};

  const theme = useTheme();

  const style = css({
    fontSize: "large",
    backgroundColor: theme.baseVariant,
    color: theme.baseContent,
    "&:hover": {
      color: theme.primaryContent,
      borderColor: theme.primary,
      borderStyle: "solid",
      borderWidth: "2px",
    },
  });

  return (
    <Button
      customProps={customProps}
      customStyle={style}
      outlined
      //   className={className}
      //   onMouseOver={onMouseOver}
      //   onMouseOut={onMouseOut}
      //   onClick={onClick}
    >
      <p>{lineType}</p>
    </Button>
  );
}
