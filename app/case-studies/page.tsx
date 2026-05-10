import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { CaseStudiesShowcase } from "@/components/case-study/case-studies-showcase";

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

        <CaseStudiesShowcase />
      </div>
    </main>
  );
}
