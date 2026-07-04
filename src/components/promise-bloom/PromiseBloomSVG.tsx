// src/components/promise-bloom/PromiseBloomSVG.tsx
import { SculptedPetal } from "./SculptedPetal";

// ─────────────────────────────────────────────────────────────
// PETAL PATHS — redrawn from reference analysis
// Key insight: all petals share same DNA — wide mid-body,
// pointed tip, teardrop-ish. Only rotation + scale varies.
// ─────────────────────────────────────────────────────────────

// OUTER petal: wide, roundish body, moderate point
// These spread at ~55-65° and create the broad base of the bloom


const outerBody = `
  M0 92
  C-42 76 -52 28 -44 -28
  C-36 -82 -18 -130 0 -144
  C18 -130 36 -82 44 -28
  C52 28 42 76 0 92
  Z
`;
const outerShadow = `
  M0 92
  C-40 74 -50 26 -42 -24
  C-34 -78 -16 -124 0 -136
  C16 -124 34 -78 42 -24
  C50 26 40 74 0 92
  Z
`;
const outerSheen = `
  M0 90
  C-36 72 -44 24 -38 -18
  C-30 -70 -14 -112 0 -122
  C14 -112 30 -70 38 -18
  C44 24 36 72 0 90
  Z
`;

// MID petal: slightly narrower, taller, more upright 20-45°
const midBody = `
  M0 90
  C-32 74 -38 22 -30 -42
  C-22 -96 -10 -148 0 -162
  C10 -148 22 -96 30 -42
  C38 22 32 74 0 90
  Z
`;
const midShadow = `
  M0 90
  C-30 72 -36 20 -28 -38
  C-20 -90 -9 -140 0 -152
  C9 -140 20 -90 28 -38
  C36 20 30 72 0 90
  Z
`;
const midSheen = `
  M0 88
  C-28 70 -32 18 -24 -34
  C-16 -84 -7 -128 0 -138
  C7 -128 16 -84 24 -34
  C32 18 28 70 0 88
  Z
`;

// INNER petal: narrower, tall, nearly upright 0-18°
// These cup around the center
const innerBody = `
  M0 88
  C-22 72 -26 20 -20 -52
  C-14 -112 -6 -168 0 -182
  C6 -168 14 -112 20 -52
  C26 20 22 72 0 88
  Z
`;
const innerShadow = `
  M0 88
  C-20 70 -24 18 -18 -48
  C-12 -106 -5 -160 0 -172
  C5 -160 12 -106 18 -48
  C24 18 20 70 0 88
  Z
`;
const innerSheen = `
  M0 86
  C-18 68 -20 16 -16 -42
  C-10 -96 -4 -146 0 -156
  C4 -146 10 -96 16 -42
  C20 16 18 68 0 86
  Z
`;

const lotusBody = `M0 90 C-55 70 -65 20 -55 -40 C-48 -100 -25 -145 0 -165 C25 -145 48 -100 55 -40 C65 20 55 70 0 90 Z`;
const lotusShadow = `M0 90 C-50 68 -58 22 -50 -34 C-42 -92 -22 -136 0 -154 C22 -136 42 -92 50 -34 C58 22 50 68 0 90 Z`;
const lotusSheen = `M0 90 C-48 68 -56 20 -48 -30 C-40 -88 -20 -126 0 -142 C20 -126 40 -88 48 -30 C56 20 48 68 0 90 Z`;

type PromiseBloomSVGProps = {
  className?: string;
};



export function PromiseBloomSVG({ className }: PromiseBloomSVGProps) {
  return (
    <svg
      className={className}
      width="500"
      height="700"
      viewBox="0 -380 500 1200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        {/* ── Stem & foliage ── */}
        <linearGradient id="pb-stem" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8dffc0" />
          <stop offset="45%" stopColor="#3a9e58" />
          <stop offset="100%" stopColor="#163d22" />
        </linearGradient>
        <linearGradient id="pb-leaf-top" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#d4ffe8" />
          <stop offset="55%" stopColor="#5fbf78" />
          <stop offset="100%" stopColor="#1f5a32" />
        </linearGradient>
        <linearGradient id="pb-leaf-under" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a7040" />
          <stop offset="100%" stopColor="#0f2818" />
        </linearGradient>

        {/* ── Petal fill — hot magenta, semi-transparent ── */}
        <linearGradient id="pb-petal-body" x1="48%" y1="0%" x2="52%" y2="100%">
          <stop offset="0%" stopColor="#ffb0e0" stopOpacity="0.85" />
          <stop offset="30%" stopColor="#f040a0" stopOpacity="0.78" />
          <stop offset="65%" stopColor="#cc1878" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#8a0850" stopOpacity="0.65" />
        </linearGradient>

        {/* Rear petals — slightly more purple/darker */}
        <linearGradient id="pb-petal-rear" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e890d0" stopOpacity="0.72" />
          <stop offset="50%" stopColor="#b82888" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#7a0848" stopOpacity="0.58" />
        </linearGradient>

        {/* Sheen — white gloss hit near tip */}
        <linearGradient id="pb-petal-sheen" x1="25%" y1="0%" x2="75%" y2="85%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#ffe8f8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff9fd0" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="pb-petal-edge" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffccee" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff88cc" stopOpacity="0.1" />
        </linearGradient>

        {/* Calyx */}
        <linearGradient id="pb-calyx" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8ffd4" />
          <stop offset="100%" stopColor="#1a5530" />
        </linearGradient>
        <linearGradient id="pb-calyx-shadow" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#6ecf92" />
          <stop offset="100%" stopColor="#0d3018" />
        </linearGradient>

        {/* Golden center */}
        <radialGradient id="pb-inner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="18%"  stopColor="#fffde0" />
          <stop offset="45%"  stopColor="#ffd040" />
          <stop offset="72%"  stopColor="#ff8aaa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e8449a" stopOpacity="0" />
        </radialGradient>

        {/* Big aura */}
        <radialGradient id="pb-aura-back" cx="50%" cy="42%" r="55%">
          <stop offset="0%"   stopColor="#ff44c0" stopOpacity="0.6" />
          <stop offset="55%"  stopColor="#cc20a0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7a1860" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pb-aura-front" cx="50%" cy="40%" r="45%">
          <stop offset="0%"   stopColor="#fff4fa" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ff9fd0" stopOpacity="0" />
        </radialGradient>

        {/* ── FILTERS ── */}
        <filter id="pb-stem-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 0 0 0.3  0 0 0 0 1  0 0 0 0 0.55  0 0 0 0.5 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Main petal glow — soft outer bloom */}
        <filter id="pb-petal-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="1.4 0 0 0 0.85   0 0.05 0 0 0.0   0 0 0.4 0 0.3   0 0 0 0.9 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* THE NEON RIM — this is the magic sauce from the reference */}
        {/* Applied to a stroke-only path drawn on top of each petal */}
        <filter id="pb-neon-rim" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="2.0 0 0 0 1.0   0 0.05 0 0 0.0   0 0 0.8 0 0.6   0 0 0 1.5 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        <filter id="pb-center-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="1 0 0 0 1   0.9 0 0 0 0.85   0 0 0 0 0.05   0 0 0 1 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Add this inside your <defs> block */}
<filter id="pb-violet-neon" x="-40%" y="-40%" width="180%" height="180%">
  <feGaussianBlur stdDeviation="3.5" result="blur" />
  <feFlood floodColor="#bf5fff" floodOpacity="0.9" result="color" />
  <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
  <feMerge>
    <feMergeNode in="coloredBlur" />
    <feMergeNode in="coloredBlur" /> {/* doubled for intensity */}
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>

      </defs>

      {/* STEM */}
      <g id="stem">
   {/*  <path d="M250 686 C246 618 252 558 244 498 C236 438 242 378 248 318 C254 248 250 188 244 118 C242 92 246 66 253 40" fill="none" stroke="#62ff9e" strokeWidth="30" opacity="0.05" strokeLinecap="round" filter="url(#pb-stem-glow)" />  */}
        <path id="stem-shadow" d="M250 686 C246 618 252 558 244 498 C236 438 242 378 248 318 C254 248 250 188 244 118 C242 92 246 66 253 40"
          fill="none" stroke="#14301c" strokeWidth="14" opacity="0.35" strokeLinecap="round" />
        <path id="stem-main" className="stem"
          d="M250 686 C246 618 252 558 244 498 C236 438 242 378 248 318 C254 248 250 188 244 118 C242 92 246 66 253 40"
          fill="none" stroke="url(#pb-stem)" strokeWidth="10.5" strokeLinecap="round" />
        <path id="stem-highlight" d="M247 684 C243 616 249 556 241 496 C233 436 239 376 245 316 C251 246 247 186 241 116 C239 90 243 64 250 38"
          fill="none" stroke="#d8ffe9" strokeWidth="2.4" strokeOpacity="0.48" strokeLinecap="round" />
        <ellipse cx="250" cy="687" rx="17" ry="5.5" fill="#0a1a10" opacity="0.38" />
        <ellipse cx="250" cy="686" rx="10" ry="4.2" fill="#1c4028" opacity="0.62" />
      </g>

      {/* LEAVES */}
      <g id="leaves">
        <g transform="translate(95,88) scale(0.48) rotate(-30 250 320)">
        <g id="leaf-left-top">
          <path d="M250 418 C248 408 249 398 252 392 C258 382 264 388 268 398" fill="url(#pb-leaf-under)" opacity="0.85" />
          <path d="M250 420 C232 392 216 352 208 308 C198 258 204 208 224 168 C234 142 246 134 253 140 C260 146 262 168 260 204 C257 268 254 342 252 412 C252 422 251 426 250 420 Z" fill="url(#pb-leaf-top)" filter="url(#pb-stem-glow)" />
          <path d="M251 414 C249 372 248 308 250 248 C252 192 255 158 252 142" fill="none" stroke="#fff" strokeWidth="1.6" strokeOpacity="0.28" strokeLinecap="round" />
        </g>
        </g>
        <g transform="translate(128,96) scale(0.52) rotate(24 250 350)">
        <g id="leaf-right-top">
          <path d="M250 418 C252 406 251 396 247 390 C240 380 234 386 230 396" fill="url(#pb-leaf-under)" opacity="0.85" />
          <path d="M250 420 C268 388 282 348 290 304 C298 254 292 204 272 164 C262 138 252 132 246 138 C240 144 238 166 240 202 C243 266 246 340 248 410 C248 420 249 424 250 420 Z" fill="url(#pb-leaf-top)" filter="url(#pb-stem-glow)" />
          <path d="M249 414 C251 370 252 306 250 246 C248 190 245 156 248 140" fill="none" stroke="#fff" strokeWidth="1.6" strokeOpacity="0.28" strokeLinecap="round" />
        </g>
        </g>
        <g transform="translate(-14,118) rotate(-20 250 420)">
        <g id="leaf-left">
          <path d="M250 418 C247 406 248 396 253 388 C260 378 268 384 272 394" fill="url(#pb-leaf-under)" opacity="0.9" />
          <path d="M250 420 C232 392 214 348 206 302 C196 248 202 196 222 156 C232 128 244 120 252 126 C260 132 262 156 260 196 C257 264 254 346 252 414 C252 424 251 428 250 420 Z" fill="url(#pb-leaf-top)" filter="url(#pb-stem-glow)" />
          <path d="M251 412 C249 368 248 302 250 238 C252 178 256 142 252 126" fill="none" stroke="#fff" strokeWidth="1.9" strokeOpacity="0.24" strokeLinecap="round" />
        </g>
        </g>
        <g transform="translate(12,122) rotate(19 250 420)">
        <g id="leaf-right">
          <path d="M250 418 C253 404 252 394 247 386 C240 376 232 382 228 392" fill="url(#pb-leaf-under)" opacity="0.9" />
          <path d="M250 420 C268 390 286 346 294 300 C304 246 298 194 278 154 C268 126 256 120 248 126 C242 132 240 156 242 196 C245 264 248 346 248 414 C248 424 249 428 250 420 Z" fill="url(#pb-leaf-top)" filter="url(#pb-stem-glow)" />
          <path d="M249 412 C251 366 252 300 250 236 C248 176 244 142 248 126" fill="none" stroke="#fff" strokeWidth="1.9" strokeOpacity="0.24" strokeLinecap="round" />
        </g>
      </g>
      </g>



{/* ══════════════════════════════════════════
          FLOWER — bloom origin at calyx join
      ══════════════════════════════════════════ */}
      <g id="flower" transform="translate(240 -10) scale(1)">
        <g id="aura">
          <ellipse id="aura-back" cx="0" cy="-30" rx="150" ry="170" fill="url(#pb-aura-back)" />
        </g>

     

        {/* ── Nine sculpted petals — back to front ── */}

<g id="petals">

  {/* LAYER 1: 7 rear petals */}
  <g id="rear-petals">

  
  {[
    { id: "rear-1", rot: -120 },
    { id: "rear-2", rot: -80 },
    { id: "rear-3", rot: -40 },
    { id: "rear-4", rot: 0 },
    { id: "rear-5", rot: 40 },
    { id: "rear-6", rot: 80 },
    { id: "rear-7", rot: 120 },
  ].map((p) => (
    <SculptedPetal
      key={p.id}
      id={p.id}
      rotate={p.rot}
      originY={90}
      scale={1.12}
      nudgeY={8}
      bodyOpacity={0.62}
      shadow={lotusShadow}
      body={lotusBody}
      sheen={lotusSheen}
      veinCenter="M0 82 C0 32 0 -30 0 -120"
      veinLeft="M-10 72 C-24 30 -20 -20 -10 -90"
      veinRight="M10 72 C24 30 20 -20 10 -90"
      gloss={{ cx: 0, cy: -120, rx: 12, ry: 18, opacity: 0.12 }}
      fill="url(#pb-petal-rear)"
    />
  ))}
  </g>

  {/* LAYER 2: 4 middle petals */}
<g id="mid-petals">

  {[
    { id: "mid-left", rot: -55 },
    { id: "mid-inner-left", rot: -22 },
    { id: "mid-inner-right", rot: 22 },
    { id: "mid-right", rot: 55 },
  ].map((p) => (
    <SculptedPetal
      key={p.id}
      id={p.id}
      rotate={p.rot}
      originY={88}
      scale={1.05}
      nudgeY={-10}
      bodyOpacity={0.82}
      shadow={lotusShadow}
      body={lotusBody}
      sheen={lotusSheen}
      veinCenter="M0 82 C0 28 0 -40 0 -126"
      veinLeft="M-8 72 C-20 34 -18 -18 -10 -84"
      veinRight="M8 72 C20 34 18 -18 10 -84"
      gloss={{ cx: 0, cy: -125, rx: 12, ry: 18, opacity: 0.18 }}
    />
  ))}
  </g>

  {/* LAYER 3: 2 front petals */}
  <g id="front-petals">

  <SculptedPetal
    id="front-left"
    rotate={-18}
    originY={86}
    scale={1}
    nudgeX={-12}
    nudgeY={16}
    bodyOpacity={0.96}
    shadow={lotusShadow}
    body={lotusBody}
    sheen={lotusSheen}
    veinCenter="M0 82 C0 28 0 -46 0 -128"
    veinLeft="M-10 72 C-18 36 -18 -16 -12 -84"
    veinRight="M10 72 C18 36 18 -16 12 -84"
    gloss={{ cx: -2, cy: -128, rx: 14, ry: 20, opacity: 0.24 }}
  />
  <SculptedPetal
    id="front-right"
    rotate={18}
    originY={86}
    scale={1}
    nudgeX={12}
    nudgeY={16}
    bodyOpacity={0.96}
    shadow={lotusShadow}
    body={lotusBody}
    sheen={lotusSheen}
    veinCenter="M0 82 C0 28 0 -46 0 -128"
    veinLeft="M-10 72 C-18 36 -18 -16 -12 -84"
    veinRight="M10 72 C18 36 18 -16 12 -84"
    gloss={{ cx: 2, cy: -128, rx: 14, ry: 20, opacity: 0.24 }}
  />
  </g>

  {/* LAYER 4: Crown petal — the big lad */}
  <g id="crown-petal">
  <SculptedPetal
    id="lotus-center"
    rotate={0}
    originY={88}
    scale={1.18}
    nudgeY={-42}
    shadow={`M0 90 C-45 70 -50 10 -40 -90 C-30 -150 -12 -185 0 -195 C12 -185 30 -150 40 -90 C50 10 45 70 0 90 Z`}
    body={`M0 90 C-48 68 -54 8 -42 -96 C-30 -160 -12 -198 0 -210 C12 -198 30 -160 42 -96 C54 8 48 68 0 90 Z`}
    sheen={`M0 90 C-44 66 -50 12 -38 -84 C-26 -148 -10 -182 0 -190 C10 -182 26 -148 38 -84 C50 12 44 66 0 90 Z`}
    bodyOpacity={1}
    veinCenter="M0 82 C0 18 0 -60 0 -150"
    veinLeft="M-12 72 C-22 30 -20 -26 -12 -96"
    veinRight="M12 72 C22 30 20 -26 12 -96"
    gloss={{ cx: 0, cy: -160, rx: 14, ry: 22, opacity: 0.28 }}
  />
  </g>

</g>



 
        {/* ── Flower center — emotional warmth ── */}
        <g id="flower-center" transform="translate(0 -10) scale(2.3)">
          
          <g id="inner-glow">
            <ellipse cx="0" cy="16" rx="28" ry="22" fill="url(#pb-inner-glow)" opacity="0.85" />
            <ellipse cx="0" cy="18" rx="18" ry="14" fill="#fff4a8" opacity="0.35" />
            <ellipse cx="0" cy="20" rx="10" ry="8" fill="#ffe566" opacity="0.55" />
          </g>

          <g id="stamens" filter="url(#pb-center-glow)">
            {[
              { x: 0, y1: 16, y2: -20, lean: 0 },
              { x: -9, y1: 18, y2: -12, lean: -0.4 },
              { x: 9, y1: 18, y2: -12, lean: 0.4 },
              { x: -6, y1: 20, y2: 0, lean: -0.2 },
              { x: 6, y1: 20, y2: 0, lean: 0.2 },
              { x: -13, y1: 22, y2: 4, lean: -0.6 },
              { x: 13, y1: 22, y2: 4, lean: 0.6 },
              { x: -4, y1: 19, y2: -8, lean: -0.1 },
              { x: 4, y1: 19, y2: -8, lean: 0.1 },
            ].map((s, i) => {
              const tipX = s.x + s.lean * 3;
              return (
                <g key={i} id={`stamen-${i}`}>
                  <line
                    x1={s.x}
                    y1={s.y1}
                    x2={tipX}
                    y2={s.y2}
                    stroke="#fff4b0"
                    strokeWidth="1.5"
                    strokeOpacity="0.92"
                    strokeLinecap="round"
                  />
                  <circle cx={tipX} cy={s.y2} r="2.4" fill="#ffd940" opacity="0.96" />
                  <circle cx={tipX} cy={s.y2} r="1.1" fill="#fffce0" />
                </g>
              );
            })}
          </g>

          <g id="pollen">
            {[
              { cx: -5, cy: 8, r: 1.1 },
              { cx: 6, cy: 6, r: 0.9 },
              { cx: -2, cy: -2, r: 0.8 },
              { cx: 3, cy: -6, r: 1 },
              { cx: -8, cy: 2, r: 0.7 },
              { cx: 9, cy: 0, r: 0.85 },
              { cx: 0, cy: -10, r: 0.75 },
              { cx: -4, cy: -14, r: 0.65 },
              { cx: 5, cy: -12, r: 0.7 },
            ].map((p, i) => (
              <circle
                key={i}
                id={`pollen-${i}`}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill="#ffe880"
                opacity="0.75"
              />
            ))}
          </g>
        </g>

        <g id="aura-front">
          <ellipse cx="0" cy="-22" rx="80" ry="95" fill="url(#pb-aura-front)" />
        </g>

      </g>
     
    </svg>
  );
}
