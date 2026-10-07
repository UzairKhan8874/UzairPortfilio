import { marquee } from '../data/content'

export default function Marquee() {
  const items = [...marquee, ...marquee, ...marquee, ...marquee]
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {items.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}
