import { goTo } from '../lib/scroll'

export default function FinalCta() {
  return (
    <section className="final">
      <div className="wrap">
        <h2>Your next API could be <em>built like this.</em></h2>
        <p>Let's make it happen.</p>
        <a className="cta fill" href="#contact" onClick={(e) => { e.preventDefault(); goTo('contact') }}>Start a Project &rarr;</a>
      </div>
    </section>
  )
}
