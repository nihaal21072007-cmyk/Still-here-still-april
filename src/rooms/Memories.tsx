import { useState } from "react";
import { RoomShell } from "@/components/RoomShell";
import { MEMORIES } from "@/data/content";

export function Memories() {
  const [open, setOpen] = useState<string | null>(null);
  const active = MEMORIES.find(m => m.id === open);
  return (
    <RoomShell title="Memory Archive" subtitle="a chest of inside moments. tap to open.">
      <div className="grid grid-cols-2 gap-3">
        {MEMORIES.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setOpen(m.id)}
            style={{ animationDelay: `${i*60}ms` }}
            className="drop-in paper-card p-3 text-left transition-transform hover:-translate-y-1"
          >
            <div
              className="rounded-xl aspect-[4/3] mb-2 flex items-end p-2"
              style={{ background: `linear-gradient(160deg, var(--color-${m.color}), color-mix(in oklab, var(--color-${m.color}) 50%, white))` }}
            >
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 text-foreground">{m.type}</span>
            </div>
            <div className="font-display font-bold text-sm leading-tight">{m.title}</div>
            <div className="hand text-base text-muted-foreground mt-1 line-clamp-2">{m.caption}</div>
          </button>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm grid place-items-center p-5 z-50"
        >
          <div onClick={e=>e.stopPropagation()} className="paper-card p-6 max-w-md w-full bloom-in">
            <div
              className="rounded-xl aspect-[4/3] mb-4"
              style={{ background: `linear-gradient(160deg, var(--color-${active.color}), color-mix(in oklab, var(--color-${active.color}) 50%, white))` }}
            />
            <h3 className="text-2xl font-extrabold">{active.title}</h3>
            <p className="hand text-xl text-muted-foreground mt-1">{active.caption}</p>
            {active.body && <p className="serif-letter text-base mt-4 leading-relaxed">{active.body}</p>}
            <button onClick={()=>setOpen(null)} className="mt-6 text-sm text-primary hand text-lg">close it gently →</button>
          </div>
        </div>
      )}
    </RoomShell>
  );
}
