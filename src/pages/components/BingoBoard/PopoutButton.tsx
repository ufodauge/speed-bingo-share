import { useContext } from 'react';

import { CalcPopupWindowFeatures } from '@/lib/calcPopupWindowFeatures';
import { BoardActionsContext, BoardValuesContext } from '@/pages/contexts/BingoBoard';
import { ThemeValue } from '@/pages/contexts/Theme';
import { LineType } from '@/types/lineType';
import { Task } from '@/types/task';

import Button from './Button';

type Props = {
  lineType: LineType;
  targetTasks: Task[];
};

export default function PopoutButton({ lineType, targetTasks = [] }: Props) {
  const { updateTargetedLine } = useContext(BoardActionsContext);
  const { lang } = useContext(BoardValuesContext);
  const { theme } = useContext(ThemeValue);

  const url = "/popout";
  const params: { [key: string]: string } = {
    taskIndex: targetTasks.map((v) => v.index).join(";"),
    header: lineType,
    layout: lineType === "card" ? "card" : "vertical",
    lang,
    theme,
  };
  const features = CalcPopupWindowFeatures(
    lineType === "card" ? "card" : "vertical"
  );

  const onClick = () =>
    window.open(
      `${url}?${Object.keys(params)
        .map((v) => `${v}=${params[v]}`)
        .join("&")}`,
      "_blank",
      features
    );

  const sizePatcher = () => {
    if (lineType === "bltr" || lineType === "tlbr") {
      return "w-14 h-14";
    } else if (lineType.match(/col\d+/)) {
      return "w-32 h-14";
    } else if (lineType.match(/row\d+/)) {
      return "w-14 h-32";
    } else if (lineType === "card") {
      return "flex-grow h-14";
    }
    return "w-32 h-32";
  };

  const className = `btn btn-square ${sizePatcher()}`;

  const onMouseOver = () => updateTargetedLine(lineType);
  const onMouseOut = () => updateTargetedLine();

  return (
    <Button
      className={className}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <p>{lineType}</p>
    </Button>
  );
}
