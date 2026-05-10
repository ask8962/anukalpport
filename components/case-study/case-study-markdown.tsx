import React, { Fragment } from "react";

/** Trusted repo markdown only — no raw HTML passthrough. */
function formatInline(text: string, keyPrefix: string): React.ReactNode {
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]*\]\([^)]*\))/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(
        <Fragment key={`${keyPrefix}-plain-${k++}`}>{text.slice(last, m.index)}</Fragment>
      );
    }
    const token = m[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${k++}`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${k++}`}
          className="rounded-md bg-white/5 px-1.5 py-0.5 text-sm text-primary"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[")) {
      const lm = /^\[([^\]]*)\]\(([^)]*)\)$/.exec(token);
      if (lm) {
        const href = lm[2];
        const isExt = href.startsWith("http");
        nodes.push(
          <a
            key={`${keyPrefix}-a-${k++}`}
            href={href}
            className="text-primary hover:underline"
            {...(isExt ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {lm[1]}
          </a>
        );
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) {
    nodes.push(<Fragment key={`${keyPrefix}-plain-${k++}`}>{text.slice(last)}</Fragment>);
  }
  if (nodes.length === 0) return text;
  return <>{nodes}</>;
}

function splitTableRow(row: string): string[] {
  const cells = row.split("|").map((c) => c.trim());
  return cells.filter((c, i, arr) => !(c === "" && (i === 0 || i === arr.length - 1)));
}

function renderTable(tableLines: string[], blockKey: string): React.ReactElement | null {
  const rows = tableLines.map(splitTableRow).filter((r) => r.length > 0);
  if (rows.length < 2) return null;

  const header = rows[0];
  const separator = rows[1];
  const isSep = separator.every((c) => /^:?-{3,}:?$/.test(c));
  const bodyRows = isSep ? rows.slice(2) : rows.slice(1);

  return (
    <div key={blockKey} className="mb-8 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03]">
            {header.map((h, i) => (
              <th key={i} className="px-4 py-3 font-semibold text-foreground">
                {formatInline(h, `${blockKey}-th-${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((r, ri) => (
            <tr key={ri} className="border-b border-white/5 last:border-0">
              {r.map((c, ci) => (
                <td key={ci} className="px-4 py-2.5 text-muted-foreground">
                  {formatInline(c, `${blockKey}-td-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type Props = {
  content: string;
};

export function CaseStudyMarkdown({ content }: Props) {
  const lines = content.split(/\r?\n/);
  const out: React.ReactElement[] = [];
  let i = 0;
  let n = 0;
  const key = () => `cs-md-${n++}`;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i++;
      continue;
    }

    if (trimmed.startsWith("```")) {
      i++;
      const code: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;
      out.push(
        <pre
          key={key()}
          className="mb-6 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 text-sm text-muted-foreground"
        >
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      i++;
      out.push(<hr key={key()} className="my-10 border-white/10" />);
      continue;
    }

    const hm = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (hm) {
      const level = hm[1].length;
      const text = hm[2];
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
      const classes =
        level === 1
          ? "mt-10 mb-6 text-3xl font-black tracking-tight text-foreground border-b border-white/10 pb-4 md:text-4xl"
          : level === 2
            ? "mt-12 mb-4 text-2xl font-bold tracking-tight text-foreground"
            : level === 3
              ? "mt-8 mb-3 text-xl font-bold text-foreground"
              : "mt-6 mb-2 text-lg font-semibold text-foreground";
      out.push(
        <Tag key={key()} className={classes}>
          {formatInline(text, key())}
        </Tag>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const bq: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        bq.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push(
        <blockquote
          key={key()}
          className="mb-6 border-l-4 border-primary/50 pl-4 text-muted-foreground italic leading-relaxed"
        >
          {formatInline(bq.join(" "), key())}
        </blockquote>
      );
      continue;
    }

    if (
      trimmed.includes("|") &&
      i + 1 < lines.length &&
      /^\|?[\s\-:|]+\|?$/.test(lines[i + 1].trim())
    ) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const tableEl = renderTable(tableLines, key());
      if (tableEl) out.push(tableEl);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      const k0 = key();
      out.push(
        <ul
          key={k0}
          className="mb-6 ml-6 list-disc space-y-2 text-muted-foreground marker:text-primary/80"
        >
          {items.map((item, j) => (
            <li key={j}>{formatInline(item, `${k0}-li-${j}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      const k0 = key();
      out.push(
        <ol
          key={k0}
          className="mb-6 ml-6 list-decimal space-y-2 text-muted-foreground marker:text-primary/80"
        >
          {items.map((item, j) => (
            <li key={j}>{formatInline(item, `${k0}-oli-${j}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paras: string[] = [line];
    i++;
    while (i < lines.length) {
      const t = lines[i].trim();
      if (t === "") break;
      if (
        t.startsWith("```") ||
        /^(#{1,4})\s/.test(t) ||
        /^(-{3,}|\*{3,}|_{3,})$/.test(t) ||
        t.startsWith(">") ||
        /^[-*]\s+/.test(t) ||
        /^\d+\.\s+/.test(t)
      ) {
        break;
      }
      if (t.includes("|") && i + 1 < lines.length && /^\|?[\s\-:|]+\|?$/.test(lines[i + 1].trim())) {
        break;
      }
      paras.push(lines[i]);
      i++;
    }
    const paragraphText = paras.join(" ").trim();
    if (paragraphText) {
      const pk = key();
      out.push(
        <p key={pk} className="mb-5 text-muted-foreground leading-relaxed">
          {formatInline(paragraphText, pk)}
        </p>
      );
    }
  }

  return <div className="max-w-none">{out}</div>;
}
