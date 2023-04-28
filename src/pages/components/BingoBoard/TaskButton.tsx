import { useContext, useState } from "react";

import { BoardValuesContext } from "@/pages/contexts/BingoBoard";
import { LineType } from "@/types/lineType";
import { TileShape } from "@/types/tileShape";

import Button from "./Button";
import { MouseButton } from "@/const/mouseButton";

const HighlightColors = [
  "btn-ghost",
  "btn-color-1",
  "btn-color-2",
  "btn-color-3",
];

type Props = {
  lineTypes: LineType[];
  text: string;
};

export default function TaskButton({ lineTypes, text }: Props) {
  const { targetedLine } = useContext(BoardValuesContext);

  const [highlightTypeIndex, setHighlightTypeIndex] = useState(0);

  const htNext = () =>
    setHighlightTypeIndex((highlightTypeIndex + 1) % HighlightColors.length);
  const htPrev = () =>
    setHighlightTypeIndex(
      (highlightTypeIndex + HighlightColors.length - 1) % HighlightColors.length
    );

  const toggleHighlightTypeIndex: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (e.button === MouseButton.Primary) {
      htNext();
    } else if (e.button === MouseButton.Secondary) {
      htPrev();
    }
  };

  const targetedClass =
    targetedLine !== undefined && lineTypes.includes(targetedLine)
      ? "ring-1 ring-info ring-opacity-30"
      : "";

  const highlightTypeClass = `${HighlightColors[highlightTypeIndex]} ${targetedClass}`;

  const className = `btn btn-square no-animation w-32 h-32 ${highlightTypeClass}`;

  return (
    <Button
      className={className}
      onClick={toggleHighlightTypeIndex}
      onContextMenu={toggleHighlightTypeIndex}
    >
      <p suppressHydrationWarning>{text}</p>
    </Button>
  );
}
