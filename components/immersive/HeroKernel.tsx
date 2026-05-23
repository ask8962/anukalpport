"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { DATA } from "@/lib/data";

const KernelField = dynamic(
  () => import("./KernelField").then((m) => m.KernelField),
  { ssr: false }
);

const METRICS = [
  { label: "Production reach", value: "500+" },
  { label: "DSA solved", value: "200+" },
  { label: "Multi-tenant SaaS", value: "Live" },
  { label: "AI surfaces", value: "Web · Ext" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroKernel() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-kernel-void pt-24">
      <KernelField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,hsl(var(--signal)/0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.p
            variants={item}
            className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-kernel-signal"
          >
            KERNEL · BACKEND · SYSTEMS · AI
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl font-black leading-[0.92] tracking-tighter text-foreground md:text-7xl lg:text-8xl"
          >
            I architect systems that{" "}
            <span className="text-gradient-kernel">survive production.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl"
          >
            {DATA.personalInfo.role} — {DATA.personalInfo.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <Magnetic className="w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="h-14 w-full rounded-full px-8 text-lg shadow-[0_0_32px_hsl(var(--signal)/0.35)] sm:w-auto bg-primary"
              >
                <Link href="#projects">View platforms</Link>
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 w-full rounded-full border-white/15 bg-white/5 px-8 text-lg sm:w-auto"
              >
                <Link href="/case-studies">Case studies</Link>
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a href={DATA.personalInfo.resumeUrl} download className="block w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 w-full rounded-full border-kernel-pulse/30 bg-kernel-pulse/5 px-8 text-lg hover:border-kernel-pulse/50 sm:w-auto"
                >
                  Download CV
                </Button>
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-colors hover:border-kernel-signal/30"
              >
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight text-foreground">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <button
        type="button"
        aria-label="Scroll to about"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/60 transition-colors hover:text-kernel-signal md:flex motion-reduce:hidden"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">Probe</span>
        <ChevronDown className="h-6 w-6 animate-scroll-hint" strokeWidth={1.5} />
      </button>
    </section>
  );
}
