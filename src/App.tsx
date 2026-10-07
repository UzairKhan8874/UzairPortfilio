import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, destroyLenis, prefersReducedMotion } from './lib/scroll'
import { engine } from './lib/frameEngine'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Skills from './components/Skills'
import Services from './components/Services'
import Why from './components/Why'
import Highlights from './components/Highlights'
import Contact from './components/Contact'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

const REVEAL =
  '.proj,.sk,.svc article,.why p,.ach li,.ledger div,.sec-head,.lead,.about-grid .col,.ct-list,form,.final h2'

export default function App() {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initLenis()
    let cancelled = false
    const start = performance.now()
    let t2: number | undefined
    const guard = window.setTimeout(() => setReady(true), 6000)
    engine.load(setProgress).then(() => {
      if (cancelled) return
      setProgress(1)
      t2 = window.setTimeout(() => setReady(true), Math.max(350, 2000 - (performance.now() - start)))
    })
    return () => {
      cancelled = true
      clearTimeout(guard)
      clearTimeout(t2)
      destroyLenis()
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(REVEAL).forEach((el) => {
        gsap.from(el, {
          y: 36, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('.proj h3').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(0 0 100% 0)', y: 50, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }, clearProps: 'clipPath',
        })
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (ready) ScrollTrigger.refresh()
  }, [ready])

  return (
    <>
      <Loader progress={progress} done={ready} />
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <About />
        <Marquee />
        <Work />
        <Skills />
        <Services />
        <Why />
        <Highlights />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}