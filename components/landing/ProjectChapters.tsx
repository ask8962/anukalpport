"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { DATA } from "@/lib/data";
import { PROJECT_CHAPTERS, PROJECT_TAGS, type ProjectItem } from "@/lib/project-chapters";
import { ChapterSection } from "@/components/immersive/ChapterSection";
import { Badge } from "@/components/ui/badge";

function resolveChapterProjects(titles: string[]): ProjectItem[] {
  return titles
    .map((title) => {
      const p = DATA.projects.find((x) => x.title === title);
      if (!p) return null;
      return {
        ...p,
        tag: PROJECT_TAGS[title] ?? "PRODUCTION",
      } satisfies ProjectItem;
    })
    .filter((x): x is ProjectItem => x !== null);
}

export function ProjectChapters() {
  return (
    <div id="projects" className="relative bg-background">
      <div className="absolute inset-0 z-0 bg-grid-white/[0.015] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-kernel-signal">Selected work</p>
          <h2 className="mt-3 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
            Systems I&apos;ve shipped
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg font-light">
            Three chapters — platforms, AI pipelines, and real-time products. Each built for scale, security, and
            measurable outcomes.
          </p>
        </motion.div>
      </div>

      {PROJECT_CHAPTERS.map((chapter) => (
        <ChapterSection
          key={chapter.id}
          id={`chapter-${chapter.id}`}
          label={chapter.label}
          title={chapter.title}
          subtitle={chapter.subtitle}
          description={chapter.description}
          projects={resolveChapterProjects(chapter.projectTitles)}
        />
      ))}

      <section className="relative border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-10">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Trophy className="h-7 w-7 text-kernel-pulse drop-shadow-[0_0_12px_hsl(var(--pulse)/0.5)]" />
            </motion.div>
            Achievements & Hackathons
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(DATA.certifications as { title: string; issuer: string; description: string; image?: string }[]).map(
              (cert, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 glass-panel transition-all duration-300 hover:border-kernel-signal/30 hover:shadow-[0_5px_40px_hsl(var(--signal)/0.12)]"
                  whileHover={{ y: -4 }}
                >
                  {cert.image && (
                    <div className="relative h-44 w-full overflow-hidden border-b border-white/5 bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h4 className="mb-3 text-lg font-bold text-foreground">{cert.title}</h4>
                    <Badge
                      variant="outline"
                      className="mb-4 w-fit border-kernel-signal/25 bg-kernel-signal/5 text-kernel-signal"
                    >
                      {cert.issuer}
                    </Badge>
                    <p className="mt-auto text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
