import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

import data from "@/data/data.json";
import {
  BoardActionsContext,
  BoardValuesContext,
} from "@/pages/contexts/BingoBoard";
import { ThemeValue } from "@/pages/contexts/Theme";
import { Encode } from "@/lib/encoder";

export default function Dashboard() {
  const { seed, lang } = useContext(BoardValuesContext);
  const { setSeed, updateTasks, setLanguage } = useContext(BoardActionsContext);
  const { theme } = useContext(ThemeValue);

  const [publishTime, setPublishTime] = useState(Number(new Date()));

  const router = useRouter();

  /**
   * randomize tasks
   */
  const randomize = () => {
    const s = Math.floor(Math.random() * 1000000);
    setSeed(s);

    updateTasks(s, lang);

    router.push(
      {
        pathname: "/",
        query: {
          s,
          lang,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  /**
   * update tasks
   */
  const update = () => {
    updateTasks(seed, lang);

    router.push(
      {
        pathname: "/",
        query: {
          seed,
          lang,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  /**
   * update seed number
   */
  const updateSeed: React.ChangeEventHandler<HTMLInputElement> = (v) => {
    setSeed(Number(v.target.value));
  };

  /**
   * update language
   */
  const updateLanguage: React.ChangeEventHandler<HTMLSelectElement> = (v) => {
    setLanguage(v.target.value);

    updateTasks(seed, v.target.value);

    router.push(
      {
        pathname: "/",
        query: {
          seed,
          lang: v.target.value,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const publishBingoBoardWithCountDown = () => {
    const code = Encode(String(seed) + "___&___" + publishTime);
    router.push({
      pathname: "/countdown",
      query: {
        code,
        lang,
        theme,
      },
    });
  };

  return (
    <React.Fragment>
      <div className="grid auto-rows-max grid-cols-1 gap-3 w-[600px] items-baseline">
        <div className="grid grid-cols-2 gap-3">
          <button className="btn btn-outline" type="submit" onClick={randomize}>
            Randomize
          </button>
          <button className="btn btn-outline" type="submit" onClick={update}>
            Update
          </button>

          {/* Seed */}
          <label className="flex justify-center label">
            <span className="text-base label-text">Seed</span>
          </label>
          <input
            placeholder="123456"
            className="w-full max-w-xs input input-bordered cols-end-2"
            value={seed}
            onChange={updateSeed}
          />

          {/* Language */}
          <label className="flex justify-center label">
            <span className="text-base label-text">Language</span>
          </label>
          <select
            className="w-full max-w-xs select"
            value={lang}
            onChange={updateLanguage}
          >
            {data.lang.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>

          {/* Publish Countdown */}
          <label className="flex justify-center label">
            <span className="text-base label-text">Publish Time</span>
          </label>
          <input
            type="datetime-local"
            className="w-full max-w-xs input input-bordered"
            onChange={(v) =>
              setPublishTime(
                v.target.valueAsNumber + new Date().getTimezoneOffset() * 60000
              )
            }
          />

          <button
            type="button"
            className="btn btn-outline col-span-2"
            onClick={publishBingoBoardWithCountDown}
          >
            Publish
          </button>
        </div>

        <div>{data.description}</div>
      </div>
    </React.Fragment>
  );
}
