import { useEffect, useMemo, useState } from "react";

/**
 * V3 — World atmosphere layer.
 * - Tiered star field (dim / mid / bright with halos)
 * - A painted crescent moon high-right
 * - Drifting fireflies (warm gold pulses)
 * - Occasional shooting stars
 *
 * Renders fixed behind everything; pointer-events: none.
 */
export function Starfield({ showMoon = true, fireflies = 14 }: { showMoon?: boolean; fireflies?: number }) {
  const [shoot, setShoot] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const schedule = () => {
      const delay = 90_000 + Math.random() * 90_000;
      setTimeout(() => {
        if (cancelled) return;
        setShoot((n) => n + 1);
        schedule();
      }, delay);
    };
    const first = setTimeout(() => setShoot(1), 5000);
    schedule();
    return () => { cancelled = true; clearTimeout(first); };
  }, []);

  // Three tiers of stars, deterministic positions so they don't reshuffle.
  const stars = useMemo(() => {
    const out: { x: number; y: number; r: number; o: number; halo: number; tw: number }[] = [];
    const rand = mulberry32(7);
    const total = 90;
    for (let i = 0; i < total; i++) {
      const tier = i < total * 0.6 ? 1 : i < total * 0.9 ? 2 : 3; // 60/30/10
      const r = tier === 1 ? 1 : tier === 2 ? 1.5 : 2.5;
      const o = tier === 1 ? 0.45 : tier === 2 ? 0.7 : 0.95;
      const halo = tier === 3 ? 4 : 0;
      // Sky-dense at top, thin at bottom
      const y = Math.pow(rand(), 2) * 95;
      out.push({ x: rand() * 100, y, r, o, halo, tw: 3 + rand() * 6 });
    }
    return out;
  }, []);

  const flies = useMemo(() => {
    const rand = mulberry32(31);
    return Array.from({ length: fireflies }).map((_, i) => ({
      id: i,
      left: rand() * 100,
      bottom: 5 + rand() * 70,
      delay: rand() * 14,
      dur: 12 + rand() * 10,
      pulseDur: 1.6 + rand() * 2,
    }));
  }, [fireflies]);

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Sky gradient already on body; add subtle warm horizon */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 90% 40% at 50% 100%, color-mix(in oklab, var(--candle-amber) 7%, transparent), transparent 70%)",
      }} />

      {/* Moon */}
      {showMoon && (
        <div style={{ position: "absolute", top: "8%", right: "10%", width: 90, height: 90 }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, var(--moonlight) 0%, #D8D2F0 55%, transparent 70%)",
            boxShadow: "0 0 60px 10px color-mix(in oklab, var(--moonlight) 35%, transparent), 0 0 120px 40px color-mix(in oklab, var(--moonlight) 12%, transparent)",
          }} />
          {/* Crescent cutout */}
          <div style={{
            position: "absolute", top: 4, right: 4, width: 78, height: 78, borderRadius: "50%",
            background: "var(--void)",
            transform: "translate(-14%, -2%)",
            opacity: 0.92,
          }} />
        </div>
      )}

      {/* Stars */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {stars.map((s, i) => (
          <g key={i} style={{ animation: `star-twinkle ${s.tw}s ease-in-out ${i * 0.13}s infinite` }}>
            {s.halo > 0 && (
              <circle cx={`${s.x}%`} cy={`${s.y}%`} r={s.halo} fill="var(--starlight)" opacity={0.18} />
            )}
            <circle cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="var(--starlight)" opacity={s.o} />
          </g>
        ))}
      </svg>

      {/* Fireflies */}
      {flies.map((f) => (
        <span key={f.id} style={{
          position: "absolute",
          left: `${f.left}%`,
          bottom: `${f.bottom}%`,
          width: 3, height: 3, borderRadius: 999,
          background: "var(--firefly-warm)",
          color: "var(--firefly-warm)",
          boxShadow: "0 0 12px 3px color-mix(in oklab, var(--firefly-warm) 70%, transparent)",
          animation: `firefly-drift ${f.dur}s ease-in-out ${f.delay}s infinite, firefly-pulse ${f.pulseDur}s ease-in-out infinite`,
        }} />
      ))}

      {shoot > 0 && <span key={shoot} className="shooting-star" />}
    </div>
  );
}

// tiny seeded RNG
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
