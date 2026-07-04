import { PromiseBloomSequence } from "@/components/PromiseBloomSequence";
import { useMemo, useState } from "react";

export function Garden() {
  const [started, setStarted] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const FLOWER_POSITION = {
    x: 50,
    y: 90,
  };

  const startBloom = () => {
    if (started) return;

    setStarted(true);

    setTimeout(() => {
      setShowMessages(true);
    }, 12000);
  };

  const messages = [
//    "i keep my promise",
//    "remember the day i told you about a flower",
//   "here is your flower",
//    "i'm still remembering you",
//    "i'm still here, just busy",
//    "smile cutee",
 //   "flower and you are both pretty",
  ];

  // fixed random positions (generated only once)
  const cardPositions = useMemo(
    () =>
      messages.map(() => ({
        left: 15 + Math.random() * 70,
        top: 12 + Math.random() * 58,
      })),
    []
  );

  return (
    <div
      onClick={startBloom}
      className="fixed inset-0 overflow-hidden cursor-pointer"
      style={{
        background: "#000",
        userSelect: "none",
      }}
    >
      {/* cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at center,
              rgba(255,90,190,.03) 0%,
              rgba(0,0,0,.15) 55%,
              rgba(0,0,0,.92) 100%)
          `,
        }}
      />

      {/* soft pink mist */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center bottom, rgba(255,70,170,.04), transparent 45%)",
          filter: "blur(80px)",
        }}
      />

      {/* back button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          history.back();
        }}
        style={{
          position: "absolute",
          top: 26,
          left: 26,
          zIndex: 200,
          color: "#ffffff",
          border: "none",
          background: "transparent",
          fontSize: 18,
          opacity: .7,
          cursor: "pointer",
          transition: ".3s",
        }}
      >
        ← Back
      </button>

      {/* tap text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: started ? 0 : 1,
          transition: "opacity 1.5s ease",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            color: "#ff86cf",
            fontSize: 28,
            letterSpacing: 4,
            textShadow:
              "0 0 12px #ff86cf,0 0 25px #ff86cf",
            animation: "breathe 4s ease-in-out infinite",
          }}
        >
          tap anywhere
        </div>
      </div>

      {started && (
        <PromiseBloomSequence
          x={FLOWER_POSITION.x}
          y={FLOWER_POSITION.y}
        />
      )}

      {showMessages &&
        messages.map((msg, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${cardPositions[i].left}%`,
              top: `${cardPositions[i].top}%`,
              transform: "translate(-50%,-50%)",
              padding: "14px 20px",
              maxWidth: 230,
              color: "#ffe3f5",
              fontSize: 15,
              lineHeight: 1.5,
              borderRadius: 18,
              border: "1px solid rgba(255,120,210,.8)",
              background: "rgba(15,0,20,.35)",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 0 25px rgba(255,90,190,.45), inset 0 0 12px rgba(255,120,210,.18)",
              animation:
                "fadeIn 2s ease forwards, floatCard 6s ease-in-out infinite",
            }}
          >
            {msg}
          </div>
        ))}
    </div>
  );
}