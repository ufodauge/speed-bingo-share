import React from 'react';

import AppHeader from './components/AppHeader/AppHeader';
import MainBoard from './components/MainBoard/MainBoard';
import ThemeWrapper from './contexts/Theme';

const Home = () => {
  return (
    <ThemeWrapper>
      <AppHeader />
      <MainBoard />
    </ThemeWrapper>
  );
};

export default Home;
