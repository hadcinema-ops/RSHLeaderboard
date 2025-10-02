import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import Leaderboard from './components/Leaderboard'
import Navbar from './components/Navbar'

export default function App(){
  const [page,setPage] = useState('landing')
  return (
    <div className="min-h-screen bg-grid">
      <Navbar page={page} onNav={setPage} />
      {page==='landing' ? <LandingPage onViewLeaderboard={()=>setPage('leaderboard')} /> : <Leaderboard onBack={()=>setPage('landing')}/>}
      <footer className="text-center text-xs text-white/50 py-6">Stake × RSH • Live from Google Sheets • Reload to refresh</footer>
    </div>
  )
}
