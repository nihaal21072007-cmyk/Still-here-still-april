// src/components/PromiseBloomSequence.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { PromiseBloomSVG } from "./promise-bloom/PromiseBloomSVG";





type Props = {
  x: number; // will be fixed 50%
  y: number; // will be fixed 90%
  onComplete?: () => void;
};

export function PromiseBloomSequence({ x, y, onComplete }: Props) {
  const [phase, setPhase] = useState(0);

  // Generate fixed arrays of random positions for particles and fireflies
  // so they don't flicker on each render.
// In your useMemo
const particles = useMemo(() =>
  Array.from({ length: 60 }, (_, i) => ({  // 30 → 60
    id: i,
    left: 15 + Math.random() * 70,          // wider spread
    bottom: 10 + Math.random() * 90,
    delay: Math.random() * 0.5,
    drift: -120 + Math.random() * 240,
    size: 4 + Math.random() * 8,            // add size variation
  })),
[]);

  const fireflies = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,   // between 15% and 85%
      top:  10 + Math.random() * 60,   // between 10% and 70%
      duration: 3 + Math.random() * 3, // 3-6s
      delay: Math.random() * 2,        // 0-2s
    }));
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);


  

  
useEffect(() => {
const timers = [

setTimeout(() => setPhase(2), 1000),   // particles gather
];

return () => timers.forEach(clearTimeout);
}, [onComplete]);






const bloomInitialized = useRef(false);

useEffect(() => {
  if (phase < 2 || bloomInitialized.current) return;

  bloomInitialized.current = true;

const ctx = gsap.context(() => {
const q = gsap.utils.selector(rootRef);



const leaves = [
  "#leaf-left",
  "#leaf-right",
  "#leaf-left-top",
  "#leaf-right-top",
];

setTimeout(() => {
  leaves.forEach((id) => {
    const el = document.querySelector(id);

    if (!el) {
      console.log(id, "NOT FOUND");
      return;
    }

    const bbox = el.getBoundingClientRect();
    const svg = el.closest("svg");

    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();

    console.log(id, {
      x: bbox.left - svgRect.left + bbox.width / 2,
      y: bbox.bottom - svgRect.top,
    });
  });
}, 500);



const stem = q("#stem-main")[0] as SVGPathElement | undefined;

if (!stem) return;

// Hide ALL stem paths from start
const stemShadow = q("#stem-shadow")[0] as SVGPathElement | undefined;
const stemHighlight = q("#stem-highlight")[0] as SVGPathElement | undefined;

const stemLength = stem.getTotalLength();

// Dashoffset on all three stroke paths
gsap.set(stem, {
  strokeDasharray: stemLength,
  strokeDashoffset: stemLength,
});

if (stemShadow) {
  const shadowLen = stemShadow.getTotalLength();
  gsap.set(stemShadow, {
    strokeDasharray: shadowLen,
    strokeDashoffset: shadowLen,
  });
}

if (stemHighlight) {
  const highlightLen = stemHighlight.getTotalLength();
  gsap.set(stemHighlight, {
    strokeDasharray: highlightLen,
    strokeDashoffset: highlightLen,
  });
}

// Hide the ellipses too
gsap.set(q("#stem-base-shadow"), { opacity: 0 });
gsap.set(q("#stem-base"), { opacity: 0 });

// Keep stem group visible (opacity 1) - dashoffset handles reveal
gsap.set(q("#stem"), { opacity: 1 });

const tl = gsap.timeline({
  paused: true,
});

const particleEls = q(".magic-particle");

gsap.set(particleEls, {
  opacity: 0,
  scale: 0,
});


// BOTTOM LEAVES
gsap.set(q("#leaf-left"), {
  scale: 0,
  svgOrigin: "237 424",
});

gsap.set(q("#leaf-right"), {
  scale: 0,
  svgOrigin: "263 424",
});

// TOP LEAVES
gsap.set(q("#leaf-left-top"), {
  scale: 0,
  svgOrigin: "236 423",
});

gsap.set(q("#leaf-right-top"), {
  scale: 0,
  svgOrigin: "262 422",
});
  gsap.set(q("#rear-petals"), {
    scale: 0.15,
    y: 110,
    opacity: 0,
    transformOrigin: "50% 100%",
  });

  gsap.set(q("#mid-petals"), {
    scale: 0.1,
    y: 100,
    opacity: 0,
    transformOrigin: "50% 100%",
  });

  gsap.set(q("#front-petals"), {
    scale: 0.08,
    y: 90,
    opacity: 0,
    transformOrigin: "50% 100%",
  });

  gsap.set(q("#crown-petal"), {
    scaleY: 0.05,
    scaleX: 0.2,
    y: 70,
    opacity: 0,
    transformOrigin: "50% 100%",
  });

gsap.set(q("#flower-center"), {
  scale: 0,
  opacity: 0,
  svgOrigin: "0 8",
});

  gsap.set(q("#aura-back"), {
    scale: 0,
    opacity: 0,
  });

  gsap.set(q("#aura-front"), {
    scale: 0,
    opacity: 0,
  });




console.log(q("#leaf-left"));
console.log(q("#leaf-right"));
console.log(q("#leaf-left-top"));
console.log(q("#leaf-right-top"));

// 1. Silence
//

tl.to({}, {
  duration: 0.8
});

//
// 2. Magic appears
//

// Particles: 1.8s silence + 3s appear + 2.4s return + 0.7s pause = 7.9s before stem
// Stem: 5s = 12.9s total before leaves
// That's way too long bruv

// Cut particles shorter:
tl.to(particleEls, {
  opacity: 1, scale: 1, y: -520,   // higher float
  x: (_, el) => gsap.utils.random(-80, 80),  // wider scatter
  duration: 2.2,
  stagger: 0.025,   // tighter stagger = more dramatic wave
  ease: "sine.out"
});

tl.to(particleEls, {
  opacity: 0, scale: 0, x: 0, y: 0,
  duration: 1.4,   // was 2.4
  stagger: 0.02,
  ease: "power2.inOut"
});

// Stem grows — all paths draw simultaneously
tl.to([stem, stemShadow, stemHighlight].filter(Boolean), {
  strokeDashoffset: 0,
  duration: 3.5,
  ease: "power2.out",
});

// Base ellipses fade in at end of stem draw
tl.to(q("#stem-base-shadow"), { opacity: 1, duration: 0.3 }, "-=0.3");
tl.to(q("#stem-base"), { opacity: 1, duration: 0.3 }, "<");

// Leaves sprout while stem finishing — fix the timing here
tl.to(q("#leaf-left"), {
  scale: 1,
  duration: 0.9,
  ease: "back.out(1.8)",
}, "-=1.8");   // 👈 starts 1.8s before stem finishes

tl.to(q("#leaf-right"), {
  scale: 1,
  duration: 0.9,
  ease: "back.out(1.8)",
}, "<0.15");   // 👈 NOT "<=13" fam what was that 😭

tl.to(q("#leaf-left-top"), {
  scale: 1,
  duration: 0.8,
  ease: "back.out(1.8)",
}, "-=0.4");

tl.to(q("#leaf-right-top"), {
  scale: 1,
  duration: 0.8,
  ease: "back.out(1.8)",
}, "<0.15");
//
// 6. Stem fades in
//


//
// 9. Tiny pause
//

tl.to({},{
  duration:0.6
});

//
// 10. Rear petals
//

tl.to(q("#rear-petals"),{
  scale:1,
  y:0,
  opacity:1,
  duration:1.8,
  ease:"power2.out"
});

//
// 11. Middle petals
//

tl.to(q("#mid-petals"),{
  scale:1,
  y:0,
  opacity:1,
  duration:1.6,
  ease:"power2.out"
},"-=0.8");

//
// 12. Front petals
//

tl.to(q("#front-petals"),{
  scale:1,
  y:0,
  opacity:1,
  duration:1.4,
  ease:"power2.out"
},"-=0.8");

//
// 13. Crown opens
//

tl.to(q("#crown-petal"),{
  scaleX:1,
  scaleY:1,
  y:0,
  opacity:1,
  duration:2,
  ease:"elastic.out(0.8,0.35)"
});

//
// 14. Center appears
//

// And the animation — add explicit scale target smaller than 1
tl.to(q("#flower-center"), {
  scale: 2.5,   // 👈 tune this number, 1 = full SVG size which is too big
  opacity: 1,
  duration: 1,
  ease: "back.out(2)"
}, "-=0.8");

//
// 15. Glow
//

tl.to(q("#aura-back"),{
  scale:1,
  opacity:1,
  duration:1.4
},"<");

tl.to(q("#aura-front"),{
  scale:1,
  opacity:1,
  duration:1.4
},"<");

//
// 16. Gentle breathing forever
//

tl.add(() => {

    gsap.to("#flower",{
        y:-4,
        rotation:0.6,
        duration:3.5,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
    });

});


tl.call(() => {
    onComplete?.();
});


tl.play();



}, rootRef);

return () => ctx.revert();

}, [phase]);


  return (
    <div
      ref={rootRef}
      className="PromiseBloomSequence"
      style={{
        position: "absolute",
        left: `${x}%`,
        bottom: "0px",
        transform: "translate(-50%, 0)",
        pointerEvents: "none",
      }}
    >

  {phase >= 2 &&
  particles.map((p) => (
<div
  key={p.id}
  className="magic-particle"
  style={{
    position: "absolute",
    left: `${p.left}%`,
    bottom: `${p.bottom}px`,
    animationDelay: `${p.delay}s`,
    width: `${p.size}px`,       // 👈 add these
    height: `${p.size}px`,      // 👈
  }}
/>
  ))}


{phase >= 2 && (
  <div
    style={{
      position: "absolute",
      left: -260,
      bottom: -10,
      transform: "scale(1.0)",
      transformOrigin: "bottom center",
    }}
  >
    <PromiseBloomSVG />
  </div>
)}


      {/* 8. Fireflies */}
      {phase >= 7 && fireflies.map(f => (
        <div
          key={`firefly-${f.id}`}
          className="firefly"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
