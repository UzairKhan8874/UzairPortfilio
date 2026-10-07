import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'
import { goTo, goTop, startScroll, stopScroll } from '../lib/scroll'

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    open ? stopScroll() : startScroll()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // wait a tick so the menu unlocks scrolling first
    setTimeout(() => goTo(id), 30)
  }

  return (
    <>
      <nav className={'top' + (solid ? ' solid' : '')} aria-label="Primary">
        <a href="#hero" className="logo" aria-label="Uzair, home" onClick={(e) => { e.preventDefault(); goTop() }}>UZAIR</a>
        <div className="links">
          {navLinks.map((l) => (
            <a key={l.id} className="l" href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>
          ))}
          <a className="cta" href="#contact" onClick={go('contact')}>Let's Work Together</a>
        </div>
        <button className="burger" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen(!open)}>
          <i /><i />
        </button>
      </nav>
      <div id="menu" className={open ? 'open' : ''} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((l) => (
            <a key={l.id} className="m" href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>
          ))}
        </nav>
        <a className="cta fill" href="#contact" onClick={go('contact')} style={{ alignSelf: 'flex-start' }}>Let's Work Together</a>
      </div>
    </>
  )
}
