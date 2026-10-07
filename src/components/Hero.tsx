import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { engine } from '../lib/frameEngine'
import { goTo, prefersReducedMotion } from '../lib/scroll'
import { profile } from '../data/content'

const SPAN_VH = 6
const STAGES = ['Request', 'JwtAuthFilter', 'Controller', 'Service', 'Repository', 'MySQL', '200 OK']

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const bar = useRef<HTMLElement>(null)
  const pct = useRef<HTMLSpanElement>(null)
  const cue = useRef<HTMLDivElement>(null)
  const scan = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    engine.attach(canvas.current)
    const el = root.current!
    const items = Array.from(el.querySelectorAll<HTMLElement>('.pipe .it'))
    const lines = Array.from(el.querySelectorAll<HTMLElement>('.resp .ln'))

    const paint = (p: number) => {
      const idx = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length))
      items.forEach((it, i) => {
        it.classList.toggle('done', i < idx)
        it.classList.toggle('active', i === idx)
      })
      lines.forEach((l) => l.classList.toggle('on', p >= parseFloat(l.dataset.at || '0') - 0.0001))
      el.dataset.phase = p > 0.5 ? 'b' : 'a'
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      if (pct.current) pct.current.textContent = String(Math.round(p * 100)).padStart(3, '0') + '%'
      if (scan.current) scan.current.style.top = `${p * 100}%`
    }

    if (prefersReducedMotion()) { paint(1); return }
    paint(0)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${SPAN_VH * 100}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (s) => {
          engine.draw(s.progress)
          paint(s.progress)
          if (cue.current) cue.current.style.opacity = s.progress > 0.02 ? '0' : '1'
        },
      })
    }, root)
    return () => { ctx.revert(); engine.attach(null) }
  }, [])

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('#hero h1', { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out' })
      gsap.from('.resp, .h-top, .kick, .h-cta', { y: 20, opacity: 0, duration: 0.9, stagger: 0.12, delay: 0.3, ease: 'power3.out' })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="hero" ref={root} data-phase="a" aria-label="Introduction">
      <div className="stage">
        <div className="cvw">
          <canvas ref={canvas} id="cv" width={900} height={1600} role="img" aria-label={`Portrait of ${profile.name}`} data-cursor="EXPLORE" />
          <span className="scan" ref={scan} aria-hidden="true" />
        </div>
      </div>

      <div className="h-top mono">{profile.name} &nbsp;/&nbsp; {profile.location}</div>
      <div className="prog mono"><span ref={pct}>000%</span><i><b ref={bar} /></i></div>

      <div className="h-left">
        <div className="kick"><span>JAVA DEVELOPER</span><span>SPRING BOOT SYSTEMS</span></div>
        <h1>Backends that are <em>built</em> to hold up.</h1>
        <p className="h-mobsub">Java developer working with Spring Boot, JWT security and MySQL.</p>
        <div className="h-cta">
          <a className="cta fill" href="#work" onClick={(e) => { e.preventDefault(); goTo('work') }}>View My Work</a>
          <a className="cta" href="#contact" onClick={(e) => { e.preventDefault(); goTo('contact') }}>Let's Work Together</a>
        </div>
      </div>

      <div className="resp" aria-label="Profile response">
        <div className="ln" data-at="0"><span className="m">GET</span> /api/developers/uzair</div>
        <div className="ln" data-at="0.143"><span className="d">Authorization:</span> Bearer ••••••••</div>
        <div className="ln gap" data-at="0.286">{'{'}</div>
        <div className="ln in" data-at="0.286"><span className="k">"name"</span>: <span className="s">"Mohammad Uzair"</span>,</div>
        <div className="ln in" data-at="0.429"><span className="k">"role"</span>: <span className="s">"Java Developer"</span>,</div>
        <div className="ln in" data-at="0.571"><span className="k">"stack"</span>: [<span className="s">"Spring Boot"</span>, <span className="s">"JWT"</span>, <span className="s">"MySQL"</span>],</div>
        <div className="ln in" data-at="0.714"><span className="k">"education"</span>: <span className="s">"BCA · 8.1 CGPA"</span>,</div>
        <div className="ln in" data-at="0.714"><span className="k">"location"</span>: <span className="s">"Mumbai"</span></div>
        <div className="ln" data-at="0.857">{'}'}</div>
        <div className="ln st" data-at="0.857">HTTP/1.1 <span className="ok">200 OK</span></div>
      </div>

      <ol className="pipe" aria-label="Request pipeline">
        {STAGES.map((s) => <li key={s} className="it">{s}</li>)}
      </ol>

      <div className="scrollcue mono" ref={cue}>
        <span>Scroll to explore</span>
        <ArrowDown size={16} strokeWidth={1} />
      </div>
    </section>
  )
}