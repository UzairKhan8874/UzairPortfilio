import Endpoint from './Endpoint'
import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head"><Endpoint verb="GET" path="/skills" /><h2>The <em>toolkit.</em></h2></div>
        <div>
          {skills.map((g) => (
            <div className="sk" key={g.group}>
              <span className="mono">{g.group}</span>
              <div className="words">{g.items.map((i) => <span key={i}>{i}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}