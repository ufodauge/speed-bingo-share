import BingoBoard from '@/components/features/bingoBoard';
import ThemeToggler from '@/components/features/modules/themeToggler';
import Header from '@/components/ui/header';
import ThemeWrapper from '@/contexts/theme';
import { useTaskData } from '@/lib/hooks/useTaskData';

type Props = {};

const Home: React.FC<Props> = () => {
  const taskData = useTaskData();
  
  return (
    <ThemeWrapper>
      <Header text={taskData.title}>
        <ThemeToggler />
      </Header>
      <BingoBoard />
    </ThemeWrapper>
  );
};

export default Home;
