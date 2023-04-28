import { useContext } from 'react';

import { ThemeAction } from '@/pages/contexts/Theme';

import MdiThemeLightDark from '../Svg/ThemeLightDark';

const ThemeToggler = () => {
  const { toggle } = useContext(ThemeAction);
  return (
    <button type="button" className="btn btn-circle" onClick={toggle}>
      <MdiThemeLightDark width="2em" height="2em" />
    </button>
  );
};

export default ThemeToggler;
