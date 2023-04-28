import { taskData } from "@/const/TaskData";

type Props = {};

const HeaderTitle: React.FC<Props> = () => {
  return <span className="text-xl text-neutral-content">{taskData.title}</span>;
};

export default HeaderTitle;
