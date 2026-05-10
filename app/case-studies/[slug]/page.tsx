import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import {
  CASE_STUDIES,
  CASE_STUDY_SLUGS,
  getCaseStudyMarkdown,
  isCaseStudySlug,
  type CaseStudySlug,
} from "@/lib/case-studies";
import { CaseStudyMarkdown } from "@/components/case-study/case-study-markdown";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  if (!isCaseStudySlug(slug)) return { title: "Case study" };
  const cs = CASE_STUDIES[slug];
  return {
    title: `${cs.title} | Case study`,
    description: cs.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = params;
  if (!isCaseStudySlug(slug)) notFound();

  const meta = CASE_STUDIES[slug as CaseStudySlug];
  const content = await getCaseStudyMarkdown(slug as CaseStudySlug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <article className="relative max-w-3xl mx-auto px-6 py-12 md:py-16 pb-24">
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/case-studies" className="hover:text-primary transition-colors">
            Case studies
          </Link>
          {meta.parentSlug && (
            <>
              <span className="text-white/20">/</span>
              <Link href={`/case-studies/${meta.parentSlug}`} className="hover:text-primary transition-colors">
                {CASE_STUDIES[meta.parentSlug].title}
              </Link>
            </>
          )}
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{meta.title}</h1>
          <p className="text-muted-foreground leading-relaxed">{meta.description}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {meta.recruiterSlug && (
              <Link
                href={`/case-studies/${meta.recruiterSlug}`}
                className="text-xs font-medium uppercase tracking-wider text-primary hover:underline"
              >
                Recruiter one-pager →
              </Link>
            )}
            {meta.parentSlug && (
              <Link
                href={`/case-studies/${meta.parentSlug}`}
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-primary"
              >
                ← Full case study
              </Link>
            )}
          </div>
        </header>

        <CaseStudyMarkdown content={content} />
      </article>
    </main>
  );
}
