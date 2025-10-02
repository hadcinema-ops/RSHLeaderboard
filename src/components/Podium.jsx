import React from 'react'
import { formatMoney } from '../utils'

export default function Podium({top3=[], loading}){
  if(loading) return (
    <div className="grid md:grid-cols-3 gap-4">
      {Array.from({length:3}).map((_,i)=>(
        <div key={i} className="card p-5 h-28 shine"></div>
      ))}
    </div>
  )
  const [one,two,three] = top3
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <PodiumCard place="2" title={two?.userMasked} amount={two?.wager} tone="silver" />
      <PodiumCard place="1" title={one?.userMasked} amount={one?.wager} tone="gold" featured/>
      <PodiumCard place="3" title={three?.userMasked} amount={three?.wager} tone="bronze" />
    </div>
  )
}

function PodiumCard({place,title='',amount=0,tone='gold',featured=false}){
  const tones={
    gold:   'from-yellow-400/30 to-transparent',
    silver: 'from-gray-300/25 to-transparent',
    bronze: 'from-amber-600/25 to-transparent'
  }
  return (
    <div className={`relative card p-5 overflow-hidden ${featured?'scale-[1.03]':''}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${tones[tone]} pointer-events-none`}></div>
      <div className="relative flex items-center justify-between">
        <div className="text-sm text-white/70 uppercase">#{place}</div>
        <div className="text-xs text-white/60">Top wager</div>
      </div>
      <div className="relative mt-2 flex items-end justify-between">
        <div className="text-xl font-extrabold">{title || '—'}</div>
        <div className="text-lg font-bold">{formatMoney(amount||0)}</div>
      </div>
    </div>
  )
}
