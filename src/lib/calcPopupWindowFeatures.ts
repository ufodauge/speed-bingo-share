import { taskData } from "@/const/TaskData";
import { LayoutName } from "@/types/layout";

const HEADER_SIZE = 40;
const CELL_SIZE = 120;

export const CalcPopupWindowFeatures = (layoutName: LayoutName): string => {
  const cellCount = taskData.size;
  const size = (() => {
    if (layoutName === "card") {
      return `width=${CELL_SIZE * cellCount},height=${
        CELL_SIZE * cellCount + HEADER_SIZE
      }`;
    } else if (layoutName === "horizontal") {
      return `width=${CELL_SIZE * cellCount},height=240`;
    } else if (layoutName === "vertical") {
      return `width=240,height=${CELL_SIZE * cellCount}`;
    }
    throw new Error("Unknown Error.");
  })();

  return `${size},noOpener,noReferrer`;
};
