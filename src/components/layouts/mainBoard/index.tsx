import DashBoard from "@/components/features/dashboard";
import Description from "@/components/features/description";
import { css } from "@emotion/react";

type Props = {};

const MainBoard: React.FC<Props> = () => {
  const style = css({
    display: "grid",
    gridAutoRows: "max",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gap: "0.75rem",
    width: "600px",
    alignItems: "baseline",
    padding: "2rem",
  });

  return (
    <div css={style}>
      <DashBoard />
      <Description />
    </div>
  );
};

export default MainBoard;
