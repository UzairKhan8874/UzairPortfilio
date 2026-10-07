import Endpoint from './Endpoint'
import { why } from '../data/content'

export default function Why() {
  return (
    <section>
      <div className="wrap">
        <div className="sec-head"><Endpoint verb="GET" path="/why-me" /></div>
        <div className="why">
          {why.map((w) => <p key={w.t}>{w.t}<small>{w.s}</small></p>)}
        </div>
      </div>
    </section>
  )
}