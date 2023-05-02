import { css } from "@emotion/react";
import { MouseEventHandler, useState } from "react";

type Props = {
  icons: string[];
};

const Toggler: React.FC<Props> = ({ icons }) => {
  const [togglers, setTogglers] = useState<boolean[]>(icons.map(() => false));
  const toggleByIndex = (i: number) => {
    setTogglers(togglers.map((v, j) => (i === j ? !v : v)));
  };

  const buttons: JSX.Element[] = icons.map((icon, i) => {
    const style = {
      base: css({
        opacity: togglers[i] ? "" : "50%",
        filter: togglers[i] ? "" : "grayscale(1)",
        transitionDuration: ".15s",
        transitionTimingFunction: "ease-out"
      }),
      image: css({
        width: "1.5em",
        height: "1.5em",
        margin: ".375em",
      }),
    };
    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      toggleByIndex(i);
    };

    return (
      <button key={i} type="button" css={style.base} onClick={onClick}>
        <img
          src={icon === "" ? "/button.png" : icon}
          alt="icon"
          css={style.image}
        />
      </button>
    );
  });

  return <div>{buttons}</div>;
};

export default Toggler;
