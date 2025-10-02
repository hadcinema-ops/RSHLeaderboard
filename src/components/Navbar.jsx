import React from 'react'
import stakeLogo from '../assets/stake-logo.png'

export default function Navbar({page,onNav}){
  return (
    <div className="sticky top-0 z-40 bg-[#090914]/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={stakeLogo} className="h-8 w-auto" alt="Stake" />
          <span className="text-white/60">×</span>
          <div className="font-extrabold tracking-tight">RSH</div>
        </div>
        <div className="flex items-center gap-2 glass rounded-full p-1">
          <button onClick={()=>onNav('landing')} className={`px-4 py-1.5 rounded-full text-sm ${page==='landing'?'bg-white/15':'hover:bg-white/10'}`}>Home</button>
          <button onClick={()=>onNav('leaderboard')} className={`px-4 py-1.5 rounded-full text-sm ${page==='leaderboard'?'bg-white/15':'hover:bg-white/10'}`}>Leaderboard</button>
        </div>
      </div>
    </div>
  )
}
