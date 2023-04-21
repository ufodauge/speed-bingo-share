import data from "@/data/data.json";
import { Tracker } from "@/types/tracker";

class TaskData {
  title: string;
  size: number;
  lang: string[];
  description: string;
  version: {
    major: number;
    minor: number;
    revision: number;
  };
  data: {
    difficulty: number;
    contents: { [key: string]: string };
    trackers?: Tracker[];
  }[];

  // TODO これでええんか？
  constructor(data: any) {
    this.title = data.title;
    this.size = data.size;
    this.lang = data.lang;
    this.description = data.description;
    this.version = data.version;
    this.data = data.data;
  }
}

export const taskData = new TaskData(data);
