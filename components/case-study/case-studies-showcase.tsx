"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CASE_STUDIES, FEATURED_CASE_STUDY_SLUGS, type CaseStudySlug } from "@/lib/case-studies-config";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function CaseStudiesShowcase() {
  return (
    <motion.ul
      className="space-y-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {FEATURED_CASE_STUDY_SLUGS.map((slug: CaseStudySlug) => {
        const cs = CASE_STUDIES[slug];
        return (
          <motion.li
            key={slug}
            variants={item}
            className="group relative"
            onMouseMove={(e) => {
              const t = e.currentTarget;
              const r = t.getBoundingClientRect();
              t.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
              t.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
            }}
          >
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/50 via-accent/40 to-primary/50 blur-sm"
              aria-hidden
            />
            <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 md:p-8 overflow-hidden transition-colors duration-300 group-hover:border-white/20">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(800px_circle_at_var(--sx,50%)_var(--sy,0%),hsl(var(--primary)/0.08),transparent_55%)]" />
              <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex gap-3">
                  <div className="mt-1 hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-primary group-hover:border-primary/30 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.25)] transition-all duration-300">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                      {cs.title}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                      {cs.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <Link
                    href={`/case-studies/${slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_28px_hsl(var(--primary)/0.45)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Read case study
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  {cs.recruiterSlug && (
                    <Link
                      href={`/case-studies/${cs.recruiterSlug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/5 hover:border-primary/30 transition-all"
                    >
                      Recruiter kit
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
