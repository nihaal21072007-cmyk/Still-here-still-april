import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import HoldArea from "@/components/carry/HoldArea";
import Bao, { BaoHandle } from "@/components/carry/bao";
import Paper, { PaperHandle } from "@/components/carry/Paper";
import Trash, { TrashHandle } from "@/components/carry/Trash";
import CarryDirector from "@/components/carry/CarryDirector";

export function Worries() {
  const baoRef = useRef<BaoHandle>(null);
  const director = useRef<CarryDirector | null>(null);
  const paperRef = useRef<PaperHandle>(null);
  const trashRef = useRef<TrashHandle>(null);

  const [phase, setPhase] = useState<"fixed" | "random">("fixed");
  const [paperIndex, setPaperIndex] = useState(0);

  const [jumpUnlocked, setJumpUnlocked] = useState(false);
  const isJumpMode = jumpUnlocked;

  const [finger, setFinger] = useState({
    x: 0,
    y: 0,
  });

  const [holding, setHolding] = useState(false);

  // 👇 Show the hint when the page first loads
  const [showHint, setShowHint] = useState(true);

 

const PAPERS = [
  "Stress",
  "Overthinking",
  "Anxiety",
  "Fear",
  "Loneliness",
  "Regret",
  "Pressure",
  "Burnout",
  "Self Doubt",
  "Guilt",
  "Shame",
  "Anger",
  "Frustration",
  "Jealousy",
  "Envy",
  "Heartbreak",
  "Rejection",
  "Failure",
  "Disappointment",
  "Insecurity",
  "Hopelessness",
  "Confusion",
  "Exhaustion",
  "Panic",
  "Worry",
  "Grief",
  "Sadness",
  "Emptiness",
  "Pain",
  "Trauma",
  "Loss",
  "Perfectionism",
  "Comparison",
  "Overthinking the Future",
  "Past Mistakes",
  "Negative Thoughts",
  "Self Criticism",
  "People Pleasing",
  "Toxic Memories",
  "Broken Trust",
  "Betrayal",
  "Uncertainty",
  "Imposter Syndrome",
  "Social Anxiety",
  "Procrastination",
  "Lack of Motivation",
  "Financial Stress",
  "Academic Pressure",
  "Work Pressure",
  "Family Problems",
  "Relationship Problems",
  "Sleepless Nights",
  "Overwhelm",
  "Doubt",
  "Isolation",
  "Feeling Lost",
  "Fear of Failure",
  "Fear of Judgment",
  "Fear of Change",
  "Inner Chaos",
];

  const RANDOM_PAPERS = [
    "Anxiety",
    "Fear",
    "Loneliness",
    "Regret",
    "Pressure",
    "Burnout",
    "Self Doubt",
    "Guilt",
  ];

  const currentPaper =
    phase === "fixed"
      ? PAPERS[paperIndex]
      : RANDOM_PAPERS[paperIndex % RANDOM_PAPERS.length];

const nextPaper = () => {
  setPaperIndex((current) => {
    if (phase === "fixed") {
      if (current === 0) {
        setShowHint(true);
        setJumpUnlocked(true);
        return 1;
      }

      if (current < PAPERS.length - 1) {
        return current + 1;
      }

      setPhase("random");
      return 0;
    }

    return current + 1;
  });
};
  useEffect(() => {
    if (
      baoRef.current &&
      paperRef.current &&
      trashRef.current &&
      !director.current
    ) {
      director.current = new CarryDirector(
        baoRef.current,
        paperRef.current,
        trashRef.current,
        nextPaper
      );
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <button
        onClick={() => window.history.back()}
        className="absolute z-50 top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
      >
        <ArrowLeft size={22} />
      </button>

      {/* Center Hint */}
{/* Center Hint */}
<div
  className={`pointer-events-none absolute inset-0 z-40 flex items-center justify-center transition-opacity duration-500 ${
    showHint ? "opacity-100" : "opacity-0"
  }`}
>
  <p
    className="text-center text-2xl font-medium text-blue-300 animate-pulse"
    style={{
      textShadow: "0 0 10px #54f3fb, 0 0 20px #FFD54A",
    }}
  >
    {jumpUnlocked ? "Spam Maki" : "Tap or hold your finger"}
  </p>
</div>

      <HoldArea
        onHoldStart={(point) => {


          // Hide the hint after the first interaction
          setShowHint(false);

          setHolding(true);
          setFinger(point);

          

          if (isJumpMode) {
            director.current?.jumpCapture(currentPaper, point, {
              x: window.innerWidth - 80,
              y: window.innerHeight - 140,
            });
          } else {
            director.current?.start(currentPaper, point);
          }
        }}
        onHoldMove={(point) => {
          setFinger(point);
          director.current?.update(point);
        }}
        onHoldEnd={() => {
          setHolding(false);
          director.current?.stop();
        }}
      >
        <Trash ref={trashRef} />

        <Bao ref={baoRef} />

        <Paper
          ref={paperRef}
          text={currentPaper}
        />
      </HoldArea>
    </div>
  );
}