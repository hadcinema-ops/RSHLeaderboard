import React from 'react';

export default function PrizePool() {
  const prizes = [
    { place: '1st', amount: '$500', emoji: '🥇' },
    { place: '2nd', amount: '$250', emoji: '🥈' },
    { place: '3rd', amount: '$125', emoji: '🥉' },
    { place: '4th', amount: '$75', emoji: '🎖' },
    { place: '5th', amount: '$50', emoji: '🎖' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8">
      {prizes.map((p, i) => (
        <div key={i} className="bg-gray-800 rounded-xl p-4 shadow-lg transform hover:scale-105 transition">
          <div className="text-2xl">{p.emoji}</div>
          <div className="font-bold text-xl">{p.place}</div>
          <div className="text-purple-400">{p.amount}</div>
        </div>
      ))}
    </div>
  );
}
