export type SculptedPetalProps = {
  id: string;
  rotate: number;
  originY: number;
  nudgeX?: number;
  nudgeY?: number;
  scale?: number;
  shadow: string;
  body: string;
  edgeHighlight?: string;
  sheen?: string;
  veinCenter: string;
  veinLeft?: string;
  veinRight?: string;
  gloss?: GlossSpec;
  bodyOpacity?: number;
  fill?: string;
  extraVeins?: string[];
  neonRing?: boolean; // 👈 new prop — toggle violet neon on/off per petal
};

export function SculptedPetal({
  id,
  rotate,
  originY,
  nudgeX = 0,
  nudgeY = 0,
  scale = 1,
  shadow,
  body,
  edgeHighlight,
  sheen,
  veinCenter,
  veinLeft,
  veinRight,
  extraVeins = [],
  gloss,
  bodyOpacity = 1,
  fill = "url(#pb-petal-body)",
  neonRing = true, // 👈 on by default
}: SculptedPetalProps) {
  const transform = [
    nudgeX || nudgeY ? `translate(${nudgeX} ${nudgeY})` : "",
    `rotate(${rotate})`,
    scale !== 1 ? `scale(${scale})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <g
      id={id}
      transform={transform}
      style={{ transformOrigin: `0px ${originY}px` }}
    >
      {/* Drop shadow */}
      <path d={shadow} fill="#6b0f4a" opacity="0.16" transform="translate(2.5 4.5)" />

      {/* ✨ VIOLET NEON RING — outer glow pass, rendered BEFORE body so it sits behind */}
      {neonRing && (
        <path
          d={body}
          fill="none"
          stroke="#bf5fff"
          strokeWidth="3.5"
          strokeOpacity="0.55"
          filter="url(#pb-violet-neon)"
        />
      )}

      {/* Petal body */}
      <path
        d={body}
        fill={fill}
        filter="url(#pb-petal-glow)"
        opacity={bodyOpacity}
      />

      {/* Soft pink rim stroke */}
      <path
        d={body}
        fill="none"
        stroke="#ffd6f1"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        filter="url(#pb-petal-glow)"
      />

      {/* ✨ VIOLET NEON RING — inner crisp pass, rendered ON TOP of body for edge pop */}
      {neonRing && (
        <path
          d={body}
          fill="none"
          stroke="#d580ff"
          strokeWidth="1.2"
          strokeOpacity="0.75"
        />
      )}

      {edgeHighlight && (
        <path
          d={edgeHighlight}
          fill="none"
          stroke="url(#pb-petal-edge)"
          strokeWidth="1.4"
          strokeOpacity="0.35"
        />
      )}

      {sheen && <path d={sheen} fill="url(#pb-petal-sheen)" opacity="0.52" />}

      <path
        d={veinCenter}
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeOpacity="0.38"
        strokeLinecap="round"
      />

      {veinLeft && (
        <path
          d={veinLeft}
          fill="none"
          stroke="#fff"
          strokeWidth="0.95"
          strokeOpacity="0.17"
          strokeLinecap="round"
        />
      )}

      {veinRight && (
        <path
          d={veinRight}
          fill="none"
          stroke="#fff"
          strokeWidth="0.95"
          strokeOpacity="0.17"
          strokeLinecap="round"
        />
      )}

      {extraVeins.map((vein, i) => (
        <path
          key={i}
          d={vein}
          fill="none"
          stroke="#fff"
          strokeWidth="0.8"
          strokeOpacity="0.12"
          strokeLinecap="round"
        />
      ))}

      {gloss && (
        <ellipse
          cx={gloss.cx}
          cy={gloss.cy}
          rx={gloss.rx}
          ry={gloss.ry}
          fill="#fff"
          opacity={gloss.opacity ?? 0.2}
        />
      )}
    </g>
  );
}