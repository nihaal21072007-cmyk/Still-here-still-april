import { useEffect, useMemo, useState } from "react";
import { RoomShell } from "@/components/RoomShell";
import { BIRTHDAY } from "@/data/content";
import { useDiscoveries } from "@/lib/state";

export function Birthday() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);

  const target = new Date(BIRTHDAY.date + "T00:00:00").getTime();
  const diff = target - now;
  const unlocked = diff <= 0;

  if (!unlocked) {
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return (
      <RoomShell title="The Birthday Vault" subtitle="locked. you know when.">
        <div className="paper-card p-7 text-center glow-card">
          <div className="text-5xl mb-3 breathe" style={{ color: "var(--firefly)" }}>🎂</div>
          <p className="hand text-xl" style={{ color: "var(--warmth)" }}>opens on {BIRTHDAY.date}</p>
          <div className="grid grid-cols-4 gap-2 mt-6">
            {[["days",days],["hrs",hours],["min",mins],["sec",secs]].map(([l,v]) => (
              <div key={l as string} className="paper-card p-3">
                <div className="font-display font-extrabold text-2xl" style={{ color: "var(--firefly)" }}>{String(v).padStart(2,"0")}</div>
                <div className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>{l}</div>
              </div>
            ))}
          </div>
          <p className="hand text-lg mt-6" style={{ color: "var(--muted-foreground)" }}>no peeking. i will know.</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">The 18 Constellation</h2>
          <p className="text-sm mb-3" style={{ color: "var(--muted-foreground)" }}>
            connect the stars in order. it's been waiting.
          </p>
          <Constellation />
        </div>
      </RoomShell>
    );
  }

  return (
    <RoomShell title="The Birthday Vault" subtitle="happy birthday, menace.">
      <div className="paper-card p-7 bloom-in glow-card">
        <div className="text-6xl text-center">🎂✨🎈</div>
        <p className="hand text-2xl text-center mt-3" style={{ color: "var(--firefly)" }}>{BIRTHDAY.message}</p>
        <pre className="serif-letter whitespace-pre-wrap text-base leading-relaxed mt-6">{BIRTHDAY.letter}</pre>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">The 18 Constellation</h2>
        <Constellation />
      </div>
    </RoomShell>
  );
}

// Simple "trace the stars in order" puzzle — draws a "18".
function Constellation() {
  // points form a stylized "1 8" on a 300x180 canvas
  const points = useMemo(() => ([
    // "1"
    { x: 60,  y: 40 },
    { x: 80,  y: 30 },
    { x: 80,  y: 150 },
    // "8" — top loop then bottom loop
    { x: 180, y: 40 },
    { x: 230, y: 70 },
    { x: 180, y: 100 },
    { x: 130, y: 70 },
    { x: 180, y: 40 }, // close top
    { x: 180, y: 100 },
    { x: 230, y: 130 },
    { x: 180, y: 160 },
    { x: 130, y: 130 },
    { x: 180, y: 100 }, // close bottom
  ]), []);

  const [traced, setTraced] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const { unlock } = useDiscoveries();

  useEffect(() => {
    if (traced.length === points.length && !done) {
      setDone(true);
      unlock("constellation");
    }
  }, [traced.length, points.length, done, unlock]);

  const next = (i: number) => {
    if (i === traced.length) setTraced((t) => [...t, i]);
  };

  const reset = () => { setTraced([]); setDone(false); };

  const lines = traced.slice(0, -1).map((i, idx) => {
    const a = points[i], b = points[traced[idx + 1]];
    return <line key={idx} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--firefly)" strokeWidth="1.5" strokeOpacity="0.8" />;
  });

  return (
    <div className="paper-card p-4">
      <svg viewBox="0 0 300 200" className="w-full h-auto" style={{ aspectRatio: "3/2" }}>
        <rect width="300" height="200" rx="12" fill="color-mix(in oklab, var(--void) 92%, transparent)" />
        {lines}
        {points.map((p, i) => {
          const lit = traced.includes(i);
          const isNext = i === traced.length;
          return (
            <g key={i} onClick={() => next(i)} style={{ cursor: isNext ? "pointer" : "default" }}>
              <circle
                cx={p.x} cy={p.y}
                r={isNext ? 9 : 6}
                fill={lit ? "var(--firefly)" : "#fff"}
                opacity={lit ? 1 : isNext ? 0.9 : 0.5}
                style={{ filter: lit || isNext ? "drop-shadow(0 0 8px var(--firefly))" : "none" }}
              />
              {isNext && <circle cx={p.x} cy={p.y} r="14" fill="none" stroke="var(--firefly)" strokeWidth="1" opacity="0.5" className="lock-pulse" />}
            </g>
          );
        })}
      </svg>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{traced.length} / {points.length}</span>
        <button onClick={reset} className="text-xs hand text-base">reset</button>
      </div>
      {done && (
        <p className="hand text-lg mt-3 bloom-in" style={{ color: "var(--warmth)" }}>
          {BIRTHDAY.constellationMessage}
        </p>
      )}
    </div>
  );
}
