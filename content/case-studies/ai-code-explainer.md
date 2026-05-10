# AI Code Explainer (Automated Code Explanation System) — Case Study

**Product:** AI-powered educational tooling for code understanding, complexity analysis, optimization, and flowcharts  
**Context:** GLA University — B.Tech CSE, 3rd Year Mini Project  
**Web app:** [gla-code-aa.vercel.app](https://gla-code-aa.vercel.app/) (as listed in portfolio; confirm live URL)  
**Model:** **Llama 3.3 70B Versatile** via **Groq** (fast inference)  
**Distribution:** **Web (Next.js)** + **Chrome extension (Manifest V3)** + **VS Code extension**

**Team (README):** Anukalp Gupta, Nishant Singh, Prince Kumar, Utpal Kumar, Jatin Chauhan — *this write-up focuses on architecture, product, and engineering patterns; credit teammates in interviews and on the landing page.*

---

## 1. Executive summary

The **Automated Code Explanation System** is a **multi-surface developer-education product**: students and developers paste or select code and receive **structured explanations**, **Big-O style complexity framing**, **one-click “make it faster” rewrites** with **before/after comparison**, and **Mermaid flowcharts** generated from control flow. The same backend powers a **Next.js 14** web app, a **Chrome** content-script extension for GitHub / LeetCode / Stack Overflow, and a **VS Code** extension that opens results in a **webview** panel.

Engineering highlights: **streaming LLM responses** (Vercel AI SDK), **three focused API routes** (`/api/explain`, `/api/optimize`, `/api/flowchart`), **Firebase Auth + Firestore** for history and shareable public pages, and a **premium UI** (Monaco, shadcn/ui, Framer Motion, R3F hero).

---

## 2. Problem and context

### 2.1 Learner pain points

- Reading unfamiliar code (especially in **interviews**, **OSS**, and **editorials**) is slow without a mentor.  
- **Complexity intuition** (why something is \(O(n^2)\) vs \(O(n \log n)\)) is often missing from static comments.  
- Students context-switch between **IDE**, **browser**, and **docs** — friction kills focus.

### 2.2 Product thesis

Meet developers **where they already work**:

1. **Web** — full experience: editor, panels, PDF export, history.  
2. **Browser** — inject “Explain with AI” next to code blocks on major sites.  
3. **VS Code** — right-click explain/optimize on selections.

Under the hood, keep **one API contract** so all clients stay maintainable.

---

## 3. Users and primary jobs-to-be-done

| User | Job | Surfaces |
|------|-----|----------|
| Student cramming DSA | “Why does this solution work / what’s the complexity?” | Web, LeetCode via Chrome |
| Developer reading GitHub | “Explain this snippet before I merge / fork.” | Chrome on GitHub |
| VS Code user | “Explain or optimize selection without leaving the file.” | VS Code extension |
| Study group | “Share one explanation link.” | Web `/share` |

---

## 4. Feature scope — engineering interpretation

### 4.1 AI-powered explanations

- **Input:** Code + **language** (Python, Java, C++, C, JavaScript, PHP per README).  
- **Output:** Structured narrative: purpose, line-by-line or block breakdown, concepts, complexity discussion.  
- **Implementation angle:** Prompt design + **streaming** for perceived latency; Monaco for faithful input.

### 4.2 “Make it faster” / optimize mode

- **Value:** Side-by-side **before/after** with complexity cards — excellent for pedagogy.  
- **Risk:** LLMs can “optimize” incorrectly or change semantics.  
- **Senior talking point:** Disclaimers, test hints, optional “preserve behavior” instructions, and **human review** for production code.

### 4.3 Flowchart generation (Mermaid)

- **API:** `/api/flowchart` returns **Mermaid syntax** for rendering.  
- **Failure modes:** invalid Mermaid from model → need **sanitize/repair** or fallback UI message.

### 4.4 Shareable links

- Public **`/share`** routes for collaboration.  
- **Implication:** server-side or client-side persistence of share payloads, caching, and **moderation** if user-generated text is public (scope depends on implementation).

### 4.5 History (Firestore)

- Per-user explanation history after **Google OAuth**.  
- **Rules:** README cites **Firestore security rules** for RBAC-style data access — critical so users only read their own documents.

### 4.6 Chrome extension (Manifest V3)

- **content.js** injects UI near code blocks; **background** service worker talks to API.  
- **Constraints:** host permissions for GitHub/LeetCode/SO, CORS/API keys **must not** ship to the client — calls should go to **your backend** with auth/rate limits as designed.

### 4.7 VS Code extension

- Commands: **Explain** and **Optimize** from context menu.  
- **Webview** displays streaming or final output — mirrors web panels.

### 4.8 Export to PDF

- Pedagogical artifact for assignments / portfolios.  
- **Watch-out:** PDF layout + long code wrapping; optional server-side generation if client PDF is flaky.

---

## 5. System architecture

ASCII from README (preserved for slides):

```
CLIENT: Web (Next.js) | Chrome Extension | VS Code Extension
                    ↓
API: POST /api/explain | /api/optimize | /api/flowchart
                    ↓
AI: Groq — Llama 3.3 70B Versatile
                    ↓
DATA: Firestore (history) + Firebase Auth (Google OAuth)
```

### 5.1 Why this shape works

- **Thin API layer** — three endpoints map cleanly to **three prompt templates** and evaluation paths.  
- **Streaming** — Vercel AI SDK + React hooks align with UX expectations for LLM apps.  
- **Firebase** — fastest path for **auth + per-user history** in a student project timeline.

---

## 6. Tech stack (mapped to responsibilities)

| Layer | Tech | Role |
|-------|------|------|
| UI | Next.js 14 App Router, React 18, Tailwind, shadcn/Radix | Pages, dashboard, share |
| Editor | Monaco | IDE-like input |
| Diagrams | Mermaid.js | Flowchart render |
| Marketing hero | React Three Fiber | 3D landing — brand “premium” |
| Motion | Framer Motion | Transitions |
| AI | Groq API, Llama 3.3 70B | Inference |
| Streaming | Vercel AI SDK | Token/stream plumbing |
| Data | Firestore + Auth | History, OAuth |
| Deploy | Vercel | Hosting, API routes |
| Extensions | Chrome MV3, VS Code TS | Distribution beyond web |

---

## 7. API contract (summary)

| Endpoint | Purpose | Request shape (conceptual) |
|----------|---------|----------------------------|
| `POST /api/explain` | Full structured explanation | `{ code, language }` |
| `POST /api/optimize` | Rewritten code + complexity compare | `{ code, language }` |
| `POST /api/flowchart` | Mermaid output from logic | `{ code, language }` |

**Extensions reuse these routes** — good **single source of truth**; ensure **authentication strategy** is consistent (e.g. optional anon quota vs logged-in only).

---

## 8. Security, cost, and abuse (senior narrative)

### 8.1 API keys

- **Groq key** must live **server-side** only (env on Vercel). Extensions should call **your API**, not Groq directly.

### 8.2 Rate limiting and quotas

- README doesn’t specify limits; for production: **per-IP** and **per-user** caps on explain/optimize to control **cost** and **abuse**.

### 8.3 Prompt injection

- User code can contain instructions (“ignore previous…”). Mitigations: **system prompt hardening**, output schema discipline, **no tool execution** on arbitrary code.

### 8.4 Privacy

- History in Firestore: minimize PII, clear **data retention** story for a real product.

### 8.5 Shared pages

- If share URLs are public, consider **reporting**, **expiry**, or **unlisted tokens**.

---

## 9. Key technical decisions and tradeoffs

### 9.1 Groq + Llama 3.3 70B

**Pros:** Very fast responses for interactive UX.  
**Cons:** Vendor coupling; model updates change behavior — version prompts and add **regression fixtures** for golden outputs where possible.

### 9.2 Three endpoints vs one “agent” router

**Pros:** Simpler monitoring, caching, and per-route timeouts.  
**Cons:** Some duplicated prompt preamble — acceptable at this scale.

### 9.3 Multi-client (web + extensions)

**Pros:** Reach.  
**Cons:** Release matrix (Chrome store, VS Code marketplace), **CORS**, **auth** for non-web clients — document how each client attaches identity.

---

## 10. Quality and maintainability

README points to:

- `npm run lint`  
- Test API routes before pushing  
- Component patterns under `components/`

**Level-up for senior signal:** add **Vitest** for API route handlers (mock Groq), **Playwright** for “paste → stream completes”, and **contract tests** for Mermaid validity rate.

---

## 11. Outcomes and demo script (fill with real metrics)

Qualitative outcomes:

- **Three surfaces** with one backend — strong **platform thinking**.  
- **Pedagogy-first UI:** complexity cards + flowcharts + optimization story.  
- **Modern stack** recruiters recognize: Next 14, streaming AI, Firebase, extensions.

Add when available: **p95 time to first token**, **cost per 1k requests**, **extension install counts**, **test coverage**.

---

## 12. Roadmap (credible next steps)

1. **Evaluation harness** — benchmark explanation correctness on a small labeled set.  
2. **Semantic diff** for optimize mode (“behavior equivalence” hints).  
3. **Offline queue** in extensions when API unreachable.  
4. **Org/ classroom mode** — shared history for a batch.  
5. **Optional local model** path for air-gapped labs.

---

## 13. Glossary

- **Groq:** Hosted inference provider used here for Llama 3.3.  
- **Vercel AI SDK:** Streaming utilities for React + Route Handlers.  
- **Mermaid:** Text-to-diagram language for flowcharts.  
- **Manifest V3:** Chrome extension architecture with service worker background.

---

## 14. One-sentence pitch

“We built an **AI code tutor** that **streams** Llama 3.3 explanations, **optimizations**, and **Mermaid flowcharts** through **Next.js APIs**, with **Firebase** history and **Chrome + VS Code** extensions so learning happens **in the browser and the editor**, not only on our site.”

---

*Sourced from the project README; align URLs, metrics, and auth details with the live repository before publishing.*
