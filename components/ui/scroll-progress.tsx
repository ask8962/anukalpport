"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener("change", onMq);

    let raf = 0;
    const tick = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const next = max > 0 ? el.scrollTop / max : 0;
      setP((prev) => (Math.abs(prev - next) < 0.002 ? prev : next));
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        tick();
        raf = 0;
      });
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (reduced) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[10001] h-[3px] bg-black/40 pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full origin-left rounded-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_20px_hsl(var(--primary)/0.6)] transition-[scale] duration-150 ease-out"
        style={{ transform: `scaleX(${Math.min(1, Math.max(0, p))})` }}
      />
    </div>
  );
}
