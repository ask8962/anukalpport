import fs from "fs/promises";
import path from "path";
import { CASE_STUDIES, type CaseStudySlug } from "./case-studies-config";

const CASE_STUDY_DIR = path.join(process.cwd(), "content", "case-studies");

export async function getCaseStudyMarkdown(slug: CaseStudySlug): Promise<string> {
  const meta = CASE_STUDIES[slug];
  const filePath = path.join(CASE_STUDY_DIR, meta.file);
  return fs.readFile(filePath, "utf8");
}
