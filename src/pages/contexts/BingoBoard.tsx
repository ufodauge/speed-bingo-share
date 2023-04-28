import assert from "assert";
import { useRouter } from "next/router";
import { createContext, FC, ReactNode, useEffect, useState } from "react";

import TaskGenerator from "@/class/TaskGenerator";
import { DefaultLanguage } from "@/const/language";
import { taskData } from "@/const/TaskData";
import { LineType } from "@/types/lineType";
import { Task } from "@/types/task";

type BoardValuesProps = {
  seed: number;
  lang: string;
  tasks: Task[];
  targetedLine?: LineType;
};

type BoardActionsProps = {
  setSeed: React.Dispatch<React.SetStateAction<number>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  updateTargetedLine: (lineType?: LineType) => void;
  updateTasks: (seed: number, lang: string) => void;
};

export const BoardValuesContext = createContext<BoardValuesProps>({
  seed: 0,
  lang: "en",
  tasks: TaskGenerator(0, "en"),
});

export const BoardActionsContext = createContext<BoardActionsProps>({
  setSeed: () => {},
  updateTargetedLine: () => {},
  setLanguage: () => {},
  updateTasks: () => {},
});

type Props = {
  children: ReactNode;
};

const BingoBoardWrapper: FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  const query = router.query;

  const [seed, setSeed] = useState(0);
  const [lang, setLanguage] = useState("en");
  const [tasks, setTasks] = useState(TaskGenerator(0, "en"));

  const updateTasks = (seed: number, lang: string) =>
    setTasks(TaskGenerator(seed, lang));

  const [targetedLine, setTargetedLine] = useState<LineType | undefined>();
  const updateTargetedLine = (lineType?: LineType) => {
    setTargetedLine(lineType);
  };

  /**
   * on mounted
   */
  useEffect(() => {
    if (!router.isReady) return;

    assert(
      query.seed === undefined || typeof query.seed === "string",
      "Multiple seed numbers."
    );
    assert(
      query.lang === undefined || typeof query.lang === "string",
      "Multiple languages."
    );

    const lang =
      query.lang && taskData.lang.includes(query.lang)
        ? query.lang
        : DefaultLanguage;
    const seed = !Number.isNaN(Number(query.seed))
      ? Number(query.seed)
      : Math.floor(Math.random() * 1000000);

    setSeed(seed);
    setLanguage(lang);

    updateTasks(seed, lang);

    router.push(
      {
        pathname: "/",
        query: {
          seed: String(seed),
          lang: lang,
        },
      },
      undefined,
      { shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <BoardValuesContext.Provider
      value={{
        seed,
        lang,
        tasks,
        targetedLine,
      }}
    >
      <BoardActionsContext.Provider
        value={{
          setSeed,
          updateTasks,
          setLanguage,
          updateTargetedLine,
        }}
      >
        {children}
      </BoardActionsContext.Provider>
    </BoardValuesContext.Provider>
  );
};

export default BingoBoardWrapper;
