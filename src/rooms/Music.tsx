import { useRef, useState } from "react";
import { RoomShell } from "@/components/RoomShell";
import { SONGS } from "@/data/content";

export function Music() {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = (s: typeof SONGS[number]) => {
    if (!s.url) { setPlaying(playing === s.id ? null : s.id); return; }
    if (playing === s.id) { audioRef.current?.pause(); setPlaying(null); return; }
    if (audioRef.current) { audioRef.current.src = s.url; audioRef.current.play().catch(()=>{}); }
    setPlaying(s.id);
  };

  return (
    <RoomShell title="Music Box" subtitle="a menu. each song has a memory attached.">
      <audio ref={audioRef} onEnded={()=>setPlaying(null)} />
      <ul className="grid gap-3">
        {SONGS.map((s, i) => {
          const isPlaying = playing === s.id;
          return (
            <li key={s.id} style={{ animationDelay: `${i*70}ms` }} className="drop-in">
              <button onClick={()=>toggle(s)} className="paper-card w-full text-left p-4 flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
                <div className={`w-12 h-12 rounded-full grid place-items-center text-xl shrink-0 ${isPlaying ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  {isPlaying ? "❚❚" : "▶"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-extrabold truncate">{s.title}</div>
                  <div className="hand text-base text-muted-foreground">{s.note}</div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="hand text-base text-muted-foreground text-center mt-6">(placeholder tracks — real songs slot in later.)</p>
    </RoomShell>
  );
}
