import React from "react";
import { useState } from "react";

type TogglerProps = {
  icons: string[];
};

export default function Toggler({ icons = [] }: TogglerProps) {
  const [togglers, setTogglers] = useState<boolean[]>(icons.map(() => false));
  const toggleByIndex = (i: number) => {
    setTogglers(togglers.map((v, j) => (i === j ? !v : v)));
  };

  const buttons: JSX.Element[] = icons.map((icon, i) => {
    const className = togglers[i] ? "" : "grayscale opacity-50";
    return (
      <button
        key={i}
        type="button"
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          toggleByIndex(i);
        }}
      >
        <img
          src={icon === "" ? "/button.png" : icon}
          alt="icon"
          className="w-6 h-6 m-1"
        />
      </button>
    );
  });

  return <div>{buttons}</div>;
}
