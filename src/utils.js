export async function fetchSheet(gid){
  // Try JSON endpoint first (more structured)
  try{
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?gid=${gid}&tqx=out:json&_=${Date.now()}`
    const txt = await (await fetch(url)).text()
    const json = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}')+1))
    const cols = json.table.cols.map(c=>c.label || '')
    const rows = json.table.rows.map(r=> (r.c || []).map(c=> c ? c.v : ''))
    return {headers: cols, rows}
  }catch(e){
    // Fallback to CSV
    try{
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}&_=${Date.now()}`
      const csv = await (await fetch(url)).text()
      const lines = csv.split(/\r?\n/).filter(Boolean)
      const headers = lines.shift().split(',')
      const rows = lines.map(l => splitCSV(l))
      return {headers, rows}
    }catch(e2){
      throw new Error('Failed to fetch sheet.')
    }
  }
}

// naive CSV splitter that respects quotes
function splitCSV(line){
  const out=[]; let cur=''; let q=false
  for(let i=0;i<line.length;i++){
    const ch=line[i]
    if(ch==='\"'){ q=!q; continue }
    if(ch===',' && !q){ out.push(cur); cur=''; continue }
    cur+=ch
  }
  out.push(cur)
  return out.map(s=>s.replace(/^\"|\"$/g,'').replace(/\"\"/g,'\"'))
}

export function maskUsername(name=''){
  const s=String(name||'').trim()
  if(!s) return ''
  if(s.length<=4) return s
  return s.slice(0,2)+'***'+s.slice(-2)
}

export function toNumber(v){
  if(v==null) return NaN
  const s=String(v).replace(/[$,\s]/g,'')
  const n=parseFloat(s)
  return Number.isFinite(n) ? n : NaN
}

function scoreHeaderForUser(h){ return /(user|name|player|account)/i.test(h) && !/(code|ref|promo)/i.test(h) }
function scoreHeaderForWager(h){ return /(wager|total|amount|volume|usd|bet)/i.test(h) }

export function inferColumns(headers, rows){
  let userIdx = -1, wagerIdx = -1
  // exacts
  const lower = headers.map(h=>String(h||'').toLowerCase())
  userIdx = lower.findIndex(h=>['username','user','name'].includes(h))
  wagerIdx = lower.findIndex(h=>['wagered','wager','total'].includes(h))
  // heuristic if needed
  if(userIdx===-1){
    userIdx = headers.findIndex(scoreHeaderForUser)
  }
  if(wagerIdx===-1){
    let best=-1, bestScore=-1
    for(let i=0;i<headers.length;i++){
      let nums=0
      for(const r of rows){
        const n = toNumber(r[i])
        if(Number.isFinite(n)) nums++
      }
      const headerBonus = scoreHeaderForWager(headers[i]) ? 5 : 0
      const score = nums + headerBonus
      if(score>bestScore){ bestScore=score; best=i }
    }
    wagerIdx = best>=0? best : 1
  }
  if(userIdx===-1) userIdx=0
  return {userIdx, wagerIdx}
}

export function normalizeRows(headers, rows){
  const {userIdx, wagerIdx} = inferColumns(headers, rows)
  const out=[]
  for(const r of rows){
    const user = (r[userIdx]||'').toString().trim()
    const wager = toNumber(r[wagerIdx])
    if(!user) continue
    if(/^(supper|supper10|suppercap)$/i.test(user)) continue
    if(!Number.isFinite(wager)) continue
    out.push({user, wager})
  }
  out.sort((a,b)=>b.wager-a.wager)
  return out.map((r,i)=>({rank:i+1, userMasked:maskUsername(r.user), ...r}))
}
