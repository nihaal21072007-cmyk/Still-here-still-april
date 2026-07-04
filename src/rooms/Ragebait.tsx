import { useState } from "react";
import { RoomShell } from "@/components/RoomShell";
import { RAGEBAIT } from "@/data/content";

export function Ragebait() {
  const [i, setI] = useState(0);
  const opinion = RAGEBAIT[i % RAGEBAIT.length];
  return (
    <RoomShell title="Ragebait Engine" subtitle="opinions designed, lovingly, to ruin your afternoon.">
      <div key={i} className="paper-card p-8 text-center bloom-in min-h-[220px] grid place-items-center">
        <p className="joke-font text-3xl leading-snug text-primary">{opinion}</p>
      </div>
      <button
        onClick={()=>setI(v => v + 1 + Math.floor(Math.random()*RAGEBAIT.length))}
        className="paper-card w-full py-4 mt-5 font-display font-extrabold text-lg soft-shimmer text-primary"
      >
        next take →
      </button>
      <p className="hand text-base text-muted-foreground text-center mt-4">no, i will not be apologising.</p>
    </RoomShell>
  );
}
