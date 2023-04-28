import { css } from "@emotion/react";
import TaskButton from "../buttons/taskButton";
import { Task } from "@/types/task";

type Props = { boardSize: number; gap: number; tasks: Task[] };

const TaskBoard: React.FC<Props> = ({ boardSize, gap, tasks }) => {
  const style = css({
    display: "grid",
    gridTemplateColumns: [...Array(boardSize)].map(() => "1fr").join(" "),
    gridTemplateRows: [...Array(boardSize)].map(() => "1fr").join(" "),
    gap: `${gap}px`,
  });
  return (
    <div css={style}>
      {[...Array(boardSize ** 2)].map((_, i) => (
        <TaskButton text="test" lineTypes={[]} key={i} />
      ))}
    </div>
  );
};

export default TaskBoard;
