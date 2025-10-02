import React from 'react'

export default function LandingPage({onViewLeaderboard}){
  return (
    <section className="hero">
      <div className="inner max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="card p-8 md:p-12">
          <div className="badge glass mb-4">Stake × RSH</div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight gradient-title">$1,000 Monthly Wager Leaderboard</h1>
          <div className="mt-4 text-white/85 text-lg">
            Eligible users must be under codes <b>supper</b>, <b>supper10</b>, or <b>suppercap</b>.
            <div className="mt-1">Sign up on Stake.com under code <b>supper10</b> for a free $10 bonus.</div>
          </div>
          <div className="mt-8">
            <button onClick={onViewLeaderboard} className="btn-primary"><span>View Leaderboard</span></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {[["🥇","1st","$500"],["🥈","2nd","$250"],["🥉","3rd","$125"],["🎖","4th","$75"],["🎖","5th","$50"]].map((p,i)=>(
            <div key={i} className="card p-5 flex items-center justify-between">
              <div className="text-2xl">{p[0]}</div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-white/60">{p[1]}</div>
                <div className="text-xl font-extrabold">{p[2]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
