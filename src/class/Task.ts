import { Tracker } from "@/types/tracker";

export default class Task {
  index: number;
  difficulty: number;
  text: string;
  filter: number;
  trackers?: Tracker[];

  constructor(
    index: number,
    difficulty: number,
    text: string,
    filter: number,
    trackers?: Tracker[]
  ) {
    this.index = index;
    this.difficulty = difficulty;
    this.text = text;
    this.filter = filter;
    this.trackers = trackers;
  }
}
