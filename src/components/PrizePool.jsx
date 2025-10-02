import React from 'react'

const PRIZES=[
  {place:'1st', amount:500, emoji:'🥇', color:'from-yellow-400/30 to-transparent'},
  {place:'2nd', amount:250, emoji:'🥈', color:'from-gray-300/25 to-transparent'},
  {place:'3rd', amount:125, emoji:'🥉', color:'from-amber-600/25 to-transparent'},
  {place:'4th', amount:75, emoji:'🎖', color:'from-purple-400/20 to-transparent'},
  {place:'5th', amount:50, emoji:'🎖', color:'from-purple-400/20 to-transparent'},
]

export default function PrizePool(){
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {PRIZES.map((p,idx)=>(
        <div key={idx} className={`relative card p-4 overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${p.color} pointer-events-none`}></div>
          <div className="relative flex items-center justify-between">
            <div className="text-2xl">{p.emoji}</div>
            <div className="text-right">
              <div className="text-sm uppercase tracking-wide text-white/60">{p.place}</div>
              <div className="text-xl font-extrabold">${p.amount.toFixed(0)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
