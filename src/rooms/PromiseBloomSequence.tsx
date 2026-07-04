// Add this component (e.g. within Garden.tsx or a new file imported above)
interface PromiseBloomProps {
  x: number;
  y: number;
}
export function PromiseBloomSequence({ x, y }: PromiseBloomProps) {
  return (
    <>
      {/* Seed Pulse */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: 14,
          height: 14,
          borderRadius: 999,
          background: "#FFB4E8",
          boxShadow: "0 0 20px #FF9FE7, 0 0 40px #FF9FE7",
          animation: "seedPulse 1s ease-out forwards",
        }}
      />

      {/* Glowing Roots */}
      <svg
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: 200,
          height: 180,
          overflow: "visible",
        }}
      >
        {/* Left root */}
        <path
          d="M0 0 C-20 30 -40 60 -25 100"
          stroke="#FFB4E8"
          strokeWidth="2"
          fill="none"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300,
            animation: "rootGrow 1.2s ease-out 0.8s forwards",
          }}
        />
        {/* Right root */}
        <path
          d="M0 0 C20 30 40 60 25 100"
          stroke="#FFB4E8"
          strokeWidth="2"
          fill="none"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300,
            animation: "rootGrow 1.2s ease-out 0.9s forwards",
          }}
        />
        {/* Bottom root */}
        <path
          d="M0 0 C0 40 -10 70 0 130"
          stroke="#FFB4E8"
          strokeWidth="2"
          fill="none"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300,
            animation: "rootGrow 1.2s ease-out 1s forwards",
          }}
        />
      </svg>

      {/* Stem Growth */}
      <div
        style={{
          position: "absolute",
          left: `calc(${x}% - 4px)`,
          top: `${y - 28}%`,
          width: 8,
          height: 180,
          background: "linear-gradient(to top, #7FD48B, #C9FFD0)",
          borderRadius: 999,
          transformOrigin: "bottom",
          transform: "scaleY(0)",
          animation: "stemGrowMagic 1.2s ease-out 2s forwards",
          boxShadow: "0 0 15px #7FD48B",
        }}
      />

      {/* Flower Bloom (petals open) */}
      <div
        className="absolute"
        style={{
          left: `${x}%`,
          top: `${y - 35}%`,
          transform: "translate(-50%, -50%) scale(0)",
          animation: "flowerOpen 1.4s cubic-bezier(.22,1.3,.36,1) 3.2s forwards",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* 8 pink petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="70"
              cy="70"
              rx="22"
              ry="48"
              fill="#FFB4E8"
              transform={`rotate(${i * 45} 70 70)`}
            />
          ))}
          {/* Center */}
          <circle cx="70" cy="70" r="22" fill="#FFF4FD" />
        </svg>
      </div>

      {/* Pink Aura */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FFB4E8 0%, transparent 70%)",
          opacity: 0,
          animation: "pinkBloom 2s ease-out 3.5s forwards",
        }}
      />

      {/* Fireflies */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${35 + Math.random() * 30}%`,
            top: `${55 + Math.random() * 20}%`,
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "#FFEFA6",
            boxShadow: "0 0 10px #FFEFA6",
            opacity: 0,
            animation: `fireflyRise 5s ease-out ${4 + i * 0.1}s forwards`,
          }}
        />
      ))}
    </>
  );
}
