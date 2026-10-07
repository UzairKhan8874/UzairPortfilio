import Endpoint from './Endpoint'
import { services } from '../data/content'

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head"><Endpoint verb="GET" path="/services" /><h2>Let's build something <em>worth shipping.</em></h2></div>
        <div className="svc">
          {services.map((s) => (
            <article key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="mono">{s.tech}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}