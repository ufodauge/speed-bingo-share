import React, { useState } from "react";

type CounterProps = {
  max: number;
  init: number;
  icon?: string;
};

export default function Counter({ max, init, icon }: CounterProps) {

  const [count, setCount] = useState(init);

  const countUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (e.type === "click") {
      setCount(count >= max ? count : count + 1);
    } else if (e.type === "contextmenu") {
      // prevents default event
      e.preventDefault();
      setCount(count <= 0 ? count : count - 1);
    }
  };

  return (
    <button
      className="btn btn-sm btn-ghost no-animation"
      type="button"
      onClick={countUp}
      onContextMenu={countUp}
    >
      {icon ? <img src={icon} className="w-6 h-6 m-1" alt="" /> : <></>}
      {`${count} / ${max}`}
    </button>
  );
}
