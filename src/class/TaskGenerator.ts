import { taskData } from "@/const/TaskData";
import { LineType } from "@/lib/types";
import { Tracker } from "@/types/tracker";

import MagicSquare from "./MagicSquare";
import Task from "./Task";
import TaskList from "./TaskList";

const getLineTypesByIndex = (i: number): LineType[] => {
  const result: LineType[] = ["card"];
  const MAX_LINES = taskData.size;

  // cols
  const colIndex = (i % MAX_LINES) + 1;
  result.push(`col${colIndex}`);

  // rows
  const rowIndex = Math.floor(i / MAX_LINES) + 1;
  result.push(`row${rowIndex}`);

  // tlbr
  if (i % (MAX_LINES + 1) === 0) result.push("tlbr");

  // bltr
  const BLTR = [...Array(MAX_LINES)].map((_, j) => (j + 1) * (MAX_LINES - 1));
  if (BLTR.includes(i)) result.push("bltr");

  return result;
};

const BOARD_SIZE = taskData.size;
const DISPLAY_TASKS = BOARD_SIZE * BOARD_SIZE;

export type GeneratedTask = {
  index: number;
  text: string;
  trackers?: Tracker[];
  lineTypes: LineType[];
};

export default function TaskGenerator(
  seed: number,
  lang: string
): GeneratedTask[] {
  const magicSquare = new MagicSquare(taskData.size, seed);
  const taskList = new TaskList(taskData.data, lang);

  const tasks: Task[] = [...Array<Task>(DISPLAY_TASKS)].map((_, i) => {
    return magicSquare.assignTask(
      taskList.chooseTasksByDifficulty(magicSquare.getDifficulty(i)),
      i
    );
  });

  // generate tasks
  const chosenTasks: GeneratedTask[] = tasks.map((task, i) => {
    return {
      index: task.index,
      text: task.text,
      trackers: task.trackers,
      lineTypes: getLineTypesByIndex(i),
    };
  });

  return chosenTasks;
}
