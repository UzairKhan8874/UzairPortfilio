import Endpoint from './Endpoint'
import { ledger } from '../data/content'

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="sec-head"><Endpoint verb="GET" path="/about" /><h2>More than <em>endpoints.</em></h2></div>
        <div className="about-grid">
          <p className="lead">
            I write Java backends the way they should be read later: controller, service, repository, each doing one job.
            Authentication, validation and error handling are part of the first version, <em>not a cleanup task.</em>
          </p>
          <div className="col">
            <p>My projects are Spring Boot REST APIs with Spring Security and JWT, JPA/Hibernate on MySQL, global exception handling and Swagger documentation. I test every endpoint in Postman before calling it done.</p>
            <p>I am finishing a BCA at Savitribai Phule Pune University and solve DSA problems on LeetCode to keep my fundamentals sharp.</p>
          </div>
        </div>
        <div className="ledger">
          {ledger.map((l) => (
            <div key={l.label}>
              <b>{l.value}{l.sup && <sup>{l.sup}</sup>}</b>
              <span className="mono">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}