import { useEffect, useRef, useState } from 'react'
export default function useCountUp(target=0, duration=900){
  const [val,setVal] = useState(0)
  const ref = useRef()
  useEffect(()=>{
    const start = performance.now()
    const tick = (now)=>{
      const t = Math.min(1,(now-start)/duration)
      const eased = 1 - Math.pow(1-t,3)
      setVal(target*eased)
      if(t<1) ref.current = requestAnimationFrame(tick)
    }
    ref.current = requestAnimationFrame(tick)
    return ()=> cancelAnimationFrame(ref.current)
  },[target,duration])
  return Math.round(val)
}
