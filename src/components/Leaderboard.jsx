import React, { useEffect, useMemo, useState } from 'react'
import { SHEET_ID, CURRENT_GID, PAST_GID } from '../config'
import { fetchSheet, normalizeRows } from '../utils'
import Podium from './Podium'

export default function Leaderboard({onBack}){
  const [usePast,setUsePast] = useState(false)
  const [rows,setRows] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')

  useEffect(()=>{
    (async ()=>{
      setLoading(true); setError('')
      try{
        const gid = usePast ? PAST_GID : CURRENT_GID
        const {headers, rows} = await fetchSheet(gid)
        const clean = normalizeRows(headers, rows)
        if(!clean.length) throw new Error('No rows parsed (check columns)')
        setRows(clean)
      }catch(e){
        setError(e.message||'Failed to load leaderboard')
        setRows([])
      }finally{
        setLoading(false)
      }
    })()
  },[usePast])

  const top3 = useMemo(()=>rows.slice(0,3),[rows])
  const rest = useMemo(()=>rows.slice(3),[rows])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight gradient-title">Leaderboard</h2>
        <div className="flex gap-2">
          <Toggle active={!usePast} onClick={()=>setUsePast(false)}>Current</Toggle>
          <Toggle active={usePast} onClick={()=>setUsePast(true)}>Past Month</Toggle>
          <button onClick={onBack} className="ml-2 px-3 py-2 rounded-xl glass text-sm">Back</button>
        </div>
      </div>

      <StatusBar loading={loading} error={error} usePast={usePast} />

      {rows.length>0 && <Podium top3={top3} loading={loading} />}

      <div className="mt-6 card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <Th>#</Th><Th>User</Th><Th className="text-right pr-4">Wagered</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({length:8}).map((_,i)=>(
              <tr key={i} className="border-t border-white/5">
                <Td><div className="h-4 w-6 animate-pulse bg-white/10 rounded"></div></Td>
                <Td><div className="h-4 w-40 animate-pulse bg-white/10 rounded"></div></Td>
                <Td className="text-right pr-4"><div className="h-4 w-24 ml-auto animate-pulse bg-white/10 rounded"></div></Td>
              </tr>
            )) : rows.map((r)=> (
              <tr key={r.rank} className="border-t border-white/5 table-row">
                <Td>{r.rank}</Td>
                <Td className="font-semibold">{r.userMasked}</Td>
                <Td className="text-right pr-4">{r.wager.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0})}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Toggle({active,children,...props}){
  return (
    <button {...props} className={`px-3 py-1.5 rounded-xl text-sm ${active?'bg-white/15':'glass hover:bg-white/10'}`}>{children}</button>
  )
}
function Th({children,className=''}){ return <th className={`text-left text-white/70 text-xs uppercase tracking-wider py-3 px-4 ${className}`}>{children}</th> }
function Td({children,className=''}){ return <td className={`py-3 px-4 ${className}`}>{children}</td> }
function StatusBar({loading,error,usePast}){
  const msg = loading ? 'Loading from Google Sheet…' : (error? error : (usePast? 'Past month data' : 'Current month data'))
  const color = loading? '#fbbf24' : error? '#f87171' : '#34d399'
  return (
    <div className="mb-6 flex items-center gap-3 text-sm">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{backgroundColor: color+'33', color}}>
        <span className="h-2 w-2 rounded-full" style={{backgroundColor: color}}></span>
        {msg}
      </span>
    </div>
  )
}
