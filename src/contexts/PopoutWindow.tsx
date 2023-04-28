import { createContext, FC, ReactNode, useState } from 'react';

import { DefaultLanguage } from '@/const/language';

type PopoutWindowContext = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  taskIndexes: number[];
  // layoutType:
};

export const PopoutWindowContext = createContext<PopoutWindowContext>({
  language: "ja",
  setLanguage: () => {},
  taskIndexes: [0, 0, 0, 0, 0],
});

type Props = {
  children: ReactNode;
};

const PopoutWindowWrapper: FC<Props> = ({ children }: Props) => {
  const [language, setLanguage] = useState<string>(DefaultLanguage);

  const context: PopoutWindowContext = {
    language,
    setLanguage,
    taskIndexes: [0, 0, 0, 0, 0],
  };

  return (
    <PopoutWindowContext.Provider value={context}>
      {children}
    </PopoutWindowContext.Provider>
  );
};

export default PopoutWindowWrapper;
