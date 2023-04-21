import React, { useContext, useState } from "react";

import { GeneratedTask } from "@/class/TaskGenerator";
import { taskData } from "@/const/TaskData";
import { LineType } from "@/lib/types";
import { BoardValuesContext } from "@/pages/contexts/BingoBoard";

import PopoutButton from "./PopoutButton";
import TaskButton from "./TaskButton";

const BUTTON_SIZE = 120;
const BUTTON_THIN_SIZE = 60;

export default function BingoBoard() {
  const { tasks } = useContext(BoardValuesContext);

  const getTargetTaskTexts = (lineType: LineType): GeneratedTask[] => {
    const result: GeneratedTask[] = [];
    tasks
      .filter((v) => v.lineTypes.find((v) => v === lineType))
      .forEach((v) => result.push(v));
    return result;
  };

  const lines: LineType[] = ["bltr", "card", "tlbr"];
  for (let i = 0; i < taskData.size; i++) {
    lines.push(`col${i + 1}`, `row${i + 1}`);
  }

  const classNamesForRows = `grid gap-[2px] justify-center justify-self-stretch w-fit`;
  const classNamesForCols = `grid grid-flow-col gap-[2px]`;

  const dynamicStylesForCols = {
    gridTemplateColumns: `${BUTTON_THIN_SIZE}px repeat(${taskData.size}, ${BUTTON_SIZE}px)`,
  };
  const dynamicStylesForColsOfBottomRow = {
    gridTemplateColumns: `${BUTTON_THIN_SIZE}px 1fr`,
  };
  const dynamicStylesForRows = {
    gridTemplateRows: `${BUTTON_THIN_SIZE}px repeat(${taskData.size}, ${BUTTON_SIZE}px) ${BUTTON_THIN_SIZE}px`,
  };

  const rows = [];
  rows.push([
    <div
      className={classNamesForCols}
      style={dynamicStylesForCols}
      key="header"
    >
      <PopoutButton
        lineType={"tlbr"}
        text={"tl-br"}
        tileShape={"small"}
        targetTasks={getTargetTaskTexts("tlbr")}
      />
      {[...Array(taskData.size)].map((_, j) => (
        <PopoutButton
          key={`col${j + 1}`}
          lineType={`col${j + 1}`}
          text={`col-${j + 1}`}
          tileShape={"horizontal"}
          targetTasks={getTargetTaskTexts(`col${j + 1}`)}
        />
      ))}
    </div>,
  ]);
  rows.push(
    [...Array(taskData.size)].map((_, i) => (
      <div
        className={classNamesForCols}
        style={dynamicStylesForCols}
        key={`row${i + 1}`}
      >
        <PopoutButton
          lineType={`row${i + 1}`}
          text={`row-${i + 1}`}
          tileShape={"vertical"}
          targetTasks={getTargetTaskTexts(`row${i + 1}`)}
        />
        {[...Array(taskData.size)].map((_, j) => {
          if (tasks[i * taskData.size + j]) {
            return (
              <TaskButton
                key={`${i * taskData.size + j}`}
                lineTypes={tasks[i * taskData.size + j].lineTypes}
                text={tasks[i * taskData.size + j].text}
                tileShape={"normal"}
              />
            );
          }
          return <></>;
        })}
      </div>
    ))
  );
  rows.push([
    <div
      className={`${classNamesForCols}`}
      style={dynamicStylesForColsOfBottomRow}
      key="footer"
    >
      <PopoutButton
        lineType={"bltr"}
        text={"bl-tr"}
        tileShape={"small"}
        targetTasks={getTargetTaskTexts("bltr")}
      />
      <PopoutButton
        lineType={"card"}
        text={"card"}
        tileShape={"horizontal-long"}
        targetTasks={getTargetTaskTexts("card")}
      />
    </div>,
  ]);

  return (
    <div className={classNamesForRows} style={dynamicStylesForRows}>
      {rows}
    </div>
  );
}
