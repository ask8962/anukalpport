# AI Code Explainer — Recruiter & interview kit

Companion to `ai-code-explainer.md`. Copy and adapt.

**Team note:** GLA University mini project — **Anukalp Gupta, Nishant Singh, Prince Kumar, Utpal Kumar, Jatin Chauhan**. In interviews, state your **specific ownership** (e.g. API routes, web app, Chrome extension, Firebase, UI).

---

## Elevator pitch (15 seconds)

“We shipped an **AI code explanation platform** using **Next.js 14** and **Groq’s Llama 3.3** — **streaming** explanations, **optimization with complexity cards**, and **Mermaid flowcharts**. Same backend powers a **Chrome extension** for GitHub/LeetCode/StackOverflow and a **VS Code** extension, with **Firebase** for **Google auth** and **history**.”

---

## Elevator pitch (30 seconds)

“Students waste time bouncing between sites and mentors. We built **three clients** — **web**, **Chrome**, and **VS Code** — on top of **three API routes**: explain, optimize, and flowchart. The model is **Llama 3.3 70B** on **Groq** for speed, with **Vercel AI SDK** streaming in the UI. **Monaco** for editing, **Mermaid** for diagrams, **shadcn** for UI, and **Firestore** for per-user history after **Google OAuth**. It’s designed like a small **product platform**, not a single-page demo.”

---

## Keywords for ATS / LinkedIn

Next.js 14, App Router, React 18, TypeScript, Tailwind, shadcn/ui, Radix, Framer Motion, Monaco Editor, Mermaid.js, React Three Fiber, Vercel AI SDK, streaming LLM, Groq, Llama 3.3, prompt engineering, REST API routes, Firebase Auth, Firestore, Google OAuth, Chrome Extension Manifest V3, content scripts, VS Code extension, webview, educational technology, code analysis, Big-O complexity

---

## STAR — Multi-surface architecture

- **S:** Learners use **browser, IDE, and a full app**; repeating three backends would be unmaintainable.  
- **T:** One consistent AI backend for **web + Chrome + VS Code**.  
- **A:** Defined **POST** APIs for explain/optimize/flowchart; extensions call hosted **Next.js routes**; shared response/streaming patterns.  
- **R:** Faster iteration, one place to fix prompts and keys (**server-side**), consistent behavior across surfaces.

---

## STAR — UX latency (streaming)

- **S:** LLM calls feel slow if users wait for full completion.  
- **T:** Make the app feel instant and “alive” during generation.  
- **A:** **Vercel AI SDK** streaming to React; skeleton states (e.g. explanation skeleton component per README).  
- **R:** Higher perceived performance and engagement vs blocking spinners.

---

## STAR — Pedagogy / trust (optimize mode)

- **S:** “Optimized” code can be wrong or change behavior.  
- **T:** Teach complexity without misleading beginners.  
- **A:** **Before/after complexity cards**, structured explanations, disclaimers in UI copy; scope optimizations to educational examples.  
- **R:** Honest positioning as a **learning assistant**, not a silent compiler.

---

## Interview questions to prep

1. **Where does the Groq API key live, and how do extensions call the backend safely?**  
2. **How do you prevent prompt injection from user code?**  
3. **How would you add rate limits and per-user quotas?**  
4. **How do you validate Mermaid output before render?**  
5. **What breaks in Chrome MV3 if the service worker sleeps — how do you handle long streams?**  
6. **Firestore rules: how is history isolated per uid?**

---

## Portfolio blurbs

**Short:**  
“AI code tutor — streaming Llama 3.3 (Groq), explain/optimize/flowchart APIs, Firebase history, Chrome + VS Code extensions.”

**Medium:**  
“Educational AI product on Next.js 14: Monaco input, streaming explanations and optimizations with complexity visuals, Mermaid flowcharts, shareable pages, and Firebase-backed history. Distributed via web, Chrome (GitHub/LeetCode/SO), and VS Code.”

---

## Demo order (2 minutes)

1. Paste **nested loop** Python → **Explain** → point to complexity.  
2. **Optimize** → show **before/after** card.  
3. **Flowchart** → Mermaid render.  
4. Show **History** (logged in).  
5. Optional: **Chrome** on a LeetCode snippet → injected button.

---

## Honest polish checklist

- [ ] Measure and quote **time-to-first-token** (p50/p95).  
- [ ] Document **rate limits** / daily quota if deployed publicly.  
- [ ] Add **tests** for API routes (mock LLM).  
- [ ] Clarify **individual contribution** on team slide / README.
