"use client";

import { motion } from "framer-motion";
import { ProjectConstellationCard } from "./ProjectConstellationCard";
import type { ProjectItem } from "@/lib/project-chapters";

type Props = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  projects: ProjectItem[];
};

export function ChapterSection({ id, label, title, subtitle, description, projects }: Props) {
  return (
    <section id={id} className="relative border-t border-white/5 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,hsl(var(--signal)/0.06),transparent_50%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-16 md:sticky md:top-28 md:z-10 md:mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-kernel-signal">{label}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{subtitle}</p>
          <h2 className="mt-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">{description}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <ProjectConstellationCard
                title={p.title}
                tag={p.tag}
                description={p.description}
                href={p.link}
                caseStudyHref={
                  p.caseStudySlug ? `/case-studies/${p.caseStudySlug}` : undefined
                }
                metric={p.metrics[0] ?? ""}
                dates={p.dates}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
