import { useEffect, useState } from "react";
import { PIP_GREETINGS } from "@/data/content";
import { usePipTaps, useDiscoveries } from "@/lib/state";

interface PipProps {
  visits?: number;
  message?: string;
  size?: number;
  mood?: "default" | "wink" | "small";
}

export function Pip({ visits = 1, message, size = 88, mood = "default" }: PipProps) {
  const [shown, setShown] = useState(false);
  const [bonk, setBonk] = useState(false);
  const { taps, tap } = usePipTaps();
  const { unlock } = useDiscoveries();

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 250);
    return () => clearTimeout(t);
  }, []);

  const greeting =
    taps >= 50
      ? "i've lost count how many times you've tapped me. it's fine. i forgive you."
      : (message ??
        (PIP_GREETINGS.find((g) => g.visit === visits)?.message ??
          PIP_GREETINGS.find((g) => g.visit === "default")!.message));

  const onTap = () => {
    tap();
    if (taps + 1 >= 50) unlock("pip_taps");
    setBonk(true);
    setTimeout(() => setBonk(false), 320);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onTap}
        aria-label="pip"
        className={`float-soft transition-transform ${bonk ? "scale-90" : ""}`}
        style={{
          width: size,
          height: size,
          filter: "drop-shadow(0 0 18px color-mix(in oklab, var(--periwinkle) 60%, transparent))",
        }}
      >
        <PipFace size={size} />
      </button>
      {mood !== "small" && (
        <div
          className={`paper-card hand text-lg px-4 py-2 max-w-[280px] text-center transition-all duration-500 ${
            shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {greeting}
        </div>
      )}
    </div>
  );
}

function PipFace({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <ellipse cx="50" cy="58" rx="34" ry="30" fill="var(--color-periwinkle)" />
      <ellipse cx="50" cy="86" rx="28" ry="4" fill="black" opacity="0.25" />
      <circle cx="28" cy="62" r="5" fill="var(--color-blush)" opacity="0.7" />
      <circle cx="72" cy="62" r="5" fill="var(--color-blush)" opacity="0.7" />
      <g className="pip-eye">
        <ellipse cx="38" cy="50" rx="5" ry="7" fill="#07071A" />
        <ellipse cx="62" cy="50" rx="5" ry="7" fill="#07071A" />
        <circle cx="40" cy="47" r="1.6" fill="white" />
        <circle cx="64" cy="47" r="1.6" fill="white" />
      </g>
      <path d="M44 62 Q50 67 56 62" fill="none" stroke="#07071A" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="14" cy="62" rx="5" ry="3" fill="var(--color-periwinkle)" />
      <ellipse cx="86" cy="62" rx="5" ry="3" fill="var(--color-periwinkle)" />
    </svg>
  );
}
