import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

export function CaseStudyMarkdown({ content }: Props) {
  return (
    <div
      className="
        prose prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-10 prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-4
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-foreground
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-semibold
        prose-ul:text-muted-foreground prose-ol:text-muted-foreground
        prose-li:marker:text-primary/80
        prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
        prose-code:text-primary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
        prose-hr:border-white/10
        prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground
        prose-thead:border-b prose-thead:border-white/10
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
