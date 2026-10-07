// Scroll-driven turntable. Frames live in public/frames (f_0001.webp ...) described by
// public/frames/manifest.json. Without them the portrait is drawn as a still image.
// Progress 0..1 maps to frame index; progress 1 wraps to frame 0, so the last view
// equals the first.

const base = import.meta.env.BASE_URL

function loadImg(src: string): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    const im = new Image()
    im.decoding = 'async'
    im.onload = () => res(im)
    im.onerror = () => res(null)
    im.src = src
  })
}

class FrameEngine {
  private still = new Image()
  private frames: (HTMLImageElement | null)[] = []
  private count = 0
  private last = -1
  private p = 0
  private canvas: HTMLCanvasElement | null = null
  private promise: Promise<void> | null = null

  attach(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas
    this.last = -1
    this.draw(this.p)
  }

  private paint(img: HTMLImageElement) {
    const c = this.canvas
    if (!c || !img.naturalWidth) return
    if (c.width !== img.naturalWidth || c.height !== img.naturalHeight) {
      c.width = img.naturalWidth
      c.height = img.naturalHeight
    }
    c.getContext('2d')?.drawImage(img, 0, 0, c.width, c.height)
  }

  draw(p: number) {
    this.p = p
    if (!this.canvas || !this.still.naturalWidth) return
    if (!this.count) {
      if (this.last !== -2) { this.paint(this.still); this.last = -2 }
      return
    }
    const i = Math.round(p * this.count) % this.count
    if (i === this.last) return
    this.last = i
    let k = i
    while (k > 0 && !this.frames[k]) k--
    this.paint(this.frames[k] ?? this.still)
  }

  load(onProgress: (v: number) => void): Promise<void> {
    if (!this.promise) this.promise = this.run(onProgress)
    return this.promise
  }

  private async run(onProgress: (v: number) => void) {
    this.still.src = base + 'uzair.jpg'
    await new Promise<void>((r) => { this.still.onload = () => r(); this.still.onerror = () => r() })
    this.last = -1
    this.draw(this.p)
    onProgress(0.25)

    let manifest: { count: number; ext?: string } | null = null
    try {
      const r = await fetch(base + 'frames/manifest.json')
      if (r.ok) manifest = await r.json()
    } catch { /* no frames yet: still image is used */ }

    if (!manifest || !(manifest.count > 1)) return

    const n = manifest.count
    const ext = manifest.ext || 'webp'
    this.frames = new Array(n).fill(null)
    const gate = Math.min(n, 24)
    let done = 0
    const load = async (i: number) => {
      this.frames[i] = await loadImg(`${base}frames/f_${String(i + 1).padStart(4, '0')}.${ext}`)
      done++
      if (done <= gate) onProgress(0.25 + 0.75 * (done / gate))
    }
    await Promise.all(Array.from({ length: gate }, (_, i) => load(i)))
    this.count = n
    this.last = -1
    this.draw(this.p)
    // the rest streams in the background
    ;(async () => { for (let i = gate; i < n; i++) await load(i) })()
  }
}

export const engine = new FrameEngine()
