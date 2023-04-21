import assert from "assert";
import { useState } from "react";

import { MouseButton } from "@/const/mouseButton";
import { taskData } from "@/const/TaskData";
import {
  isCounterTrackerProps,
  isTogglerTrackerProps,
  isTrackerName,
} from "@/types/tracker";

import Counter from "./Tracker/Counter";
import Toggler from "./Tracker/Toggler";
import Task from "@/class/Task";

const HighlightColors = ["btn-ghost", "btn-color-1", "btn-color-2"];

type TargetedCardWindowTaskProps = {
  task: Task;
};

export default function TargetedCardWindowTask({
  task = new Task(0, 0, "null", 0),
}: TargetedCardWindowTaskProps) {
  const [highlightColorIndex, setHighlightColorIndex] = useState(0);
  const toggleHighlightColor: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (e.button === MouseButton.Primary) {
      setHighlightColorIndex(
        (highlightColorIndex + 1) % HighlightColors.length
      );
    } else if (e.button === MouseButton.Secondary) {
      setHighlightColorIndex(
        (highlightColorIndex + HighlightColors.length - 1) %
          HighlightColors.length
      );
    }
  };

  const tailwindClass =
    "btn btn-block border border-current no-animation rounded-none flex w-full h-full flex-col";
  const className = `${tailwindClass} ${HighlightColors[highlightColorIndex]}`;

  const trackers = task.trackers;

  const trackerElements = trackers?.map((v, i) => {
    // display ??? if tracker's name is not defined properly
    if (!isTrackerName(v.type))
      return (
        <div key={i} className="btn btn-disabled">
          ???
        </div>
      );

    if (v.type === "toggler") {
      // Toggler Element
      assert(isTogglerTrackerProps(v.properties));
      return <Toggler key={i} icons={v.properties.icons} />;
    } else if (v.type === "counter") {
      // Counter Element
      assert(isCounterTrackerProps(v.properties));
      return (
        <Counter
          key={i}
          max={v.properties.max}
          init={v.properties.init ?? 0}
          icon={v.properties.icon}
        />
      );
    }

    return <></>;
  });

  const result = (
    <div className="flex w-full h-full">
      <div
        className={className}
        onClick={toggleHighlightColor}
        onContextMenu={toggleHighlightColor}
      >
        <div className="w-full my-1">{task.text}</div>
        <div className="">{trackerElements}</div>
      </div>
    </div>
  );

  return result;
}
