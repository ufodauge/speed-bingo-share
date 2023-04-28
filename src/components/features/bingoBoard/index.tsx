import React, { useContext } from "react";

import { useTaskData } from "@/lib/hooks/useTaskData";
import { BoardValuesContext } from "@/pages/contexts/BingoBoard";
import { LineType } from "@/types/lineType";
import { Task } from "@/types/task";
import { css } from "@emotion/react";

import PopoutButton from "./buttons/popoutButton";
import TaskButton from "./buttons/taskButton";
import BottomRow from "./elementRows/bottomRow";
import MiddleRow from "./elementRows/middleRow";
import TopRow from "./elementRows/topRow";
import PopoutCols from "./parts/popoutCols";
import PopoutRows from "./parts/popoutRows";
import TaskBoard from "./parts/taskBoard";

export default function BingoBoard() {
  //   const { tasks } = useContext(BoardValuesContext);

  const taskData = useTaskData();

  //   const getTargetTaskTexts = (lineType: LineType): Task[] => {
  //     const result: Task[] = [];
  //     tasks
  //       .filter((v) => v.lineTypes.find((v) => v === lineType))
  //       .forEach((v) => result.push(v));
  //     return result;
  //   };

  //   const lines: LineType[] = ["bltr", "card", "tlbr"];
  //   for (let i = 0; i < taskData.size; i++) {
  //     lines.push(`col${i + 1}`, `row${i + 1}`);
  //   }

  const minCellSize = 4;
  const normalCellSize = 8;
  const gapPx = 2;
  const boardSize = taskData.size

  const style = css({
    display: "grid",
    gridTemplateColumns: `
            ${minCellSize}em 
            ${normalCellSize * boardSize}em`,
    gridTemplateRows: `
            ${minCellSize}em 
            ${normalCellSize * boardSize}em
            ${minCellSize}em`,
    gap: `${gapPx}px`,
    margin: "1em"
  });

  return (
    <div css={style}>
      <PopoutButton lineType="tlbr" />
      <PopoutCols boardSize={boardSize} gap={gapPx} />
      <PopoutRows boardSize={boardSize} gap={gapPx} />
      <TaskBoard boardSize={boardSize} gap={gapPx} />
      <PopoutButton lineType="bltr" />
      <PopoutButton lineType="card" />
    </div>
  );
}
