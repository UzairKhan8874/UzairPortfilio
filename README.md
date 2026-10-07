# Mohammad Uzair - Portfolio (Vite + React + TypeScript)

## Run
```
npm install
npm run dev
```
Open http://localhost:5173

## Build
```
npm run build      # output in dist/
npm run preview
```

## Structure
- `src/data/content.ts`  all text, projects, skills, contact (edit here; add LinkedIn/GitHub/LeetCode URLs in `profile.links`)
- `src/components/`      one file per section
- `src/lib/frameEngine.ts`  scroll-driven 360 frame engine (canvas)
- `src/lib/scroll.ts`    Lenis + GSAP ScrollTrigger setup
- `src/styles/global.css` design tokens and styles
- `public/uzair.jpg`     hero portrait (still fallback)
- `public/frames/`       360 frames go here

## 360 hero
The hero shows your photo until frames exist. To enable rotation, make a turntable video
(one full 360 loop ending where it starts), put it in this folder as `turntable.mp4`, then:
```
bash tools/make_frames.sh turntable.mp4 120
```
Needs ffmpeg. It writes `public/frames/*.webp` + `manifest.json`. Reload and scroll.

## Notes
- Contact form copies the message (no backend). Hook up Formspree or your API in `Contact.tsx`.
- Styling is plain CSS (not Tailwind).

## Concept
The site is presented as an API: Spring Boot startup log as loader, a request travelling through
JwtAuthFilter -> Controller -> Service -> Repository -> MySQL -> 200 OK while you scroll the hero,
every section is an endpoint, and the contact form shows a live POST request preview.
Pipeline stages and JSON lines are in `src/components/Hero.tsx`.
