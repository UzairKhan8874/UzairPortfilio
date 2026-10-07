import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const d = dot.current!, r = ring.current!
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0
    const on = { v: false }
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY
      d.style.transform = `translate(${x}px,${y}px)`
      const target = e.target as HTMLElement
      const t = target.closest?.('[data-cursor],a,button,input,select,textarea,.sk .words span')
      const lab = t?.closest('[data-cursor]') as HTMLElement | null | undefined
      on.v = !!t
      r.classList.toggle('on', on.v)
      r.classList.toggle('lbl', !!lab)
      r.textContent = lab ? lab.dataset.cursor ?? '' : ''
    }
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18
      r.style.transform = `translate(${rx}px,${ry}px) scale(${on.v ? 1 : 0.3})`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (<><div id="cur" ref={dot} /><div id="cur2" ref={ring} /></>)
}
