# CampusHub — Recruiter & interview kit

Quick assets derived from the full case study (`campushub.md`). Copy, paste, adapt.

---

## Elevator pitch (15 seconds)

“I built **CampusHub**, a **multi-tenant SaaS** for universities — one branded hub for **events, hackathons, clubs, anonymous confessions, stories, and gamification**, plus **admin dashboards** and **NAAC/NBA PDF exports**. Technically it’s **Next.js 16**, **Firebase**, **Upstash Redis** for rate limits, strong **security headers**, **DOMPurify**, and **Firestore rules** so tenant data stays isolated.”

---

## Elevator pitch (30 seconds)

“Colleges run campus life across messy channels. CampusHub gives each institution a **tenant-isolated workspace** with **self-serve onboarding** and **subdomain branding**. Students get social and program features — **24h stories**, **confessions with moderation**, **QR ticketing**, **hackathon judging and live leaderboards**, **clubs with verification and elections**, and a **points wallet**. Admins get **analytics**, **broadcast email**, **QR scanning**, and **accreditation-ready PDFs**. I focused on **security**: **CSP/HSTS**, **per-IP rate limits**, **2FA OTP flows**, **audit logs**, and **RBAC** across UI and APIs.”

---

## Keywords for ATS / LinkedIn

Multi-tenant SaaS, Next.js, TypeScript, Firebase (Auth, Firestore, Storage), RBAC, subdomain routing, Upstash Redis, rate limiting, CSP, security headers, DOMPurify, XSS prevention, QR ticketing, real-time notifications, FCM, Nodemailer, PDF generation (jsPDF), Vitest, Playwright, Storybook, Vercel, event systems, hackathon platform, moderation, audit logging

---

## STAR story — Multi-tenancy and isolation

- **S:** Universities must not see each other’s data; students must land in the correct org automatically.  
- **T:** Enforce isolation in routing, APIs, and database rules, not just the UI.  
- **A:** Tenant resolution from **email domain**, tenant-scoped admin panels, Super Admin vs Org Admin roles, Firebase rules aligned to tenant claims, security reporting.  
- **R:** A platform-shaped product that can onboard new institutions without a manual engineer deploy per college (positioning: **~2 min self-serve** — verify with demo).

---

## STAR story — Abuse resistance on social features

- **S:** Anonymous confessions and rich media uploads invite spam and XSS.  
- **T:** Keep the product fun but safe enough for institutional adoption.  
- **A:** **DOMPurify** for UGC, **Redis rate limits** on comments/likes/uploads, moderation tooling with **admin audit** posture, security headers.  
- **R:** Sustainable social loops without handing security solely to the client.

---

## STAR story — Real-world operations (events / hackathons)

- **S:** Events and hackathons need capacity, waitlists, check-in truth, and feedback.  
- **T:** Reduce manual work for organizers and avoid double check-ins.  
- **A:** RSVP/waitlist flows, **QR tickets**, scanner surfaces for admins, no-show policy hooks, judging and leaderboard for hackathons.  
- **R:** A single system replaces fragmented forms and WhatsApp coordination (quantify when you have usage stats).

---

## Questions you should be ready to answer

1. **How is tenant isolation enforced end-to-end?** (claims, Firestore paths, API checks, Storage rules.)  
2. **What happens if Redis is down?** (fail open vs closed for rate limits — pick a policy.)  
3. **How do you prevent double redemption of points?** (transactions, idempotency keys, server-side ledger.)  
4. **How are NAAC PDF numbers computed?** (single metric definitions, avoid dashboard/PDF mismatch.)  
5. **What’s your testing strategy for critical flows?** (Playwright paths: signup, OTP, RSVP, scan, admin action.)

---

## Suggested portfolio blurbs (pick one)

**Short (for card subtitle):**  
“Multi-tenant campus SaaS — events, hackathons, clubs, social, gamification, and accreditation PDFs. Next.js 16 · Firebase · Redis rate limits · hardened security.”

**Medium (for modal / case study link):**  
“CampusHub is a multi-tenant platform for universities: tenant routing, self-serve onboarding, student engagement (stories, confessions, feed), and operations (QR events, hackathon judging, club verification, rewards). Built with Next.js 16 and Firebase, with Upstash-backed rate limiting, CSP/HSTS, DOMPurify, and audit-oriented admin tooling.”

---

## Optional diagram caption (for slides)

“**Request → Next.js middleware/route → Auth session + tenant claim → Firestore/Storage with rules → Redis quota gate for sensitive actions → client UI (real-time listeners)**.”

---

## Honest “senior polish” checklist (fill in)

- [ ] Add **real metrics**: MAU, events, scans, tenants, test coverage %.  
- [ ] Link **architecture diagram** (Lucidchart / Excalidraw).  
- [ ] 2-minute **Loom**: onboarding + one event flow + admin PDF.  
- [ ] Public **security.txt** or brief **trust page** if selling to institutions.
