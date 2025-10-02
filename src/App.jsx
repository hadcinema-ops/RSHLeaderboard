import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Leaderboard from './components/Leaderboard';

export default function App() {
  const [page, setPage] = useState('landing');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {page === 'landing' ? (
        <LandingPage onViewLeaderboard={() => setPage('leaderboard')} />
      ) : (
        <Leaderboard onBack={() => setPage('landing')} />
      )}
    </div>
  );
}
