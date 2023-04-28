import React, { MouseEventHandler } from "react";

type Props = {
  className: string;
  onMouseOver?: MouseEventHandler<HTMLButtonElement>;
  onMouseOut?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onContextMenu?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({
  className,
  onMouseOver,
  onMouseOut,
  onClick,
  children
}) => {
  return (
    <button
      type="button"
      className={className}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
