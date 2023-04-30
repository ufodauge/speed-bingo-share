import DashBoard from "@/components/features/dashboard";
import { css } from "@emotion/react";

type Props = {};

const MainBoard: React.FC<Props> = () => {
  const style = {
    base: css({
      display: "grid",
      gridAutoRows: "max",
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
      gap: "0.75rem",
      width: "600px",
      alignItems: "baseline",
      padding: "2rem"
    }),
    description: css({}),
  };
  return (
    <div css={style.base}>
      <DashBoard />
      <div css={style.description}>description is here.</div>
    </div>
  );
};

export default MainBoard;
