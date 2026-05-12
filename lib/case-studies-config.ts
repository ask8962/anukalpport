export type CaseStudySlug =
  | "campushub"
  | "campushub-recruiter"
  | "ai-code-explainer"
  | "ai-code-explainer-recruiter"
  | "foodexpress"
  | "foodexpress-recruiter";

export type CaseStudyMeta = {
  title: string;
  description: string;
  file: string;
  parentSlug?: CaseStudySlug;
  recruiterSlug?: CaseStudySlug;
};

export const CASE_STUDIES: Record<CaseStudySlug, CaseStudyMeta> = {
  campushub: {
    title: "CampusHub",
    description: "Multi-tenant campus engagement SaaS — architecture, security, and product scope.",
    file: "campushub.md",
    recruiterSlug: "campushub-recruiter",
  },
  "campushub-recruiter": {
    title: "CampusHub — Recruiter kit",
    description: "Pitches, STAR stories, and interview prep for CampusHub.",
    file: "campushub-recruiter-kit.md",
    parentSlug: "campushub",
  },
  "ai-code-explainer": {
    title: "AI Code Explainer",
    description: "LLM-powered explain / optimize / flowchart platform across web and extensions.",
    file: "ai-code-explainer.md",
    recruiterSlug: "ai-code-explainer-recruiter",
  },
  "ai-code-explainer-recruiter": {
    title: "AI Code Explainer — Recruiter kit",
    description: "Short pitches and interview prep for the AI Code Explainer project.",
    file: "ai-code-explainer-recruiter-kit.md",
    parentSlug: "ai-code-explainer",
  },
  foodexpress: {
    title: "FoodExpress",
    description: "Multi-role food delivery — Firebase, real-time orders, and RBAC.",
    file: "foodexpress.md",
    recruiterSlug: "foodexpress-recruiter",
  },
  "foodexpress-recruiter": {
    title: "FoodExpress — Recruiter kit",
    description: "Elevator pitches and STAR stories for FoodExpress.",
    file: "foodexpress-recruiter-kit.md",
    parentSlug: "foodexpress",
  },
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES) as CaseStudySlug[];

export const FEATURED_CASE_STUDY_SLUGS: CaseStudySlug[] = ["campushub", "ai-code-explainer", "foodexpress"];

export function isCaseStudySlug(s: string): s is CaseStudySlug {
  return s in CASE_STUDIES;
}
