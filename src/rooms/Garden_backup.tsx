// src/rooms/Garden.tsx
import { RoomShell } from "@/components/RoomShell";
import { FLOWER_TYPES, FLOWER_MESSAGES, POST_BLOOM_CARDS } from "@/data/content";
import { useGarden, useDiscoveries, useIsNight, type PlantedFlower } from "@/lib/state";
import { useEffect, useRef, useState } from "react";

const MAX_FLOWERS = 40;

export function Garden() {
  const { flowers, setFlowers, bloomed, setBloomed } = useGarden();
  const { unlock } = useDiscoveries();
  const isNight = useIsNight();

  const [blooming, setBlooming] = useState(false);
  const [bloomAt, setBloomAt] = useState<{ x: number; y: number } | null>(null);
  const [selectedType, setSelectedType] = useState<string>(FLOWER_TYPES[0].id);
  const [activeFortune, setActiveFortune] = useState<string | null>(null);
  const [showCards, setShowCards] = useState(false);
  const soilRef = useRef<HTMLDivElement | null>(null);
  const animationTimers = useRef<NodeJS.Timeout[]>([]); // store timeouts to clear later

  // milestone unlocks
  useEffect(() => {
    if (flowers.length >= 5) unlock("garden_5");
    if (flowers.length >= 10) unlock("garden_10");
    if (flowers.length >= 20) unlock("garden_20");
  }, [flowers.length, unlock]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      animationTimers.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // ----- Promise bloom (first visit) -----
  if (!bloomed) {
    const doBloom = (e: React.MouseEvent | React.TouchEvent) => {
      if (blooming) return;
      const rect = soilRef.current?.getBoundingClientRect();
      if (!rect) return;
      const point = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
      const x = ((point.clientX - rect.left) / rect.width) * 100;
      const y = ((point.clientY - rect.top) / rect.height) * 100;
      setBloomAt({ x, y });
      setBlooming(true);

      // Schedule showing cards and marking bloom complete after animations
      animationTimers.current.push(
        setTimeout(() => setShowCards(true), 6500)
      );
      animationTimers.current.push(
        setTimeout(() => {
          setBloomed(true);
          unlock("promise_bloom");
        }, 8000)
      );
    };

    return (
      <RoomShell title="Tulip Garden" subtitle="your flower, maki 🌷">
        <div
          ref={soilRef}
          onClick={doBloom}
          onTouchStart={doBloom}
          className="relative paper-card overflow-hidden cursor-pointer select-none"
          style={{ height: "60vh", minHeight: 420, background: "radial-gradient(ellipse at bottom, #1a1538 0%, #07071A 70%)" }}
        >
          {!blooming && (
            <div className="absolute inset-0 grid place-items-center text-center px-6">
              <div>
                <div className="hand text-2xl mb-3" style={{ color: "var(--warmth)" }}>your flower, maki 🌷</div>
                <div className="hand text-base lock-pulse" style={{ color: "var(--muted-foreground)" }}>tap anywhere</div>
              </div>
            </div>
          )}
          {/* Ground moss */}
          <div className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--sage) 25%, transparent))" }} />
          {/* Promise bloom sequence */}
          {bloomAt && (
            <PromiseBloomSequence x={bloomAt.x} y={bloomAt.y} />
          )}
        </div>

        {/* Post-bloom cards */}
        {showCards && <PostBloomCards />}
      </RoomShell>
    );
  }

  // ----- Build-your-own garden -----
  const plant = (e: React.MouseEvent) => {
    if (flowers.length >= MAX_FLOWERS) return;
    const rect = soilRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (y < 15) return; // keep sky clean
    // spacing check (prevent overlapping)
    const tooClose = flowers.some((f) => Math.hypot(f.x - x, f.y - y) < 8);
    if (tooClose) return;
    const msg = Math.random() < 0.35 ? FLOWER_MESSAGES[Math.floor(Math.random() * FLOWER_MESSAGES.length)] : null;
    const f: PlantedFlower = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: selectedType,
      x, y,
      plantedAt: Date.now(),
      message: msg,
    };
    setFlowers((prev) => [...prev, f]);
  };

  const tapFlower = (f: PlantedFlower, ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (f.message) {
      setActiveFortune(f.message);
      unlock("fortune");
    } else {
      const random = FLOWER_MESSAGES[Math.floor(Math.random() * FLOWER_MESSAGES.length)];
      if (Math.random() < 0.35) {
        setActiveFortune(random);
        unlock("fortune");
      }
    }
  };

  const moonflowerVisible = isNight;

  return (
    <RoomShell title="Tulip Garden" subtitle="plant slowly. it remembers everything.">
      {/* Flowers planted count */}
      <div className="flex items-center justify-between text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
        <span>{flowers.length} / {MAX_FLOWERS} planted</span>
        <span>{moonflowerVisible ? "🌙 moonflower is open" : "moonflower opens at night"}</span>
      </div>

      {/* Garden soil area */}
      <div
        ref={soilRef}
        onClick={plant}
        className="relative paper-card overflow-hidden cursor-crosshair"
        style={{ height: "60vh", minHeight: 460, background: "radial-gradient(ellipse at bottom, #1a1538 0%, #07071A 75%)" }}
      >
        {/* Promise tulip placeholder */}
        <div className="absolute" style={{ left: "50%", bottom: 0, transform: "translateX(-50%)" }}>
          <StaticFlower type="rose" glow="#FF8B6A" size={90} label="Promise" />
        </div>
        {/* Moonflower (night-only decorative) */}
        {moonflowerVisible && (
          <div className="absolute" style={{ right: "8%", top: "20%" }}>
            <StaticFlower type="lily" glow="#5EFFD8" size={55} label="Moonflower" />
          </div>
        )}
        {/* Milestones */}
        {flowers.length >= 10 && (
          <span className="absolute" style={{ left: "5%", bottom: "8%", fontSize: 22, filter: "drop-shadow(0 0 8px #B57BFF)" }}>🍄</span>
        )}
        {flowers.length >= 20 && (
          <div className="absolute inset-x-0 bottom-0 h-10"
            style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklab, #fff 8%, transparent))" }} />
        )}
        {flowers.length >= 5 && (
          <span className="absolute breathe" style={{ right: "12%", bottom: "30%", color: "#FFD580", fontSize: 12 }}>✦</span>
        )}
        {/* Planted flowers */}
        {flowers.map((f) => {
          const t = FLOWER_TYPES.find((x) => x.id === f.type) ?? FLOWER_TYPES[0];
          return (
            <button
              key={f.id}
              onClick={(e) => tapFlower(f, e)}
              className="absolute -translate-x-1/2 -translate-y-1/2 bloom-in"
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
              aria-label={t.name}
            >
              <StaticFlower type={f.type} glow={t.glow} size={42} />
            </button>
          );
        })}
      </div>

      {/* Flower type picker */}
      <div className="mt-4 paper-card p-3">
        <div className="hand text-base mb-2">pick a flower:</div>
        <div className="grid grid-cols-6 gap-2">
          {FLOWER_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`relative aspect-square grid place-items-center rounded-xl transition-all ${selectedType === t.id ? "scale-110" : "opacity-70 hover:opacity-100"}`}
              style={{
                background: "color-mix(in oklab, var(--dusk) 80%, transparent)",
                boxShadow: selectedType === t.id ? `0 0 0 2px ${t.glow}, 0 0 18px -2px ${t.glow}` : "none",
              }}
              aria-label={t.name}
            >
              <span style={{ width: 16, height: 16, borderRadius: 999, background: t.glow, filter: `drop-shadow(0 0 6px ${t.glow})` }} />
            </button>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: "var(--muted-foreground)" }}>
          tap the soil to plant. tap a flower to see if it has a note inside.
        </p>
      </div>

      {/* Fortune modal */}
      {activeFortune && (
        <div onClick={() => setActiveFortune(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm grid place-items-center z-50 p-6">
          <div onClick={(e) => e.stopPropagation()} className="paper-card p-6 max-w-sm bloom-in text-center">
            <div className="text-3xl mb-3">🌷</div>
            <p className="hand text-2xl" style={{ color: "var(--warmth)" }}>{activeFortune}</p>
            <button onClick={() => setActiveFortune(null)} className="mt-5 text-sm hand text-lg">close →</button>
          </div>
        </div>
      )}
    </RoomShell>
  );
}






function PostBloomCards() {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {POST_BLOOM_CARDS.map((c, i) => (
        <div
          key={i}
          className="paper-card px-4 py-3 flex items-center gap-3 drop-in"
          style={{
            animationDelay: `${i * 300}ms`, // stagger cards
            borderColor: `var(--${c.tone})`,
            boxShadow: `0 0 0 1px color-mix(in oklab, var(--${c.tone}) 35%, transparent) inset, 0 0 24px -6px color-mix(in oklab, var(--${c.tone}) 55%, transparent)`,
          }}
        >
          <span className="text-2xl">{c.emoji}</span>
          <span className="hand text-lg" style={{ color: "var(--warmth)" }}>{c.text}</span>
        </div>
      ))}
    </div>
  );
}






function StaticFlower({
  type,
  glow,
  size = 40,
  label,
}: {
  type: string;
  glow: string;
  size?: number;
  label?: string;
}) {
  return (
    <div
      title={label}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: glow,
        boxShadow: `0 0 ${size / 2}px ${glow}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size / 2,
      }}
    >
      🌷
    </div>
  );
}








function PromiseBloomSequence({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        fontSize: "80px",
        animation: "bloom 6s ease forwards",
      }}
    >
      🌷
    </div>
  );
}