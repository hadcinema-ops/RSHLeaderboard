import React from 'react';
import PrizePool from './PrizePool';
import stakeLogo from '../assets/stake-logo.png';
import rshLogo from '../assets/rsh-logo.jpg';

export default function LandingPage({ onViewLeaderboard }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="flex gap-6 mb-10">
        <img src={stakeLogo} alt="Stake" className="h-20" />
        <img src={rshLogo} alt="RSH" className="h-20 rounded-lg" />
      </div>
      <h1 className="text-4xl font-extrabold mb-6">Stake x RSH $1,000 Monthly Wager Leaderboard</h1>
      <PrizePool />
      <button
        onClick={onViewLeaderboard}
        className="mt-12 px-6 py-3 bg-purple-600 hover:bg-purple-800 rounded-xl font-bold text-lg shadow-lg transition"
      >
        View Leaderboard
      </button>
    </div>
  );
}
