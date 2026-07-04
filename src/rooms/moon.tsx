import { RoomShell } from "@/components/RoomShell";

const MESSAGES = [
  "you're here again.",
  "the moon noticed.",
  "she doesn't judge.",
  "she just listens.",
  "you don't have to say anything.",
  "rest for a minute.",
  "the night is patient.",
  "everything survives one more sunrise.",
];

export function Moon() {
  const message =
    MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return (
    <RoomShell
      title="Moon"
      subtitle="she's awake tonight."
    >
      <div
        className="paper-card p-10 text-center bloom-in"
        style={{ maxWidth: 500, margin: "0 auto" }}
      >
        <div
          style={{
            fontSize: 90,
            marginBottom: 20,
          }}
        >
          🌙
        </div>

        <p
          className="hand text-2xl"
          style={{ lineHeight: 1.8 }}
        >
          {message}
        </p>
      </div>
    </RoomShell>
  );
}