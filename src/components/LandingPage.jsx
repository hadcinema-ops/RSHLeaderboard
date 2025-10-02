import React from 'react'
import PrizePool from './PrizePool'

export default function LandingPage({onViewLeaderboard}){
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          $1,000 Monthly <span className="text-purple-400">Stake × RSH</span> Wager Leaderboard
        </h1>
        <div className="mt-4 text-white/80">
          <div>Eligible users must be under codes <b>supper</b>, <b>supper10</b>, or <b>suppercap</b>.</div>
          <div className="mt-1">Sign up on Stake.com under code <b>supper10</b> for a free $10 bonus.</div>
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={onViewLeaderboard} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition"></div>
            <div className="relative px-7 py-3 bg-black rounded-2xl border border-white/10 font-semibold">View Leaderboard</div>
          </button>
        </div>
      </div>
      <PrizePool />
    </section>
  )
}
