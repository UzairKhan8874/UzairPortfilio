import Endpoint from './Endpoint'
import { highlights } from '../data/content'

export default function Highlights() {
  return (
    <section>
      <div className="wrap">
        <div className="sec-head"><Endpoint verb="GET" path="/highlights" /><h2>On <em>record.</em></h2></div>
        <ul className="ach">
          {highlights.map((h) => <li key={h.t}><span>{h.t}</span><em>{h.s}</em></li>)}
        </ul>
      </div>
    </section>
  )
}
