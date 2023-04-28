import { taskData } from '@/const/TaskData';
import { LayoutName } from '@/types/layout';
import { Task } from '@/types/task';

import TaskButton from './TaskButton';

type Props = {
  tasks: Task[];
  layout: LayoutName;
};

export default function TaskButtons({ tasks = [], layout }: Props) {
  const cellWidth = layout === "card" ? taskData.size : 1;
  const cellHeight = taskData.size;

  return (
    <div
      className={`flex-1 flex ${
        layout === "horizontal" ? "flex-row" : "flex-col"
      } justify-evenly`}
    >
      {[...Array(cellHeight)].map((_, y) => (
        <div key={y} className="flex w-full h-full">
          {[...Array(cellWidth)].map((_, x) => {
            console.log(tasks[y * cellWidth + x]);
            return (
              <TaskButton key={`${x}-${y}`} task={tasks[y * cellWidth + x]} />
            );
          })}
        </div>
      ))}
    </div>
  );
}
