import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { CASE_STUDIES, FEATURED_CASE_STUDY_SLUGS, type CaseStudySlug } from "@/lib/case-studies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Anukalp Gupta",
  description: "Deep-dive write-ups on CampusHub, AI Code Explainer, FoodExpress, and recruiter-ready kits.",
};

export default function CaseStudiesIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-10 h-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Case studies</h1>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed mb-14 max-w-2xl">
          Long-form architecture and product notes, plus short recruiter kits (pitches, STAR stories, keywords).
        </p>

        <ul className="space-y-6">
          {FEATURED_CASE_STUDY_SLUGS.map((slug: CaseStudySlug) => {
            const cs = CASE_STUDIES[slug];
            return (
              <li key={slug}>
                <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 md:p-8 hover:border-primary/40 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight mb-2">{cs.title}</h2>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{cs.description}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                      <Link
                        href={`/case-studies/${slug}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        Read case study
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      {cs.recruiterSlug && (
                        <Link
                          href={`/case-studies/${cs.recruiterSlug}`}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
                        >
                          Recruiter kit
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
