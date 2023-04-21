import React from 'react';

import BingoBoardWrapper from '@/pages/contexts/BingoBoard';

import BingoBoard from '../BingoBoard/BingoBoard';
import Dashboard from '../Dashboard/Dashboard';

export default function MainBoard() {
  return (
    <BingoBoardWrapper>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        <BingoBoard />

        <Dashboard />
      </div>
    </BingoBoardWrapper>
  );
}
