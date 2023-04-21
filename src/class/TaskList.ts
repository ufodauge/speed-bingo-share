import { Tracker } from "@/types/tracker";
import Task from "./Task";

type TaskListInterface = {
  difficulty: number;
  contents: { [key: string]: string };
  trackers?: Tracker[];
  tags?: Array<string>;
};

export default class TaskList {
  private tasks: Task[];
  private tagList: string[];

  constructor(taskList: TaskListInterface[], lang: string) {
    this.tasks = [];
    this.tagList = [];

    taskList.forEach((taskInfo, i) => {
      taskInfo.tags?.forEach((v) => {
        if (!this.tagList.includes(v)) {
          this.tagList.push(v);
        }
      });

      let filter = 0b0;
      this.tagList.forEach((v, i) => {
        filter += taskInfo.tags?.includes(v) ? 0b1 << i : 0b0;
      });

      this.tasks.push(
        new Task(
          i,
          taskInfo.difficulty,
          taskInfo.contents[lang],
          filter,
          taskInfo.trackers
        )
      );
    });
  }

  chooseTasksByDifficulty = (difficulty: number): Task[] =>
    this.tasks.filter((v) => v.difficulty === difficulty);
}
