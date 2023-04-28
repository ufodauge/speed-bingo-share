import data from "@/data/data.json";

import { useQuery } from "./useQuery";
import { TaskData } from "@/class/taskData";

const FORCE_DEFAULT_DATA = true;
const DEFAULT_URL = "";

const DEFAULT_TASK_DATA = new TaskData(data);

// load task data from gist or use default data.
export const useTaskData = () => {
  let url = DEFAULT_URL;
  useQuery(
    (v) => {
      if (!FORCE_DEFAULT_DATA) {
        return;
      }
      url = v.url;
    },
    { url: DEFAULT_URL }
  );

  const taskData = DEFAULT_TASK_DATA;

  if (url !== DEFAULT_URL) {
    // load task data from url
  }

  return taskData;
};
