import assert from "assert";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { DefaultLanguage } from "@/const/language";
import { taskData } from "@/const/TaskData";
import { isLayoutName, LayoutName } from "@/types/layout";
import { Task } from "@/types/task";

import TargetedCardWindowHeader from "./components/TargetCardWindow/Header";
import TaskButtons from "./components/TargetCardWindow/TaskButtons";
import ThemeWrapper from "./contexts/Theme";

// /popout?taskIndex=0;1;2;3;4;5&lang=en&layout=horizontal&header=col1&theme=dark
export default function TargetedCardWindow() {
  const router = useRouter();
  const query = router.query;

  const [header, setHeader] = useState<string | undefined>();

  const [layoutName, setLayoutName] = useState<LayoutName>("vertical");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!router.isReady) return;

    // assert queries
    assert(query.layout === undefined || typeof query.layout === "string");
    assert(
      query.taskIndex === undefined || typeof query.taskIndex === "string"
    );
    assert(query.lang === undefined || typeof query.lang === "string");
    assert(query.header === undefined || typeof query.header === "string");

    setHeader(query.header);

    const lang: string = query.lang ?? DefaultLanguage;

    setTasks(
      query.taskIndex?.split(";").map((v) => {
        const result = taskData.data[Number(v)];
        assert(result);
        return {
          index: Number(v),
          difficulty: result.difficulty,
          text: result.contents[lang],
          filter: 0,
          lineTypes: [],
          trackers: result.trackers ?? [],
        };
      }) ?? []
    );

    const layoutName: string | undefined = query.layout;
    if (layoutName && isLayoutName(layoutName)) {
      setLayoutName(layoutName);
    } else if (layoutName && !isLayoutName(layoutName)) {
      throw new Error(`Unexpected layout name "${layoutName}"`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const result = (
    <ThemeWrapper>
      <div
        suppressHydrationWarning
        className={`w-full h-[100vh] flex ${
          layoutName === "horizontal" ? "flex-row" : "flex-col"
        }`}
      >
        {/* Header */}
        {header ? <TargetedCardWindowHeader text={header} /> : <></>}

        <TaskButtons tasks={tasks} layout={layoutName} />
      </div>
    </ThemeWrapper>
  );

  if (router.isReady) return result;
  return <></>;
}
