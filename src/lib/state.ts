import { useEffect, useState, useCallback } from "react";

const VISITS_KEY = "stillhere.visits";
const LAST_VISIT_KEY = "stillhere.last_visit";
export function useVisits() {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISITS_KEY);
      const last = localStorage.getItem(LAST_VISIT_KEY);

      console.log("VISITS DEBUG", {
        raw,
        last,
        origin: window.location.origin,
      });

      const now = Date.now();
      const SIX_HOURS = 6 * 60 * 60 * 1000;

      let n = raw ? parseInt(raw, 10) || 0 : 0;

      if (!last || now - parseInt(last, 10) > SIX_HOURS) {
        n += 1;
        localStorage.setItem(VISITS_KEY, String(n));
        localStorage.setItem(LAST_VISIT_KEY, String(now));
      }

      setVisits(n);
    } catch (e) {
      console.error(e);
      setVisits(1);
    }
  }, []);

  return visits;
}
// ----- Generic localStorage hook -----
function usePersisted<T>(key: string, initial: T): [T, (next: T | ((p: T) => T)) => void] {
  const [val, setVal] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setVal(JSON.parse(raw));
    } catch {}
  }, [key]);
  const save = useCallback((next: T | ((p: T) => T)) => {
    setVal((prev) => {
      const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
      return v;
    });
  }, [key]);
  return [val, save];
}

// ----- Garden -----
export type PlantedFlower = {
  id: string;
  type: string;
  x: number; // 0..100 %
  y: number; // 0..100 %
  plantedAt: number;
  message?: string | null;
};

export function useGarden() {
  const [flowers, setFlowers] = usePersisted<PlantedFlower[]>("stillhere.garden.flowers", []);
  const [bloomed, setBloomed] = usePersisted<boolean>("stillhere.garden.promiseBloomed", false);
  return { flowers, setFlowers, bloomed, setBloomed };
}

// ----- Discoveries -----
export function useDiscoveries() {
  const [list, setList] = usePersisted<string[]>("stillhere.discoveries", []);
  const has = (id: string) => list.includes(id);
  const unlock = (id: string) => {
    setList((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  return { list, has, unlock };
}

// ----- Pip taps -----
export function usePipTaps() {
  const [taps, setTaps] = usePersisted<number>("stillhere.pip.taps", 0);
  return { taps, tap: () => setTaps((t) => t + 1) };
}

// ----- I'll Carry It progress -----
export function useCarryProgress() {
  const [completed, setCompleted] = usePersisted<number>("stillhere.carry.completed", 0);
  return { completed, bump: () => setCompleted((c) => c + 1) };
}

// ----- Night detection (always-night UI, but reports real night for moonflower etc.) -----
export function useIsNight() {
  const [night, setNight] = useState(true);
  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setNight(h >= 21 || h < 5);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return night;
}
