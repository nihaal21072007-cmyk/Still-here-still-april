import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Pip } from "@/components/Pip";
import { ROOMS, SITE, TIME_GREETINGS } from "@/data/content";
import { useVisits } from "@/lib/state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STILL HERE" },
      { name: "description", content: "A hidden garden that exists only at night." },
    ],
  }),
  component: Hub,
});

function Hub() {
  const visits = useVisits();
  const [entered, setEntered] = useState(false);

  const timeMessage = useMemo(() => {
    const h = new Date().getHours();
    const found = TIME_GREETINGS.find((g) =>
      g.from < g.to ? h >= g.from && h < g.to : h >= g.from || h < g.to,
    );
    return found?.msg ?? "";
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("stillhere.entered") === "1") setEntered(true);
  }, []);

  if (!entered) {
    return <Door onOpen={() => { sessionStorage.setItem("stillhere.entered", "1"); setEntered(true); }} />;
  }

  return <Scene visits={visits} timeMessage={timeMessage} />;
}

/* ============================================================
   THE SCENE — painted midnight garden with landmark entrances.
   No nav bar. No card grid. The world IS the navigation.
   ============================================================ */
function Scene({ visits, timeMessage }: { visits: number; timeMessage: string }) {
  const navigate = useNavigate();
  const firstVisit = visits <= 1;
  const go = (slug: string) => navigate({ to: "/$room" as never, params: { room: slug } as never });

  const land = (slug: string) => ROOMS.find((r) => r.slug === slug);

  return (
    <div className="min-h-screen relative overflow-x-hidden overflow-y-auto">
      {/* Painted ground & horizon (sits above starfield, below content) */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
        {/* Distant hills */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: "32vh", height: "20vh",
          background: "radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in oklab, var(--twilight) 90%, transparent) 0%, transparent 70%)",
          filter: "blur(2px)",
        }} />
        {/* Ground */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "32vh",
          background: "linear-gradient(180deg, color-mix(in oklab, var(--midnight) 70%, transparent), color-mix(in oklab, var(--void) 95%, transparent) 80%)",
        }} />
        {/* Ground mist */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: "20vh", height: "14vh",
          background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--moonlight) 9%, transparent))",
          filter: "blur(14px)",
        }} />
        {/* Path */}
        <svg viewBox="0 0 400 300" preserveAspectRatio="none" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: "34vh" }}>
          <defs>
            <linearGradient id="pathG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1D1750" stopOpacity="0" />
              <stop offset="60%" stopColor="#2B2268" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3A2E7A" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path d="M180 0 Q 195 90 175 170 Q 150 230 200 300 L 220 300 Q 240 230 215 170 Q 205 90 220 0 Z" fill="url(#pathG)" />
        </svg>
      </div>

      {/* Title — floats as part of the world */}
      <header className="relative z-10 text-center pt-12 sm:pt-16 px-5 fade-in">
        <h1
          className="display-title glow text-5xl sm:text-7xl"
          style={{
            color: "var(--moonlight)",
            textShadow: "0 0 30px color-mix(in oklab, var(--moonlight) 55%, transparent), 0 0 60px color-mix(in oklab, var(--moonlight) 25%, transparent)",
            letterSpacing: "-0.03em",
          }}
        >
          {SITE.name === "STILL HERE" ? "Still Here" : SITE.name}
        </h1>
        <p className="hand text-xl mt-3" style={{ color: "var(--candle-amber)" }}>
          {firstVisit ? "tap a landmark to enter" : timeMessage || "the garden remembers you."}
        </p>
        <p className="label-micro mt-3">visit no. {visits} · for {SITE.forName.toLowerCase()}</p>
      </header>

      {/* Pip tucked into the scene near the path */}
      <div className="relative z-10 flex justify-center mt-6">
        <div className="scale-90 sm:scale-100">
          <Pip visits={visits} />
        </div>
      </div>

      {/* Landmark grid — painted as scattered points in the world */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 mt-8 pb-32">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {([
            "garden",
            "worries",
            "letters"
           ] as const).map((slug, i) => {
            const r = land(slug)!;
            return (
              <button
                key={slug}
                onClick={() => go(slug)}
                style={{ animationDelay: `${i * 90}ms` }}
                className="drop-in group relative text-left focus:outline-none"
                aria-label={r.title}
              >
                <Landmark kind={r.landmark!} firstVisit={firstVisit} />
                <div className="mt-2 text-center">
                  <div className="display-title text-lg sm:text-xl" style={{ color: "var(--moonbeam-white)" }}>
                    {r.title}
                  </div>
                  <div className="hand text-base mt-0.5" style={{ color: "var(--candle-amber)", opacity: 0.85 }}>
                    {r.blurb}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="hand text-center mt-10 text-lg" style={{ color: "var(--whisper)" }}>
          (psst — there are things hidden in here. wander.)
        </p>
        <p className="label-micro text-center mt-6">still here. still april.</p>
      </div>
    </div>
  );
}

/* ============================================================
   LANDMARKS — illustrated SVG entrances. No cards.
   ============================================================ */
function Landmark({ kind, firstVisit }: { kind: string; firstVisit: boolean }) {
  const pulse = firstVisit ? "lock-pulse" : "";
  const common = "relative w-full aspect-square max-w-[180px] mx-auto transition-transform group-hover:-translate-y-1 group-active:translate-y-0";
  switch (kind) {
    case "arch":     return <ArchSVG className={`${common} ${pulse}`} />;
    case "mailbox":  return <MailboxSVG className={`${common} ${pulse}`} />;
    case "chest":    return <ChestSVG className={`${common} ${pulse}`} />;
    case "cottage":  return <CottageSVG className={`${common} ${pulse}`} />;
    case "tower":    return <TowerSVG className={`${common} ${pulse}`} />;
    case "hollow":   return <HollowSVG className={`${common} ${pulse}`} />;
    default:         return <div className={common} />;
  }
}

const ArchSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none">
    <defs>
      <radialGradient id="archGlow" cx="50%" cy="60%" r="55%">
        <stop offset="0%" stopColor="#FF7B5C" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#FFB4C8" stopOpacity="0.25" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="100" rx="55" ry="12" fill="url(#archGlow)" />
    <path d="M28 100 V 55 Q 60 18 92 55 V 100" stroke="#6B4A33" strokeWidth="5" fill="none" strokeLinecap="round" />
    <rect x="25" y="100" width="8" height="14" fill="#5C3D2E" />
    <rect x="87" y="100" width="8" height="14" fill="#5C3D2E" />
    {/* glow inside arch */}
    <ellipse cx="60" cy="80" rx="28" ry="35" fill="url(#archGlow)" />
    {/* flowers on arch */}
    <circle cx="40" cy="48" r="3.5" fill="#FF7B5C" />
    <circle cx="50" cy="32" r="3" fill="#FFB4C8" />
    <circle cx="60" cy="26" r="3.5" fill="#C8A8E9" />
    <circle cx="70" cy="32" r="3" fill="#FFD166" />
    <circle cx="80" cy="48" r="3.5" fill="#FF7B5C" />
  </svg>
);

const MailboxSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none">
    <defs>
      <radialGradient id="mailGlow" cx="60%" cy="40%" r="40%">
        <stop offset="0%" stopColor="#E8E4FF" stopOpacity="0.55" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="105" rx="40" ry="6" fill="#0B0924" />
    {/* post */}
    <rect x="56" y="60" width="8" height="50" fill="#5C3D2E" />
    {/* box */}
    <rect x="32" y="42" width="56" height="34" rx="14" fill="#3A2E2A" stroke="#1A1208" strokeWidth="1.5" />
    <rect x="32" y="42" width="56" height="6" rx="3" fill="#5C3D2E" />
    {/* flag up */}
    <rect x="86" y="46" width="2" height="14" fill="#5C3D2E" />
    <path d="M88 46 L 96 50 L 88 54 Z" fill="#FF7B5C" />
    {/* envelopes sticking out */}
    <rect x="44" y="36" width="16" height="10" fill="#FFF5E4" transform="rotate(-6 52 41)" />
    <rect x="58" y="34" width="16" height="10" fill="#FDF6E3" transform="rotate(4 66 39)" />
    <ellipse cx="60" cy="58" rx="36" ry="20" fill="url(#mailGlow)" />
  </svg>
);

const ChestSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none">
    <defs>
      <radialGradient id="chestGlow" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stopColor="#FFE566" stopOpacity="0.45" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="100" rx="40" ry="6" fill="#0B0924" />
    {/* chest base */}
    <rect x="22" y="60" width="76" height="42" rx="3" fill="#5C3D2E" stroke="#2D1B00" strokeWidth="1.5" />
    {/* lid */}
    <path d="M22 60 Q 60 38 98 60 L 98 70 L 22 70 Z" fill="#6B4A33" stroke="#2D1B00" strokeWidth="1.5" />
    {/* iron bands */}
    <rect x="22" y="68" width="76" height="3" fill="#1A1208" />
    <rect x="22" y="92" width="76" height="3" fill="#1A1208" />
    {/* lock */}
    <rect x="54" y="72" width="12" height="14" rx="2" fill="#D4AC30" />
    <circle cx="60" cy="79" r="1.5" fill="#1A1208" />
    <ellipse cx="60" cy="80" rx="34" ry="14" fill="url(#chestGlow)" />
  </svg>
);

const CottageSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none">
    <defs>
      <radialGradient id="cottGlow" cx="50%" cy="55%" r="35%">
        <stop offset="0%" stopColor="#FFB347" stopOpacity="0.7" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="105" rx="45" ry="6" fill="#0B0924" />
    {/* roof */}
    <path d="M22 65 L 60 30 L 98 65 Z" fill="#5C3D2E" stroke="#2D1B00" strokeWidth="1.5" />
    {/* body */}
    <rect x="28" y="62" width="64" height="44" fill="#7A5C44" stroke="#2D1B00" strokeWidth="1.5" />
    {/* window — round, glowing */}
    <circle cx="60" cy="80" r="11" fill="#13103A" stroke="#2D1B00" strokeWidth="1.5" />
    <circle cx="60" cy="80" r="8" fill="#FFB347" />
    <circle cx="60" cy="80" r="22" fill="url(#cottGlow)" />
    {/* door */}
    <rect x="44" y="90" width="10" height="16" fill="#3A2E2A" />
    <rect x="66" y="90" width="10" height="16" fill="#3A2E2A" />
    {/* chimney */}
    <rect x="78" y="34" width="8" height="14" fill="#5C3D2E" />
  </svg>
);

const TowerSVG = ({ className }: { className?: string }) => {
  const isBirthday = (() => {
    const d = new Date();
    return d.getMonth() === 7 && d.getDate() === 27; // Aug 27
  })();
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id="towerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={isBirthday ? "#FFD700" : "#FFB347"} stopOpacity={isBirthday ? "0.7" : "0.35"} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="32" ry="5" fill="#0B0924" />
      {/* base */}
      <rect x="42" y="50" width="36" height="56" fill="#3A2E2A" stroke="#1A1208" strokeWidth="1.5" />
      {/* clock face */}
      <circle cx="60" cy="68" r="11" fill="#FDF6E3" stroke="#2D1B00" strokeWidth="1.5" />
      <line x1="60" y1="68" x2="60" y2="61" stroke="#1A1208" strokeWidth="1.5" />
      <line x1="60" y1="68" x2="65" y2="68" stroke="#1A1208" strokeWidth="1.5" />
      {/* roof */}
      <path d="M40 50 L 60 34 L 80 50 Z" fill="#5C3D2E" />
      {/* lock or glow */}
      {!isBirthday ? (
        <g className="lock-pulse">
          <rect x="55" y="86" width="10" height="10" rx="1.5" fill="#D4AC30" />
          <path d="M57 86 V 82 Q 60 78 63 82 V 86" stroke="#D4AC30" strokeWidth="1.5" fill="none" />
        </g>
      ) : (
        <rect x="50" y="86" width="20" height="14" fill="#FFD700" opacity="0.85" />
      )}
      <ellipse cx="60" cy="68" rx="30" ry="36" fill="url(#towerGlow)" />
      <text x="60" y="118" textAnchor="middle" fontSize="7" fill="#B8B0D8" fontFamily="DM Sans">aug 27</text>
    </svg>
  );
};

const HollowSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none">
    <defs>
      <radialGradient id="hollowGlow" cx="50%" cy="60%" r="35%">
        <stop offset="0%" stopColor="#FF7B5C" stopOpacity="0.45" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="108" rx="44" ry="6" fill="#0B0924" />
    {/* tree trunk */}
    <path d="M20 108 Q 30 50 50 30 Q 60 22 70 30 Q 90 50 100 108 Z" fill="#3A2E2A" stroke="#1A1208" strokeWidth="1.5" />
    {/* tiny door */}
    <path d="M50 100 V 76 Q 60 68 70 76 V 100 Z" fill="#1A0F08" stroke="#2D1B00" strokeWidth="1" />
    <ellipse cx="60" cy="88" rx="20" ry="22" fill="url(#hollowGlow)" />
    <circle cx="66" cy="86" r="0.8" fill="#D4AC30" />
    {/* roots */}
    <path d="M22 105 Q 35 102 45 106" stroke="#2D1B00" strokeWidth="1.2" fill="none" />
    <path d="M75 106 Q 88 102 98 105" stroke="#2D1B00" strokeWidth="1.2" fill="none" />
  </svg>
);

/* ============================================================
   The Door — the entrance to the world
   ============================================================ */
function Door({ onOpen }: { onOpen: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
      <p className="hand text-2xl mb-3 drop-in" style={{ color: "var(--candle-amber)" }}>
        a hidden garden that exists only at night.
      </p>
      <h1
        className="display-title text-6xl sm:text-7xl mb-12 drop-in glow"
        style={{
          animationDelay: "120ms",
          color: "var(--moonlight)",
          textShadow: "0 0 40px color-mix(in oklab, var(--moonlight) 60%, transparent), 0 0 90px color-mix(in oklab, var(--moonlight) 25%, transparent)",
        }}
      >
        Still Here
      </h1>
      <button
        onClick={() => { setPressed(true); setTimeout(onOpen, 450); }}
        className={`wooden-sign px-8 py-4 text-lg transition-all soft-shimmer ${pressed ? "scale-95 opacity-50" : "hover:scale-[1.03]"}`}
        style={{ fontFamily: "var(--font-display)", color: "var(--parchment)", fontWeight: 500 }}
      >
        Open The Door
      </button>
      <p className="label-micro mt-10 max-w-xs">made for one person. (yes you. don't look around.)</p>
    </div>
  );
}
