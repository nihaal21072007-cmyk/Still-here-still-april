import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

export function RoomShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen px-5 pt-6 pb-24 max-w-2xl mx-auto relative">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="hand text-xl hover:opacity-80" style={{ color: "var(--warmth)" }}>← back to the hub</Link>
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>still here.</span>
      </div>
      <header className="mb-8 drop-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold">{title}</h1>
        {subtitle && <p className="hand text-xl mt-1" style={{ color: "var(--warmth)" }}>{subtitle}</p>}
      </header>
      {children}
    </div>
  );
}
