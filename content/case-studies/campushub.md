# CampusHub — Case Study

**Product:** Multi-tenant campus engagement SaaS  
**Live:** [campushub.pro](https://campushub.pro)  
**Author:** Anukalp Gupta  
**Role framing:** Full-stack / platform engineer (Next.js, Firebase, security, multi-tenancy)

---

## 1. Executive summary

CampusHub is a **multi-tenant SaaS** that lets universities run a **single branded workspace** for student life: social (stories, profiles, confessions), **events and QR ticketing**, **hackathons with judging and live leaderboards**, **clubs with verification and elections**, **gamification and rewards**, and **accreditation-oriented reporting (NAAC/NBA)**. Institutions can **self-onboard** and launch a subdomain experience quickly, while **Super Admins** retain global control and **Org Admins** see only their tenant’s data.

The hardest engineering problems sit at the intersection of **tenant isolation**, **abuse resistance** (anonymous feeds, uploads, voting), **real-time UX** (notifications, live boards), and **compliance-facing exports** (PDF reports for auditors).

---

## 2. Problem and context

### 2.1 What was broken in the status quo

Indian colleges often juggle:

- **Fragmented tools** — WhatsApp groups, Google Forms, random event pages, and paper processes for attendance and hackathons.  
- **Weak audit trails** — Accreditation bodies ask for **documented engagement** (events, clubs, participation). Spreadsheets don’t scale.  
- **Trust and safety gaps** — Anonymous campus expression is popular but risky without **moderation workflows** and **rate limits**.  
- **Operational load** — Club verification, hackathon judging, ticketing, and no-show management are **people-heavy** without automation.

### 2.2 Product thesis

Provide **one platform** that is:

1. **Tenant-first** — Each institution is isolated by identity and routing.  
2. **Self-serve** — Reduce time-to-value for admins (README claims **under ~2 minutes** to a branded subdomain).  
3. **Engagement-native** — Social loops (stories, confessions, gamification) plus **structured programs** (events, hackathons, clubs).  
4. **Governance-ready** — Super Admin tooling, audit logs, security reports, and **PDF exports** aligned with accreditation narratives.

---

## 3. Users, roles, and jobs-to-be-done

| Persona | Primary goals | CampusHub surfaces |
|--------|----------------|-------------------|
| **Student** | Discover events, join clubs, participate in hackathons, social feed, earn points | Feed, stories, events, hackathons, clubs, wallet, profile |
| **Club leadership** | Run recruitment, elections, announcements, see analytics | Club admin, roles (President, VP, etc.) |
| **Org Admin (tenant)** | Operate the campus instance: users, events, verification, broadcasts | Admin dashboard, analytics, scanner, reports |
| **Super Admin (platform)** | Provision tenants, enforce policy, global visibility | Tenant management, security reports, health |
| **Faculty / accreditation** *(indirect)* | Evidence of engagement | NAAC/NBA PDF generator, structured metrics |

**Role-based access control (RBAC)** is a first-class constraint: student vs admin vs super admin paths must be **enforced in UI, API, and Firebase rules**.

---

## 4. Product scope (modules) — what shipped

This section maps README features to **engineering meaning** (data models, workflows, and failure modes).

### 4.1 Gallery and social graph

- **Stories (24h expiry)** — Time-bounded media with storage lifecycle and feed ranking implications.  
- **Profiles, bookmarks, follows** — Classic social graph; needs **pagination**, **spam controls**, and **notification fan-out**.

**Engineering note:** Ephemeral content implies **scheduled cleanup** or TTL strategy in Firestore/Storage (exact implementation is product-specific; the case study assumption is “expiry is enforced in product logic + rules”).

### 4.2 Campus confessions (high-risk surface)

- **Anonymous feed, voting, polls, threaded replies** — High engagement, high abuse potential.  
- **Moderation** — Automated scoring + **Super Admin identity reveal** for severe cases.

**Engineering note:** This module typically requires **strict rate limits**, **reporting**, **audit logs**, **sanitization**, and **clear legal/privacy copy**. CampusHub documents **DOMPurify**, **Redis rate limiting**, and **security headers**.

### 4.3 Event hub

- Discovery, **RSVP**, **waitlists**, **QR tickets**, **ICS export**, **check-in**, **no-show penalties**, **feedback**.

**Engineering note:** QR ticketing ties **registration state** to **scan events**; no-show penalties require **reliable attendance signals** and **idempotent check-in** to avoid double scans.

### 4.4 Hackathon platform

- Teams, submissions (GitHub, demos, video), **multi-criteria judging**, **live leaderboard**, mentors, schedule, **QR check-in**.

**Engineering note:** Live leaderboard + judging implies **real-time or near-real-time** updates and **permissioned writes** (only judges score, only teams submit).

### 4.5 Clubs and societies

- Directory, verification workflow, **verified badge**, roles, analytics, recruitment windows, **digital elections**.

**Engineering note:** Elections need **integrity** (one vote per member, role checks) and **transparency** (auditable outcomes).

### 4.6 Gamification and rewards

- Points, levels, badges, streaks, leaderboard; **wallet**, redemption catalog, **fulfillment pipeline** (Pending → Fulfilled).

**Engineering note:** Points are a **ledger problem** — avoid double-spend and race conditions when redeeming; README points to **points history** APIs and admin management.

### 4.7 Notifications and email

- FCM push, in-app notification center, SMTP (Nodemailer) for onboarding and broadcasts.

**Engineering note:** Email deliverability, unsubscribe policy, and **tenant-scoped broadcasts** must not leak data across institutions.

### 4.8 Super Admin and org panels

- Tenant provisioning, **subdomain configuration**, branding (primary colors), suspend/activate.  
- **NAAC/NBA PDF** export from engagement data.  
- Analytics, QR scanner, health monitoring, **security reports**, audit logs.

---

## 5. Architecture (conceptual)

### 5.1 Stack (as documented)

| Layer | Choice | Why it fits |
|-------|--------|-------------|
| App | **Next.js 16** (App Router, Turbopack) | SSR/ISR, API routes, unified deployment on Vercel |
| Data | **Firestore** | Real-time listeners, flexible documents for social/event models |
| Auth | **Firebase Auth** (Google OAuth) | Fast onboarding; integrates with rules |
| Files | **Firebase Storage** | Media for stories, club assets, submissions |
| Rate limits | **Upstash Redis** | Serverless-friendly quotas per IP/action |
| UI | **Radix + shadcn**, **Tailwind 4** | Accessible primitives, fast iteration |
| Motion / charts | **Framer Motion**, **Recharts** | Premium UX + admin analytics |
| QR | **qrcode.react**, **html5-qrcode** | Ticket generation and scanning |
| PDF | **jsPDF** | Client or server PDFs for accreditation |
| Quality | **Vitest**, **Playwright**, **Storybook** | Regression safety for a large surface area |

### 5.2 Multi-tenancy model

Documented behaviors:

- **Dynamic tenant routing** based on **email domain** (e.g. `@college.ac.in`) so users land in the correct institution workspace.  
- **Super Admin** global visibility vs **Org Admin** scoped visibility.

**Senior-level implementation pattern (recommended framing in interviews):**

- Every document path or field set includes a **`tenantId`** (or org key) and **security rules** enforce equality with the user’s tenant claim.  
- Admin APIs validate **session + role + tenant** before any batch read/write.  
- **Subdomain + branding** are configuration documents, not hardcoded per deploy.

### 5.3 API surface

README lists extensive `app/api/*` routes (auth, clubs, events, notifications, points, rewards, faculty, academic calendar, etc.). Treat this as a **modular monolith**: many domains, one deployable, shared auth middleware patterns.

---

## 6. Security and privacy (deep dive)

This is the strongest “senior signal” in the README — expand it in interviews.

### 6.1 Threat model (practical)

| Threat | Mitigation documented |
|--------|------------------------|
| Cross-tenant data access | Tenant routing + Firestore rules + RBAC |
| OTP / credential stuffing | Email OTP with **5 req/hr** limit |
| Scraping / spam on social actions | Per-IP limits: uploads, comments, likes |
| XSS via user HTML | **DOMPurify** sanitization |
| Clickjacking | **X-Frame-Options**, **CSP** |
| Transport / MITM hardening | **HSTS** |
| Privilege abuse | Audit logs, security reports, admin segregation |
| Session risks | Inactivity timeout, concurrent login detection, forced logout |

### 6.2 Defense in depth

- **Headers:** CSP, Referrer-Policy, Permissions-Policy (as README claims).  
- **Rules:** Firestore/Storage rules as the **last line of defense**, not the only line.  
- **Server validation:** Rate limits and sensitive operations on **API routes**, not only the client.

### 6.3 Anonymous confessions vs accountability

Product tension: virality vs safety. CampusHub documents **lenient moderation** with **Super Admin reveal** capability — a policy-sensitive feature that must be **logged** and **exception-based**.

---

## 7. Key technical decisions and tradeoffs

### 7.1 Firebase as the primary datastore

**Pros:** Real-time feeds, auth integration, fast iteration for student products.  
**Cons:** Complex queries vs SQL, cost discipline at scale, migration effort if relational reporting becomes mandatory.

**How to phrase it:** “We optimized for **shipping tenant-scoped real-time features**; accreditation exports are handled as **materialized summaries + PDF** rather than ad-hoc SQL for v1.”

### 7.2 Redis rate limiting (Upstash)

**Pros:** Serverless-compatible, simple per-IP throttles for abusive endpoints.  
**Cons:** IP-based limits are coarse (NAT, mobile carriers); may need **user-based** limits for authenticated routes.

### 7.3 Next.js API routes as the trust boundary

Anything that must never be spoofed — **OTP issue/verify**, **admin actions**, **points debit**, **reward fulfillment** — belongs server-side with **uniform validation**.

### 7.4 jsPDF for NAAC/NBA reports

**Pros:** Institutions want **one-click PDF** without a separate BI tool.  
**Cons:** Template maintenance, ensuring numbers match dashboard definitions (need **single source of truth** for metrics).

---

## 8. Reliability, observability, and operations

- **Health monitoring** and **API status checks** (admin).  
- **Security reports** and **audit logging** for critical admin actions.  
- **CI/CD** via GitHub Actions — README positions testing and deployment discipline.

**Gap to acknowledge honestly:** For a “senior” narrative, pair this with **Sentry (or similar)**, **structured logging**, and **SLOs** (p95 latency, error rate) if not already present.

---

## 9. Quality engineering (DX)

README highlights:

- **Command menu (`Ctrl+K`)** — reduces navigation friction in a large app.  
- **Storybook** — component contracts for a huge UI surface.  
- **Vitest + Playwright** — unit/integration/browser coverage where it matters (auth flows, ticketing, admin).  
- **TypeDoc** — API documentation for maintainers.

This is exactly what separates a demo from a **maintainable platform**.

---

## 10. Outcomes and proof points (use concrete numbers when you have them)

From README / product claims (qualitative unless you add analytics):

- **Self-serve onboarding:** branded subdomain live in **~2 minutes** (validate with a screen recording).  
- **Breadth:** social + events + hackathons + clubs + gamification + rewards + admin + super admin — **single cohesive product**.  
- **Security posture:** documented quotas, CSP, sanitization, rules, RBAC, audit logs.

**Action item for you:** Add a short “Metrics” subsection with real numbers when available: registered students, events processed, scan counts, p95 API latency, test coverage %, monthly active orgs.

---

## 11. What you would build next (credible roadmap)

1. **Per-tenant analytics warehouse** — BigQuery / ClickHouse for accreditation and cohort reporting.  
2. **User-based rate limits** + device fingerprinting for confession abuse.  
3. **Formal moderation queue** (SLA, appeals) and export for compliance.  
4. **Mobile app** or PWA hardening for scanner-first workflows.  
5. **Billing** (Stripe) for institutions — true SaaS monetization layer.

---

## 12. Glossary

- **Tenant:** One institution’s isolated workspace.  
- **Org Admin:** Administrator scoped to a tenant.  
- **Super Admin:** Platform operator with global controls.  
- **NAAC/NBA:** Accreditation frameworks; reports require defensible engagement data.  
- **RBAC:** Role-based access control across UI, API, and rules.

---

## 13. One-sentence pitch

CampusHub is a **multi-tenant campus operating system** that combines **student engagement** (social, events, hackathons, clubs) with **admin governance** (verification, analytics, security, accreditation PDFs) — engineered with **Firebase isolation**, **Redis rate limits**, and **modern security headers**.

---

*Derived from the CampusHub README and public positioning; refine numbers and architecture diagrams with your private repo details as needed.*
