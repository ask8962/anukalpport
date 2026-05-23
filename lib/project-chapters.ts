import type { ProjectCaseStudySlug } from "./data";

export type ProjectChapterId = "platform" | "ai" | "marketplace";

export type ProjectChapter = {
  id: ProjectChapterId;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  projectTitles: string[];
};

export const PROJECT_CHAPTERS: ProjectChapter[] = [
  {
    id: "platform",
    label: "CHAPTER I",
    title: "Platform Engineering",
    subtitle: "MULTI-TENANT · SPRING · DATA LAYER",
    description:
      "Production SaaS and campus systems — tenant isolation, RBAC, indexed queries, and load-tested APIs.",
    projectTitles: ["CampusHub", "Indian College OS", "GLA Exam Portal"],
  },
  {
    id: "ai",
    label: "CHAPTER II",
    title: "AI & Real-Time Systems",
    subtitle: "GROQ · SERVERLESS · STREAMING",
    description:
      "LLM pipelines, background queues, and developer tools that ship beyond the browser.",
    projectTitles: ["JusticeAI", "AI Code Explainer", "MoodifyMe"],
  },
  {
    id: "marketplace",
    label: "CHAPTER III",
    title: "Marketplace & Mobile",
    subtitle: "FIREBASE · REAL-TIME · MULTI-ROLE",
    description:
      "Consumer-scale flows — live listeners, four-sided marketplaces, and internship-grade API work.",
    projectTitles: ["FoodExpress"],
  },
];

export type ProjectItem = {
  title: string;
  description: string;
  dates: string;
  tech: string[];
  link: string;
  metrics: string[];
  caseStudySlug?: ProjectCaseStudySlug;
  tag: string;
};

export const PROJECT_TAGS: Record<string, string> = {
  CampusHub: "MULTI-TENANT SAAS",
  "Indian College OS": "SPRING BOOT",
  "GLA Exam Portal": "500+ USERS",
  JusticeAI: "SERVERLESS AI",
  "AI Code Explainer": "GROQ · EXTENSIONS",
  MoodifyMe: "AI WELLNESS",
  FoodExpress: "REAL-TIME OPS",
};
