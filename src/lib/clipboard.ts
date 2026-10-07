export function copyText(text: string): Promise<void> {
  const fallback = () => {
    const t = document.createElement('textarea')
    t.value = text
    document.body.appendChild(t)
    t.select()
    try { document.execCommand('copy') } catch { /* ignore */ }
    t.remove()
  }
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(fallback)
  }
  fallback()
  return Promise.resolve()
}
