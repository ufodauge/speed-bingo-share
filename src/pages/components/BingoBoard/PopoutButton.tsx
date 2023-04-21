import { useRouter } from "next/router";
import { useContext } from "react";

import { GeneratedTask } from "@/class/TaskGenerator";
import { LineType, TileShape } from "@/lib/types";
import {
  BoardActionsContext,
  BoardValuesContext,
} from "@/pages/contexts/BingoBoard";
import { ThemeValue } from "@/pages/contexts/Theme";
import { Tracker } from "@/types/tracker";

type PopoutButtonProps = {
  lineType: LineType;
  text: string;
  tileShape: TileShape;
  targetTasks: GeneratedTask[];
  disablePopout?: boolean;
};

export type TaskCell = {
  text: string;
  trackers?: Tracker[];
};

export default function PopoutButton({
  lineType,
  text,
  tileShape,
  targetTasks = [],
  disablePopout,
}: PopoutButtonProps) {
  const { updateTargetedLine } = useContext(BoardActionsContext);
  const { lang } = useContext(BoardValuesContext);
  const { theme } = useContext(ThemeValue);

  const router = useRouter();

  const url = "/popout";
  const params: { [key: string]: string } = {
    taskIndex: targetTasks.map((v) => v.index).join(";"),
    header: lineType,
    layout: lineType === "card" ? "card" : "vertical",
    lang,
    theme,
  };
  const title = "_blank";
  const features =
    (lineType === "card" ? "width=640,height=680" : "width=240,height=520") +
    ",noopener,noreferrer";

  const onClick = () => {
    if (disablePopout) {
      return;
    }

    window.open(
      `${url}?${Object.keys(params)
        .map((v) => `${v}=${params[v]}`)
        .join("&")}`,
      title,
      features
    );
  };

  const tailwindClass = `btn btn-square h-auto w-auto`;
  const className = `${tailwindClass} ${tileShape}`;

  return (
    <button
      type="button"
      className={className}
      onMouseOver={() => updateTargetedLine(lineType)}
      onMouseOut={() => updateTargetedLine()}
      onClick={onClick}
    >
      <p>{text}</p>
    </button>
  );
}
