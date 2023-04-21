import React from 'react';

import AppHeader from './components/AppHeader/AppHeader';
import MainBoard from './components/MainBoard/MainBoard';
import ThemeWrapper from './contexts/Theme';

const Home = () => {
  return (
    <ThemeWrapper>
      <AppHeader />
      <MainBoard />

      <input type="checkbox" id="base-modal" className="modal-toggle" />
      <label htmlFor="base-modal" className="modal">
        <label className="modal-box relative" htmlFor=""></label>
      </label>
    </ThemeWrapper>
  );
};

export default Home;
