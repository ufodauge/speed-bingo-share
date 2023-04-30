import { ButtonHTMLAttributes, useContext, useState } from "react";

import { BoardValuesContext } from "@/pages/contexts/BingoBoard";
import { LineType } from "@/types/lineType";
import { TileShape } from "@/types/tileShape";

import Button from "@/components/ui/button";
import { MouseButton } from "@/const/mouseButton";
import { HighlightColors } from "@/const/highlightColors";
import { css, keyframes, useTheme } from "@emotion/react";

type Props = {
  lineTypes: LineType[];
  text: string;
};

export default function TaskButton({ lineTypes, text }: Props) {
  //   const { targetedLine } = useContext(BoardValuesContext);

  const [highlightColorIndex, setHighlightColorIndex] = useState(0);

  /**
   * set highlight color next
   */
  const highlightColorNext = () => {
    setHighlightColorIndex((highlightColorIndex + 1) % HighlightColors.length);
  };

  /**
   * set hight light color prev
   */
  const highlightColorPrev = () => {
    setHighlightColorIndex(
      (highlightColorIndex + HighlightColors.length - 1) %
        HighlightColors.length
    );
  };

  /**
   * toggler to change highlight color
   * @param e mouse event
   */
  const toggleHighlightColorIndex: React.MouseEventHandler<
    HTMLButtonElement
  > = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // change color by the button
    if (e.button === MouseButton.Primary) {
      highlightColorNext();
    } else if (e.button === MouseButton.Secondary) {
      highlightColorPrev();
    }
  };

  //   const targetedClass =
  //     targetedLine !== undefined && lineTypes.includes(targetedLine)
  //       ? "ring-1 ring-info ring-opacity-30"
  //       : "";

  //   const highlightTypeClass = `${HighlightColors[highlightTypeIndex]} ${targetedClass}`;

  //   const className = `btn btn-square no-animation w-32 h-32 ${highlightTypeClass}`;

  const customProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    onClick: toggleHighlightColorIndex,
    onContextMenu: toggleHighlightColorIndex,
  };

  const theme = useTheme();

  const kf = keyframes({
    "0%": { boxShadow: `0 0 0 0 ${theme.primary}` },
    "100%": { boxShadow: `0 0 0 8px ${theme.primary}00` },
  });

  const highlights = [
    theme.highlightColor1,
    theme.highlightColor2,
    theme.highlightColor3,
    theme.highlightColor4,
  ];

  const style = css({
    backgroundColor: highlights[highlightColorIndex],
    color: theme.highlightContent,
    borderColor: "transparent",
    "&:hover": {
      borderColor: theme.primary,
      backgroundColor: highlights[highlightColorIndex],
      color: theme.highlightContent,
      backgroundPosition: "right center",
      backgroundSize: "200% auto",
      animationName: kf,
      animationDuration: "1s",
      zIndex: "10",
    },
  });

  return (
    <Button customProps={customProps} outlined customStyle={style}>
      <p suppressHydrationWarning>{text}</p>
    </Button>
  );
}
