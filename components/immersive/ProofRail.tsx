"use client";

const ITEMS = [
  "Java · Spring Boot",
  "Multi-Tenant SaaS",
  "Firebase · Firestore",
  "Groq LLM · Streaming",
  "Redis Rate Limits",
  "RBAC · JWT · 2FA",
  "JMeter Load Tests",
  "200+ DSA",
  "Next.js 14–16",
  "System Design",
];

export function ProofRail() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-kernel-surface/80 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex animate-marquee-kernel whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 flex items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/80"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-kernel-signal/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
