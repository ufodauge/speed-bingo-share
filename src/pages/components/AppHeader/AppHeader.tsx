import { useContext } from 'react';

import data from '@/data/data.json';

import { ThemeAction } from '../../contexts/Theme';
import MdiThemeLightDark from '../Svg/ThemeLightDark';

export default function AppHeader() {
  const { toggle } = useContext(ThemeAction);
  
  return (
    <div className="navbar bg-neutral">
      <div className="navbar-start px-6">
        <span className="text-xl text-neutral-content">{data.title}</span>
      </div>

      <div className="navbar-end px-3">
        <button type="button" className="btn btn-circle" onClick={toggle}>
          <MdiThemeLightDark width="2em" height="2em" />
        </button>
      </div>
    </div>
  );
}
