import assert from "assert";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Decode } from "@/lib/encoder";

import ThemeWrapper from "./contexts/Theme";

// /countdown?seed=xxx&lang=ja&theme=dark&publishTime=YYYYYYYY
const Home = () => {
  const [countdown, setCountdown] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { code, lang, theme } = router.query;

    assert(typeof code === "string");
    assert(typeof lang === "string");
    assert(typeof theme === "string");

    const data = Decode(code);
    const [seed, publishTime] = data.split("___&___");
    console.log(data, seed, publishTime);

    const targetTime = new Date(Number(publishTime)).getTime();
    console.log(new Date(Number(publishTime)));

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(timer);
        router.push({
          pathname: "/",
          query: {
            seed: seed.toString(),
            lang,
            theme,
          },
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = String(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0");
        const minutes = String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
        const seconds = String(
          Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0");

        setCountdown(`${days}d ${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <ThemeWrapper>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <h1 className="text-5xl font-bold">
            {countdown ? <p>{countdown}</p> : <></>}
          </h1>
        </div>
      </div>
    </ThemeWrapper>
  );
};

export default Home;
