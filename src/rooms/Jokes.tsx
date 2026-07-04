import { useState } from "react";
import { RoomShell } from "@/components/RoomShell";
import { EXHIBITS } from "@/data/content";

export function Jokes() {
  const [seed, setSeed] = useState(0);
  const shuffled = [...EXHIBITS].sort((a,b) => (a.name.charCodeAt(seed % 4) - b.name.charCodeAt((seed+1) % 4)));
  return (
    <RoomShell title="Reasons She's Suspicious" subtitle="case #027-MAKI. court is in session.">
      <div className="paper-card p-5 mb-5">
        <div className="joke-font text-2xl text-primary">THE PEOPLE vs. THE SUBJECT</div>
        <p className="hand text-lg text-muted-foreground mt-1">presiding judge: me. defense counsel: also me. court reporter: pip.</p>
      </div>

      <div className="grid gap-3">
        {shuffled.map((e, i) => (
          <div key={e.name+i} style={{ animationDelay: `${i*70}ms` }} className="drop-in paper-card p-4">
            <div className="font-display font-extrabold">{e.name}</div>
            <p className="text-sm mt-1 leading-relaxed">{e.body}</p>
            <div className="hand text-lg text-primary mt-2">verdict: {e.verdict}</div>
          </div>
        ))}
      </div>

      <button
        onClick={()=>setSeed(s=>s+1)}
        className="paper-card joke-font text-lg px-5 py-3 mt-6 mx-auto block soft-shimmer text-primary"
      >
        REOPEN CASE
      </button>
    </RoomShell>
  );
}
