import React, { useContext } from "react";

import { taskData } from "@/const/TaskData";
import { LineType } from "@/types/lineType";
import { BoardValuesContext } from "@/pages/contexts/BingoBoard";

import PopoutButton from "./PopoutButton";
import TaskButton from "./TaskButton";
import { Task } from "@/types/task";

export default function BingoBoard() {
  const { tasks } = useContext(BoardValuesContext);

  const getTargetTaskTexts = (lineType: LineType): Task[] => {
    const result: Task[] = [];
    tasks
      .filter((v) => v.lineTypes.find((v) => v === lineType))
      .forEach((v) => result.push(v));
    return result;
  };

  const lines: LineType[] = ["bltr", "card", "tlbr"];
  for (let i = 0; i < taskData.size; i++) {
    lines.push(`col${i + 1}`, `row${i + 1}`);
  }

  const rows = [];
  rows.push([
    <div className="flex flex-nowarp" key="header">
      <PopoutButton
        lineType={"tlbr"}
        targetTasks={getTargetTaskTexts("tlbr")}
      />
      {[...Array(taskData.size)].map((_, j) => (
        <PopoutButton
          key={`col${j + 1}`}
          lineType={`col${j + 1}`}
          targetTasks={getTargetTaskTexts(`col${j + 1}`)}
        />
      ))}
    </div>,
  ]);
  rows.push(
    [...Array(taskData.size)].map((_, i) => (
      <div className="" key={`row${i + 1}`}>
        <PopoutButton
          lineType={`row${i + 1}`}
          targetTasks={getTargetTaskTexts(`row${i + 1}`)}
        />
        {[...Array(taskData.size)].map((_, j) => {
          return tasks[i * taskData.size + j] ? (
            <TaskButton
              key={`${i * taskData.size + j}`}
              lineTypes={tasks[i * taskData.size + j].lineTypes}
              text={tasks[i * taskData.size + j].text}
            />
          ) : (
            <></>
          );
        })}
      </div>
    ))
  );
  rows.push([
    <div className="flex" key="footer">
      <PopoutButton
        lineType={"bltr"}
        targetTasks={getTargetTaskTexts("bltr")}
      />
      <PopoutButton
        lineType={"card"}
        targetTasks={getTargetTaskTexts("card")}
      />
    </div>,
  ]);

  return <div className="">{rows}</div>;
}
