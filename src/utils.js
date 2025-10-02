export function maskUsername(name=''){
  if(!name) return ''
  const s = String(name).trim()
  if(s.length<=4) return s
  return s.slice(0,2)+'***'+s.slice(-2)
}

export function parseCurrencyLike(v){
  if(v==null) return 0
  const s=String(v).replace(/[$,]/g,'').trim()
  const n=parseFloat(s)
  return isNaN(n)?0:n
}

export function deriveColumns(headers){
  // try to infer username and wager columns by keywords
  const lower=headers.map(h=>String(h||'').toLowerCase())
  let userIdx = lower.findIndex(h=>/(user|name|player|account)/.test(h))
  if(userIdx===-1) userIdx=0
  let wagerIdx = lower.findIndex(h=>/(wager|total|amount|volume)/.test(h))
  if(wagerIdx===-1) wagerIdx=1
  return {userIdx,wagerIdx}
}

export function tidyRows(rows, headers){
  const {userIdx,wagerIdx} = deriveColumns(headers)
  const out=[]
  for(const r of rows){
    if(!r || r.length===0) continue
    const user = String(r[userIdx]||'').trim()
    const wagerRaw = r[wagerIdx]
    const wager = parseCurrencyLike(wagerRaw)
    if(!user) continue
    out.push({user, wager})
  }
  // sort desc by wager
  out.sort((a,b)=>b.wager-a.wager)
  return out.map((r,i)=>({rank:i+1, userMasked:maskUsername(r.user), ...r}))
}

export function formatMoney(n){
  return n.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0})
}
