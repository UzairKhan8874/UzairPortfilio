import { useEffect, useRef, useState } from 'react'

const LOG: [number, string][] = [
  [0.0, 'Starting PortfolioApplication using Java 21'],
  [0.15, 'Tomcat initialized with port 8080 (http)'],
  [0.35, 'Mapped GET /api/developers/uzair to HeroController'],
  [0.6, 'Loading hero assets'],
  [0.85, 'HikariPool-1 - Start completed'],
  [0.98, 'Started PortfolioApplication in 1.8 seconds'],
]

export default function Loader({ progress, done }: { progress: number; done: boolean }) {
  const target = useRef(progress)
  target.current = progress
  const [disp, setDisp] = useState(0)

  useEffect(() => {
    let raf = 0
    let v = 0
    const loop = () => {
      v = Math.min(target.current, v + Math.max(0.004, (target.current - v) * 0.05))
      setDisp(v)
      if (v < 1) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div id="loader" className={done ? 'done' : ''} role="status" aria-live="polite">
      <div className="ld">
        <b>UZAIR</b>
        <div className="mono" style={{ color: 'var(--sand)' }}>:: Portfolio :: (v2026)</div>
        <div className="boot">
          {LOG.map(([at, text]) => (
            <div key={text} className={disp >= at ? 'on' : ''}><b>INFO</b>{text}</div>
          ))}
        </div>
        <div className="ld-bar"><i style={{ transform: `scaleX(${disp})` }} /></div>
        <div className="ld-row mono">
          <span>Loading experience...</span>
          <span>{Math.round(disp * 100)}%</span>
        </div>
      </div>
    </div>
  )
}