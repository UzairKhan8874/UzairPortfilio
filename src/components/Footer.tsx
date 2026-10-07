import { goTop } from '../lib/scroll'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <a className="logo" href="#hero" onClick={(e) => { e.preventDefault(); goTop() }}>UZAIR</a>
        <span className="mono">Built with curiosity + code</span>
        <span className="mono r">&copy; 2026</span>
      </div>
    </footer>
  )
}
