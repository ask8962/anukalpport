"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
type Props = {
  title: string;
  tag: string;
  description: string;
  href: string;
  caseStudyHref?: string;
  metric: string;
  dates: string;
};

export function ProjectConstellationCard({
  title,
  tag,
  description,
  href,
  caseStudyHref,
  metric,
  dates,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 220, damping: 22 });

  return (
    <motion.article
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-7 backdrop-blur-xl md:p-8"
    >
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-r from-kernel-signal/25 to-kernel-pulse/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-kernel-signal">{tag}</span>
        <span className="font-mono text-[10px] text-muted-foreground/70">{dates}</span>
      </div>

      <h3
        className="mt-4 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-kernel-signal"
        style={{ transform: "translateZ(24px)" }}
      >
        {title}
      </h3>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted-foreground/90">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kernel-signal shadow-[0_0_8px_hsl(var(--signal))]" />
        {metric}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4" style={{ transform: "translateZ(32px)" }}>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-kernel-signal transition-colors"
        >
          Live site
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        {caseStudyHref && (
          <Link
            href={caseStudyHref}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Case study →
          </Link>
        )}
      </div>
    </motion.article>
  );
}
