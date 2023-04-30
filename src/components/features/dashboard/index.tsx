import Button from "@/components/ui/button";
import DateInput from "@/components/ui/dateinput";
import Label from "@/components/ui/label";
import Selector from "@/components/ui/selector";
import TextInput from "@/components/ui/textInput";
import { css } from "@emotion/react";

type Props = {};

const DashBoard: React.FC<Props> = () => {
  const style = {
    base: css({
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gridTemplateRows: "repeat(5, 3rem)",
      gap: "0.75rem",
      transitionDuration: ".2s",
      transitionTimingFunction: "ease-in-out",
    }),
    colSpan2: css({
      gridColumn: "span 2 / span 2",
    }),
  };

  return (
    <div css={style.base}>
      <Button outlined>Randomize</Button>
      <Button outlined>Update</Button>

      <Label>Seed</Label>
      <TextInput placeholder="123456" />

      <Label>Language</Label>
      <Selector options={[]}></Selector>

      <Label>Opening</Label>
      <DateInput defaultTime={new Date()} onChange={() => {}} />

      <Button outlined customStyle={style.colSpan2}>
        Publish
      </Button>
    </div>
  );
};

export default DashBoard;
