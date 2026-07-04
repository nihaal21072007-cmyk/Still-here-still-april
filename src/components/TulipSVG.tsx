export function TulipSVG() {
  return (
    <svg
      width="500"
      height="700"
      viewBox="0 -180 500 850"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>

        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dffb2"/>
          <stop offset="100%" stopColor="#1d4d29"/>
        </linearGradient>

        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b7ffd3"/>
          <stop offset="100%" stopColor="#2f8747"/>
        </linearGradient>

        {/* Petal: warm ivory tip → deep rose base */}
        <linearGradient id="petalGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#fff4f9"/>
          <stop offset="30%"  stopColor="#ffb3d9"/>
          <stop offset="70%"  stopColor="#e8449a"/>
          <stop offset="100%" stopColor="#c0186e"/>
        </linearGradient>

        {/* Translucent overlay — inner petal light */}
        <linearGradient id="petalSheen" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.6"/>
          <stop offset="50%"  stopColor="#ffddee" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#ff80c0" stopOpacity="0.0"/>
        </linearGradient>

        {/* Calyx gradient */}
        <linearGradient id="calyxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#a8ffd0"/>
          <stop offset="100%" stopColor="#1e6635"/>
        </linearGradient>

        {/* Center warm glow */}
        <radialGradient id="centerGlow" cx="50%" cy="60%" r="50%">
          <stop offset="0%"   stopColor="#fff8c0"/>
          <stop offset="40%"  stopColor="#ffd966"/>
          <stop offset="100%" stopColor="#e8449a" stopOpacity="0"/>
        </radialGradient>

        {/* Ambient glow behind flower */}
        <radialGradient id="bloomAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ff6ec7" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#ff6ec7" stopOpacity="0"/>
        </radialGradient>

        {/* Stem glow filter */}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="
            0 0 0 0 0.36
            0 0 0 0 1
            0 0 0 0 0.60
            0 0 0 0.6 0
          "/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Petal glow: warm pink light */}
        <filter id="petalGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="
            1   0   0   0   0.6
            0   0.2 0   0   0.1
            0   0   0.4 0   0.3
            0   0   0   0.6 0
          "/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Center stamens glow */}
        <filter id="stamenGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="
            1 0 0 0 1
            1 0 0 0 0.9
            0 0 0 0 0.1
            0 0 0 1 0
          "/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

      </defs>

      {/* ── STEM ── */}
      <g id="stem">
        <path
          d="M250 684 C244 615 254 555 246 495 C238 435 244 375 250 315 C256 245 252 185 246 115 C244 90 248 65 255 42"
          fill="none"
          stroke="#5dff98"
          strokeWidth="28"
          opacity=".06"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />
        <path
          d="M250 684 C244 615 254 555 246 495 C238 435 244 375 250 315 C256 245 252 185 246 115 C244 90 248 65 255 42"
          fill="none"
          stroke="#5dff98"
          strokeWidth="22"
          opacity=".07"
          strokeLinecap="round"
        />
        <path
          id="stem-main"
          className="stem"
          d="M250 684 C244 615 254 555 246 495 C238 435 244 375 250 315 C256 245 252 185 246 115 C244 90 248 65 255 42"
          fill="none"
          stroke="url(#stemGradient)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M247 682 C241 613 251 553 243 493 C235 433 241 373 247 313 C253 243 249 183 243 113 C241 88 245 63 252 40"
          fill="none"
          stroke="#14301c"
          strokeWidth="3"
          strokeOpacity=".28"
          strokeLinecap="round"
        />
        <path
          d="M248 680 C252 612 244 562 247 502 C250 442 246 382 249 322 C253 252 251 192 248 122 C247 97 249 72 253 44"
          fill="none"
          stroke="#d9ffe8"
          strokeWidth="2.2"
          strokeOpacity=".5"
          strokeLinecap="round"
        />
        <ellipse cx="250" cy="685" rx="16" ry="5" fill="#0d2414" opacity=".35"/>
        <ellipse cx="250" cy="684" rx="9" ry="4" fill="#1a3d22" opacity=".6"/>
      </g>

      {/* ── LEAVES ── */}
      <g id="leaf-left-top" transform="translate(100,90) scale(0.5) rotate(-28 250 320)" filter="url(#softGlow)">
        <path d="M250 420 C235 395 220 360 210 320 C200 270 205 220 225 180 C235 155 245 145 252 150 C258 155 260 175 258 210 C255 270 252 340 252 410 C252 420 251 425 250 420 Z" fill="url(#leafGradient)"/>
        <path d="M251 415 C249 380 248 320 250 260 C251 200 253 165 252 152" fill="none" stroke="#fff" strokeWidth="1.5" strokeOpacity=".3" strokeLinecap="round"/>
      </g>
      <g id="leaf-right-top" transform="translate(130,100) scale(0.55) rotate(22 250 360)" filter="url(#softGlow)">
        <path d="M250 420 C262 390 275 360 282 320 C288 275 285 230 270 190 C262 165 255 155 250 160 C245 165 242 185 242 215 C242 270 244 330 246 410 C246 420 248 425 250 420 Z" fill="url(#leafGradient)"/>
        <path d="M250 415 C251 380 252 320 251 260 C250 200 249 165 250 162" fill="none" stroke="#fff" strokeWidth="1.5" strokeOpacity=".3" strokeLinecap="round"/>
      </g>
      <g id="leaf-left" transform="translate(-10,120) rotate(-18 250 420)" filter="url(#softGlow)">
        <path d="M250 420 C235 395 220 360 210 320 C200 270 205 220 225 180 C235 155 245 145 252 150 C258 155 260 175 258 210 C255 270 252 340 252 410 C252 420 251 425 250 420 Z" fill="url(#leafGradient)"/>
        <path d="M251 415 C249 375 248 310 250 250 C252 195 254 162 252 151" fill="none" stroke="#fff" strokeWidth="1.8" strokeOpacity=".25" strokeLinecap="round"/>
      </g>
      <g id="leaf-right" transform="translate(10,120) rotate(18 250 420)" filter="url(#softGlow)">
        <path d="M250 420 C265 395 280 360 290 320 C300 270 295 220 275 180 C265 155 255 145 248 150 C242 155 240 175 242 210 C245 270 248 340 248 410 C248 420 249 425 250 420 Z" fill="url(#leafGradient)"/>
        <path d="M249 415 C251 375 252 310 250 250 C248 195 246 162 248 151" fill="none" stroke="#fff" strokeWidth="1.8" strokeOpacity=".25" strokeLinecap="round"/>
      </g>

      {/* ── FLOWER ── all petals rotate/scale from origin (0,0) for bloom animation */}
      <g id="flower" transform="translate(250 48) scale(1.3)">

        {/* Ambient aura — soft pink halo behind the whole bloom */}
        <ellipse cx="0" cy="-20" rx="110" ry="130" fill="url(#bloomAura)"/>

        {/* ── CALYX — sits below petals, cradles the base ── */}
        <g id="calyx">
          {/* left sepal */}
          <path
            d="M-2 108 C-22 90 -26 68 -14 52 C-8 60 -4 80 -2 108 Z"
            fill="url(#calyxGrad)" opacity=".95"
          />
          {/* right sepal */}
          <path
            d="M2 108 C22 90 26 68 14 52 C8 60 4 80 2 108 Z"
            fill="url(#calyxGrad)" opacity=".95"
          />
          {/* center sepal */}
          <path
            d="M0 110 C-10 85 -6 60 0 48 C6 60 10 85 0 110 Z"
            fill="#a8ffd0" opacity=".8"
          />
          {/* calyx highlight vein */}
          <path d="M0 105 C0 85 0 65 0 50" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity=".35" strokeLinecap="round"/>
        </g>

        {/*
          ── PETALS ──
          5 petals. Each is a <g> with its own transform-origin at (0, 80) — the petal base.
          For bloom animation later: rotate each from ~closed (nearly vertical) to open angle.
          Petal base path starts at M0 80 going upward to tip, so origin point is always the calyx join.

          Petal shape anatomy:
          - Starts at base (0, 80)
          - Left bezier sweeps wide and curves to tip
          - Right bezier mirrors back
          - Slight asymmetry per petal = natural feel
        */}



<g id="petal-master" style={{ transformOrigin: "0px 88px" }}>

 {/* FRONT CENTER PETAL */}
<g
  id="petal-front-center"
  transform="translate(0 8)"
  style={{
    transformOrigin: "0px 82px",
  }}
>

  {/* shadow underneath */}
  <path
    d="
      M0 84
      C-38 62 -48 18 -30 -72
      C-18 -118 -7 -134 0 -132
      C7 -134 18 -118 30 -72
      C48 18 38 62 0 84
      Z
    "
    fill="#9f1460"
    opacity=".18"
    transform="translate(2 5)"
  />

  {/* main petal */}
  <path
    d="
      M0 82

      C-42 64 -54 18 -36 -70

      C-26 -112 -12 -132 0 -128

      C12 -132 26 -112 36 -70

      C54 18 42 64 0 82

      Z
    "
    fill="url(#petalGrad)"
    filter="url(#petalGlow)"
  />

  {/* silky highlight */}
  <path
    d="
      M0 82
      C-42 64 -54 18 -36 -70
      C-26 -112 -12 -132 0 -128
      C12 -132 26 -112 36 -70
      C54 18 42 64 0 82
      Z
    "
    fill="url(#petalSheen)"
    opacity=".55"
  />

  {/* center vein */}
  <path
    d="
      M0 76
      C0 28
       0 -18
       0 -92
    "
    stroke="#fff"
    strokeWidth="2.2"
    strokeOpacity=".45"
    fill="none"
    strokeLinecap="round"
  />

  {/* left vein */}
  <path
    d="
      M-7 68
      C-16 38
       -18 -6
       -12 -58
    "
    stroke="#fff"
    strokeWidth="1"
    strokeOpacity=".16"
    fill="none"
    strokeLinecap="round"
  />

  {/* right vein */}
  <path
    d="
      M7 68
      C16 38
       18 -6
       12 -58
    "
    stroke="#fff"
    strokeWidth="1"
    strokeOpacity=".16"
    fill="none"
    strokeLinecap="round"
  />

  {/* top glossy spot */}
  <ellipse
    cx="0"
    cy="-102"
    rx="9"
    ry="13"
    fill="#fff"
    opacity=".18"
  />

</g>



  {/* Soft highlight */}
  <path
    d="
      M0 88

      C-16 82 -34 60 -44 26

      C-52 -4 -46 -48 -28 -92

      C-14 -124 -4 -142 0 -146

      C6 -142 16 -126 28 -92

      C44 -48 48 -2 40 26

      C30 60 16 82 0 88

      Z
    "
    fill="url(#petalSheen)"
    opacity=".45"
  />

  {/* Main vein */}
  <path
    d="
      M0 82
      C0 40
       0 -25
       0 -136
    "
    fill="none"
    stroke="#ffffff"
    strokeWidth="1.8"
    strokeOpacity=".42"
    strokeLinecap="round"
  />

  {/* Left vein */}
  <path
    d="
      M-8 72
      C-18 40
       -22 -8
       -16 -86
    "
    fill="none"
    stroke="#ffffff"
    strokeWidth=".9"
    strokeOpacity=".18"
    strokeLinecap="round"
  />

  {/* Right vein */}
  <path
    d="
      M8 72
      C18 40
       22 -8
       16 -86
    "
    fill="none"
    stroke="#ffffff"
    strokeWidth=".9"
    strokeOpacity=".18"
    strokeLinecap="round"
  />

</g>




        {/* ── STAMENS — the golden heart ── */}
        <g id="stamens" filter="url(#stamenGlow)">
          {/* warm inner glow disc */}
          <ellipse cx="0" cy="18" rx="22" ry="16" fill="#fff59a" opacity=".25"/>
          <ellipse cx="0" cy="20" rx="14" ry="10" fill="#ffe566" opacity=".4"/>

          {/* stamen filaments */}
          {[
            {x: 0,   y1: 18, y2: -8},
            {x: -8,  y1: 20, y2: -4},
            {x: 8,   y1: 20, y2: -4},
            {x: -5,  y1: 22, y2: 2 },
            {x: 5,   y1: 22, y2: 2 },
            {x: -12, y1: 22, y2: 6 },
            {x: 12,  y1: 22, y2: 6 },
          ].map((s, i) => (
            <g key={i}>
              <line x1={s.x} y1={s.y1} x2={s.x * 1.1} y2={s.y2}
                stroke="#fff0a0" strokeWidth="1.4" strokeOpacity=".9" strokeLinecap="round"/>
              {/* anther dot */}
              <circle cx={s.x * 1.1} cy={s.y2} r="2.2" fill="#ffe14d" opacity=".95"/>
              <circle cx={s.x * 1.1} cy={s.y2} r="1" fill="#fff8b0" opacity="1"/>
            </g>
          ))}
        </g>

      </g>
    </svg>
  );
}