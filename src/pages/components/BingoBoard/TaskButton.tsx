import { useContext, useState } from "react";
import { LineType, TileShape } from "@/lib/types";
import { BoardValuesContext } from "@/pages/contexts/BingoBoard";
const HighlightColors = [
  "btn-ghost",
  "btn-color-1",
  "btn-color-2",
  "btn-color-3",
];

interface TaskButtonProps {
  lineTypes: LineType[];
  text: string;
  tileShape: TileShape;
}

export default function TaskButton(props: TaskButtonProps) {
  const { lineTypes, text } = props;

  const { targetedLine } = useContext(BoardValuesContext);

  const [highlightTypeIndex, setHighlightTypeIndex] = useState(0);

  const toggleHighlightTypeIndex: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (e.button === 0) {
      setHighlightTypeIndex((highlightTypeIndex + 1) % HighlightColors.length);
    } else if (e.button === 2) {
      setHighlightTypeIndex(
        (highlightTypeIndex + HighlightColors.length - 1) %
          HighlightColors.length
      );
    }
  };

  const targetedClass =
    targetedLine !== undefined && lineTypes.includes(targetedLine)
      ? "ring-1 ring-info ring-opacity-30"
      : "";

  const tailwindClass = "btn btn-square no-animation h-auto w-auto";

  const highlightTypeClass = `${HighlightColors[highlightTypeIndex]} ${targetedClass}`;

  const className = `${tailwindClass} ${highlightTypeClass}`;

  return (
    <button
      type="button"
      className={className}
      onClick={toggleHighlightTypeIndex}
      onContextMenu={toggleHighlightTypeIndex}
    >
      <p suppressHydrationWarning>{text}</p>
    </button>
  );
}
