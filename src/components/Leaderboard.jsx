import React, { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
import { SHEET_ID, CURRENT_GID, PAST_GID } from '../config'
import { tidyRows, formatMoney } from '../utils'
import Podium from './Podium'

function buildCsvUrl(gid){
  const bust = Date.now()
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}&_=${bust}`
}

const DEMO=[
  ['Username','Wagered'],
  ['JohnDoe89','$152,000'],
  ['ElGrande77','$96,500'],
  ['DaNice42','$75,250'],
  ['RShark33','$58,000'],
  ['Chadly20','$42,750'],
]

export default function Leaderboard({onBack}){
  const [usePast,setUsePast] = useState(false)
  const [rows,setRows] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')

  useEffect(()=>{
    setLoading(true); setError('')
    const gid = usePast ? PAST_GID : CURRENT_GID
    const url = buildCsvUrl(gid)
    Papa.parse(url, {
      download:true,
      dynamicTyping:false,
      skipEmptyLines:true,
      complete: (res)=>{
        try{
          const data = res.data || []
          if(!data.length) throw new Error('Empty sheet data')
          const headers = data[0]
          const body = data.slice(1)
          let clean = tidyRows(body, headers)
          if(clean.length===0) throw new Error('No leaderboard rows parsed')
          setRows(clean)
        }catch(e){
          setError(e.message)
          // fallback demo to avoid blank UI
          const headers = DEMO[0]
          const body = DEMO.slice(1)
          setRows(tidyRows(body, headers))
        }finally{
          setLoading(false)
        }
      },
      error: (err)=>{
        setError(String(err))
        const headers = DEMO[0]
        const body = DEMO.slice(1)
        setRows(tidyRows(body, headers))
        setLoading(false)
      }
    })
  },[usePast])

  const top3 = useMemo(()=>rows.slice(0,3),[rows])
  const rest = useMemo(()=>rows.slice(3),[rows])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight">Leaderboard</h2>
        <div className="flex gap-2">
          <Toggle active={!usePast} onClick={()=>setUsePast(false)}>Current</Toggle>
          <Toggle active={usePast} onClick={()=>setUsePast(true)}>Past Month</Toggle>
          <button onClick={onBack} className="ml-2 px-3 py-2 rounded-lg glass text-sm">Back</button>
        </div>
      </div>

      <StatusBar loading={loading} error={error} usePast={usePast}/>

      <Podium top3={top3} loading={loading} />

      <div className="mt-6 card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <Th>#</Th><Th>User</Th><Th className="text-right pr-4">Wagered</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({length:7}).map((_,i)=>(
              <tr key={i} className="border-t border-white/5">
                <Td><Shimmer /></Td>
                <Td><div className="h-4 w-40 shine"></div></Td>
                <Td className="text-right pr-4"><div className="h-4 w-24 ml-auto shine"></div></Td>
              </tr>
            )) : rest.map((r)=> (
              <tr key={r.rank} className="border-t border-white/5 hover:bg-white/5 transition">
                <Td>{r.rank}</Td>
                <Td className="font-medium">{r.userMasked}</Td>
                <Td className="text-right pr-4">{formatMoney(r.wager)}</Td>
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
    <button {...props} className={`px-3 py-1.5 rounded-lg text-sm ${active?'bg-white/15':'glass hover:bg-white/10'}`}>{children}</button>
  )
}
function Th({children,className=''}){ return <th className={`text-left text-white/70 text-xs uppercase tracking-wider py-3 px-4 ${className}`}>{children}</th> }
function Td({children,className=''}){ return <td className={`py-3 px-4 ${className}`}>{children}</td> }
function Shimmer(){ return <div className="h-4 w-6 shine"></div> }

function StatusBar({loading,error,usePast}){
  return (
    <div className="mb-6 flex items-center gap-3 text-sm">
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${loading?'bg-yellow-500/20 text-yellow-300': error? 'bg-red-500/20 text-red-300':'bg-emerald-500/20 text-emerald-300'}`}>
        <span className="h-2 w-2 rounded-full" style={{backgroundColor: loading? '#fbbf24' : error? '#f87171' : '#34d399'}}></span>
        {loading? 'Loading from Google Sheet...' : error? 'Loaded demo (sheet parse issue)' : (usePast? 'Past month data' : 'Current month data')}
      </span>
    </div>
  )
}
