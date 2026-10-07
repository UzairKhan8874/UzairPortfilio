import { useState } from 'react'
import { profile, projectTypes } from '../data/content'
import { copyText } from '../lib/clipboard'
import Endpoint from './Endpoint'

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false)
  return (
    <button className="copy" type="button" onClick={() => copyText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 1500) })}>
      {done ? 'Copied' : 'Copy'}
    </button>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: projectTypes[0], message: '' })
  const [status, setStatus] = useState('')
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value })

  const body = JSON.stringify(form, null, 2)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('Please fill in your name, email and message.')
      return
    }
    const txt = `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\n\n${form.message}`
    copyText(txt).then(() => setStatus(`Your message is copied. Paste it into an email to ${profile.email}.`))
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-head"><Endpoint verb="POST" path="/contact" status="draft" /><h2>Have an idea? <em>Let's build it.</em></h2></div>
        <div className="contact-grid">
          <div className="ct">
            <p className="lead">Looking for a Java backend developer, or a secure API for your product? Send a few lines and I will reply.</p>
            <div className="ct-list">
              <div><span className="mono">Email</span><span className="v">{profile.email}</span><CopyBtn text={profile.email} /></div>
              <div><span className="mono">Phone</span><span className="v">{profile.phone}</span><CopyBtn text={profile.phone} /></div>
              <div><span className="mono">Based in</span><span>{profile.location}</span><span /></div>
              {Object.entries(profile.links).filter(([, u]) => u).map(([k, u]) => (
                <div key={k}><span className="mono">{k}</span><a className="v" href={u} target="_blank" rel="noreferrer">{u}</a><span /></div>
              ))}
            </div>
            <pre className="req" aria-label="Request preview">{`POST /api/contact HTTP/1.1\nContent-Type: application/json\n\n${body}`}</pre>
          </div>
          <form onSubmit={submit} noValidate>
            <label htmlFor="f-name"><span className="mono">Name</span><input id="f-name" value={form.name} onChange={set('name')} autoComplete="name" required /></label>
            <label htmlFor="f-email"><span className="mono">Email</span><input id="f-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" required /></label>
            <label htmlFor="f-type"><span className="mono">Project type</span>
              <select id="f-type" value={form.type} onChange={set('type')}>{projectTypes.map((t) => <option key={t}>{t}</option>)}</select>
            </label>
            <label htmlFor="f-msg"><span className="mono">Message</span><textarea id="f-msg" value={form.message} onChange={set('message')} required /></label>
            <div><button className="cta fill" type="submit">Let's Build</button></div>
            <p id="status" aria-live="polite">{status}</p>
          </form>
        </div>
      </div>
    </section>
  )
}