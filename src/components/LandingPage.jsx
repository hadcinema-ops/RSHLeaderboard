import React from 'react'
import PrizePool from './PrizePool'

export default function LandingPage({onViewLeaderboard}){
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          $1,000 Monthly <span className="text-purple-400">Stake × RSH</span> Wager Leaderboard
        </h1>
        <p className="mt-3 text-white/70 max-w-2xl mx-auto">
          Track the top wagers, auto-masked usernames, and dynamic rankings. Updated on page load from your Google Sheet.
        </p>
        <div className="flex justify-center mt-8">
          <button onClick={onViewLeaderboard} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition"></div>
            <div className="relative px-7 py-3 bg-black rounded-2xl border border-white/10 font-semibold">View Leaderboard</div>
          </button>
        </div>
      </div>
      <PrizePool />
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <Feature title="Masked Usernames" desc="Displays only first two and last two characters with *** in between."/>
        <Feature title="Top 3 Podium" desc="Gold / Silver / Bronze with glow, pulsing aura, and animated counters."/>
        <Feature title="Past Month Toggle" desc="Jump between current and past month sheets instantly."/>
      </div>
    </section>
  )
}

function Feature({title,desc}){
  return (
    <div className="card p-5">
      <div className="text-lg font-semibold mb-1">{title}</div>
      <div className="text-sm text-white/70">{desc}</div>
    </div>
  )
}
