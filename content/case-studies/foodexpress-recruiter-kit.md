# FoodExpress — Recruiter & interview kit

Companion to `foodexpress.md`.

---

## Elevator pitch (15 seconds)

“I built **FoodExpress**, a **Next.js 14** food delivery platform on **Firebase** — **four roles** (customer, shopkeeper, delivery partner, admin), **real-time order tracking**, **OTP and Google auth**, **menu CRUD with image uploads**, and **IndexedDB** for offline-style persistence — aimed at **tier 2/3** use cases with **COD** checkout.”

---

## Elevator pitch (30 seconds)

“Aggregators under-serve smaller cities. FoodExpress is a **multi-role** web app: customers browse **admin-approved** restaurants, cart and checkout with **cash on delivery**, and watch **live status**; shopkeepers run **menus, images, revenue**, and **assign riders**; delivery partners manage **availability, acceptance, and completions**; admins **approve supply** and see **platform analytics**. It’s **Next.js 14**, **TypeScript**, **Firestore + Storage**, **role-based security rules**, and **listeners** for real-time ops.”

---

## Keywords for ATS / LinkedIn

Next.js 14, React 18, TypeScript, Tailwind CSS, Firebase Authentication, Firestore, Firebase Storage, security rules, RBAC, multi-role SPA, real-time listeners, IndexedDB persistence, offline-first UX, React Context, phone OTP, Google OAuth, food delivery, marketplace, order state machine, image upload, admin workflow, delivery partner dispatch, COD, Lucide, React Hot Toast

---

## STAR — Real-time order operations

- **S:** Customers and restaurants were refreshing pages; stale state caused confusion on timing and handoffs.  
- **T:** Make order progress **instantly visible** across roles.  
- **A:** **Firestore listeners** on order documents and dashboard aggregates; clear **status pipeline** from pending through delivered; toast feedback for actions.  
- **R:** Smoother coordination between kitchen, customer, and rider — quantify with demo video or measured update latency if you can.

---

## STAR — Multi-tenant data safety (restaurant owners)

- **S:** One restaurant must not mutate another’s menu or orders.  
- **T:** Enforce ownership at the **data layer**, not only in hidden UI.  
- **A:** **Firestore rules** binding `restaurants` and `menuItems` to `ownerId` / role; admin-only approval fields.  
- **R:** Safer multi-supplier platform suitable for real onboarding — pair with explanation of rule tests if you have them.

---

## STAR — Resilience on weaker networks

- **S:** Tier 2/3 users often hit flaky connectivity.  
- **T:** Avoid totally broken sessions when the network drops.  
- **A:** **IndexedDB persistence** (per README) alongside Firebase client patterns; thoughtful loading and error states.  
- **R:** More reliable UX than “online-only” student demos — state what exactly persists (auth session, cached reads, etc.) in interviews.

---

## Interview questions to prep

1. **How is the order state machine enforced?** Can a malicious client skip states?  
2. **How do Firestore rules differ for customer vs shopkeeper vs delivery vs admin?**  
3. **How do you avoid listener leaks** when navigating between dashboard pages?  
4. **OTP flow:** where is verification trusted — client only or server/Admin SDK?  
5. **Why Context over Redux** here, and when would you refactor?  
6. **COD + fraud:** what would you add for abuse (fake orders, rider collusion)?

---

## Portfolio blurbs

**Short:**  
“Multi-role food delivery on Next.js 14 + Firebase: real-time orders, OTP/Google auth, shop menus & uploads, delivery partner flows, admin approvals, IndexedDB persistence.”

**Medium:**  
“Tier 2/3 oriented delivery platform with four RBAC personas, Firestore-driven live order tracking, restaurant approval and menu management with Storage uploads, delivery assignment, COD checkout, and offline persistence — Next.js 14, TypeScript, Tailwind.”

---

## Demo script (~2 minutes)

1. **Admin:** log in → approve a pending restaurant.  
2. **Shopkeeper:** add menu item + image → show live menu.  
3. **Customer:** cart → checkout COD → order created.  
4. **Shopkeeper:** advance statuses → assign rider.  
5. **Delivery partner:** accept → mark delivered.  
6. **Customer:** timeline updates without manual refresh.

---

## Honest polish checklist

- [ ] Replace **hardcoded admin email** with env + custom claims (or document as demo-only).  
- [ ] Align README: **reviews** “planned” vs **implemented**.  
- [ ] Add **one architecture diagram** (roles × collections).  
- [ ] Capture **Loom** with real network throttling to show offline/persistence value.  
- [ ] Run **Firestore rules unit tests** (Emulator) if pitching security-heavy roles.

---

## Small privacy note

The README lists a specific **admin email**. For public repos or PDFs, consider **redacting** or saying “allowlisted admin accounts” unless you want that address public.
