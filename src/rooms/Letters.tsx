import { useState } from "react";
import { RoomShell } from "@/components/RoomShell";
import { LETTERS } from "@/data/content";
import { useGarden, useDiscoveries } from "@/lib/state";

const GLOW_MAP: Record<string, string> = {
  warm:  "color-mix(in oklab, var(--warmth) 35%, transparent)",
  gold:  "color-mix(in oklab, var(--firefly) 45%, transparent)",
  sage:  "color-mix(in oklab, var(--sage) 35%, transparent)",
  teal:  "color-mix(in oklab, var(--teal) 35%, transparent)",
};

export function Letters() {
 //const visits = useVisits();
  const { flowers } = useGarden();
  const { unlock } = useDiscoveries();
  const month = new Date().getMonth() + 1;
  const [open, setOpen] = useState<string | null>(null);

const isUnlocked = (_: any) => true;


  const active = LETTERS.find((l) => l.id === open);

  const openLetter = (id: string) => {
    setOpen(id);
    if (id === "l3") unlock("letter_l3");
    if (id === "l5") unlock("letter_built");
  };

  return (
    <RoomShell title="Letter Vault" subtitle="some open now. some when you've come back enough.">
      <div className="grid gap-4">
        {LETTERS.map((l: any, i) => {
          const unlocked = isUnlocked(l);
          const glow = GLOW_MAP[l.glow ?? "warm"];
          
const lockReason = "";

          return (
            <button
              key={l.id}
              disabled={false}
              onClick={() => unlocked && openLetter(l.id)}
              style={{
                animationDelay: `${i * 80}ms`,
                boxShadow: unlocked
                  ? `0 0 0 1px ${glow} inset, 0 0 30px -10px ${glow}`
                  : undefined,
              }}
              className={`drop-in paper-card p-5 text-left transition-transform ${unlocked ? "hover:-translate-y-1" : "opacity-50"}`}
            >
              <div className="flex items-start justify-between gap-3">
               <div className="text-3xl">✉️</div>
                <div className="hand text-base" style={{ color: "var(--muted-foreground)" }}>
                 open me
                </div>
              </div>
              <div className="font-display font-extrabold text-xl mt-2">{l.title}</div>
              <div className="hand text-lg mt-1" style={{ color: "var(--warmth)" }}>{l.preview}</div>
            </button>
          );
        })}
      </div>

      {active && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div
            onClick={(e) => e.stopPropagation()}
            className="paper-card p-7 max-w-lg w-full bloom-in"
            style={{
              background: "linear-gradient(180deg, color-mix(in oklab, var(--midnight) 90%, transparent), color-mix(in oklab, var(--nebula) 80%, transparent))",
              boxShadow: `0 0 0 1px ${GLOW_MAP[(active as any).glow ?? "warm"]} inset, 0 0 60px -10px ${GLOW_MAP[(active as any).glow ?? "warm"]}`,
            }}
          >
            <div className="hand text-xl" style={{ color: "var(--warmth)" }}>{active.preview}</div>
            <h3 className="text-3xl font-extrabold mt-1 mb-4">{active.title}</h3>
            <pre className="serif-letter whitespace-pre-wrap text-base leading-relaxed">{active.body}</pre>
            <button onClick={() => setOpen(null)} className="mt-6 text-sm hand text-lg">fold it back up →</button>
          </div>
        </div>
      )}
    </RoomShell>
  );
}
