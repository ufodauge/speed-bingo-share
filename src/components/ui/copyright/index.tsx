import { css } from "@emotion/react";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const Copyright: React.FC<Props> = ({ children }) => {
  const style = css({
    
  });
  return <div css={style}>{children}</div>;
};

export default Copyright;
