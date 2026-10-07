import Endpoint from './Endpoint'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '../data/content'

function ProjectRow({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="proj" data-cursor="VIEW">
      <div>
        <div className="meta mono">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <h3>{p.title}</h3>
        <p className="sum">{p.summary}</p>
        <p className="stack">{p.stack}</p>
        <button className="more" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? 'Hide Project' : 'View Project'} <ArrowUpRight size={16} strokeWidth={1.5} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="dl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
              onAnimationComplete={() => ScrollTrigger.refresh()}
            >
              <ul className="dl-in">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="tree" aria-hidden="true">
        <b>{p.tree.root}</b>
        {p.tree.rows.map((r, i) => (
          <div key={r.label}>
            {i === p.tree.rows.length - 1 ? '└ ' : '├ '}
            {r.hot ? <span className="ok">{r.label}</span> : r.label}
            {r.hint && <span className="dim"> · {r.hint}</span>}
          </div>
        ))}
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head"><Endpoint verb="GET" path="/projects" /><h2>Three APIs, <em>built properly.</em></h2></div>
        {projects.map((p) => <ProjectRow key={p.title} p={p} />)}
      </div>
    </section>
  )
}