# FoodExpress — Case Study

**Product:** Multi-role food delivery web platform oriented toward **tier 2/3 cities**  
**Positioning:** Full stack on **Next.js 14** + **Firebase** with **real-time order lifecycle**, **restaurant ops**, and **delivery partner workflows**  
**Portfolio link:** [foodexp.vercel.app](https://foodexp.vercel.app/) (per portfolio `data.ts`; README cites `localhost` for dev)

---

## 1. Executive summary

FoodExpress is a **four-sided marketplace-style web app**: **Customers** browse approved restaurants, cart and checkout (COD), track orders live; **Shopkeepers** register venues, pass **admin approval**, manage **menus and images**, run **order and revenue** dashboards, and **assign riders**; **Delivery partners** toggle availability, accept orders, update delivery state, and see earnings; **Admins** approve restaurants, view platform analytics, and monitor users/orders.

The technical spine is **Firebase Authentication** (email/password, Google, **phone/OTP**), **Firestore** (and README mentions **Realtime Database** alongside listeners), **Storage** for media, **IndexedDB persistence** for offline/read resilience, and **React Context** for app state with **role-gated routes**.

---

## 2. Problem and context

### 2.1 Why tier 2/3 framing matters

Large aggregators optimize for metros; smaller cities still need:

- **Low-friction onboarding** for local restaurants (approval + simple dashboards).  
- **Cash-first payments** (COD) as a realistic default.  
- **Operational clarity** — who is cooking, who is delivering, what state is the order in?

### 2.2 Product thesis

Ship a **single codebase** that enforces **RBAC at routing, UI, and database rules**, with **real-time** updates so customers and operators are never refreshing blindly.

---

## 3. Personas and jobs-to-be-done

| Persona | Primary jobs | Key surfaces |
|--------|----------------|--------------|
| **Customer** | Discover food, cart, checkout COD, track order, history, favorites, reviews | Restaurants, checkout, orders, profile |
| **Shopkeeper** | Get approved, CRUD menu + images, manage order pipeline, assign delivery, revenue | Shopkeeper dashboard, settings |
| **Delivery partner** | Go online, accept ready orders, contact customer, complete delivery, see stats | Delivery dashboard |
| **Admin** | Approve/reject restaurants, platform KPIs, user/order oversight | `/admin` |

---

## 4. Feature scope — engineering interpretation

### 4.1 Authentication and roles

- **Four roles:** Customer, Shopkeeper, Delivery Partner, Admin.  
- **Auth methods:** Email/password, Google, **Phone/OTP**, password reset.  
- **Protected routes** per role; **admin** restricted (README: `ganukalp70@gmail.com`).

**Senior note:** Hardcoded admin email is fine for demos; production should use **custom claims**, **env allowlist**, or **Firestore `admins` collection** audited via rules.

### 4.2 Admin panel

- Restaurant **approval workflow**.  
- **Analytics:** users, restaurants, orders, revenue.  
- **User management** and **order monitoring**.  
- **Real-time** dashboard stats (listeners).

### 4.3 Shopkeeper

- Registration + operational profile.  
- **Menu CRUD**, **image uploads** (Storage + rules).  
- Order states: **pending → confirmed → preparing → ready → out_for_delivery → delivered** (aligns with README).  
- **Delivery assignment** and **rider visibility**.

### 4.4 Customer

- Search/filter restaurants, detail pages, cart with persistence.  
- **Minimum order** and **delivery fee** logic.  
- **Live tracking** + **history**.  
- **Favorites**, **profile/password**, **reviews** (README also lists reviews under UX; DB section mentions `reviews` as planned — reconcile in your live repo when writing metrics).

### 4.5 Delivery partner (net-new surface in README)

- Availability toggle, accept orders, **my deliveries**, status to delivered, earnings/ratings, vehicle info, **call customer**, notifications.

This role completes the **operations loop** without forcing shopkeepers to be dispatchers only.

### 4.6 Real-time and offline

- **Firestore listeners** for order/dashboard updates.  
- **IndexedDB persistence** — improves resilience on flaky mobile networks (tier 2/3 relevance).

---

## 5. Architecture (conceptual)

```
Next.js 14 (App Router) — src/app/*
        │
        ├── React Context (auth, cart, role UI)
        ├── Firebase Auth (multi-provider + OTP)
        ├── Firestore (users, restaurants, menuItems, orders, …)
        ├── Storage (restaurant + menu images)
        ├── (Optional) Realtime DB — per README
        └── IndexedDB persistence (offline cache layer)
```

### 5.1 Core collections (from README)

| Collection | Responsibility |
|------------|----------------|
| `users` | Profiles, roles, auth linkage |
| `restaurants` | Venue data, approval state, owner binding |
| `menuItems` | Menu, pricing, availability |
| `orders` | Line items, fees, status machine, customer + shop + delivery refs |
| `reviews` | Planned / partial — confirm in implementation |

**Senior practice:** document **order state machine** as a single enum in `types/` and enforce valid transitions in **transactions** or **Cloud Functions** to prevent illegal jumps (e.g. `delivered` from `pending` without intermediate states).

---

## 6. Key workflows

### 6.1 Restaurant onboarding

1. Shopkeeper registers.  
2. Submits restaurant profile.  
3. Admin approves/rejects.  
4. Menu goes live post-approval.

### 6.2 Order flow

1. Customer carts → checkout (COD).  
2. Order document created; **listeners** fan out updates.  
3. Shopkeeper advances kitchen states; may **assign** delivery partner.  
4. Partner picks up / marks delivered per your rules.

### 6.3 Admin loop

Approve supply (restaurants), monitor demand (orders), watch health metrics (users, revenue).

---

## 7. Security model

README highlights:

- **Firestore rules** for RBAC.  
- **Admin-only** operations.  
- **User isolation** — users read/write only what they own unless role expands scope.  
- **Owners** edit only **their** restaurant data.  
- **Storage rules** — type/size limits on uploads.

**Interview depth:** Explain **defense in depth**: rules + **server-side checks** if you add API routes or Functions; client-only checks are never sufficient.

**Privacy:** README exposes a specific admin email — for public case studies consider redacting or generalizing (“configured admin allowlist”).

---

## 8. Performance and UX

- **Composite indexes** (`firestore.indexes.json`) for filtered/sorted queries.  
- **Lazy loading** and responsive images (claimed).  
- **Toasts** and loading states for async UX.

**Gap to own proudly:** Add **one measured metric** (e.g. p95 listener update latency, or checkout success rate in testing).

---

## 9. Payments and roadmap

- **COD** implemented end-to-end.  
- **Online payments** placeholder (Razorpay/Stripe named as future).

**Roadmap (from README):** push notifications, maps tracking, promos, i18n, deeper analytics.

---

## 10. Technical decisions and tradeoffs

### 10.1 Firebase-first backend

**Pros:** Auth + real-time + Storage fits delivery workflows; fast iteration.  
**Cons:** Complex queries vs SQL; cost at scale; need disciplined **indexes** and **listener scope** (avoid over-subscribing).

### 10.2 Context API for state

**Pros:** Simple for coursework/small team.  
**Cons:** As complexity grows, consider **Zustand/Jotai** or split contexts to avoid rerender pain — good interview talking point.

### 10.3 Multi-role in one app

**Pros:** One deployable, shared design system.  
**Cons:** **Bundle size** and **accidental coupling** — mitigate with route groups and lazy-loaded role dashboards.

---

## 11. Quality and operations

README: deploy via **Vercel** or **Firebase Hosting**, scripts for **rules** and **indexes**.

**Senior add-on:** CI step that runs `firebase firestore:rules` validation, basic **E2E** (place order → status change), and **TypeScript strict** CI.

---

## 12. Outcomes (fill with real numbers)

Document when available:

- Test accounts flow time: register → first order.  
- Number of **Firestore listeners** per screen (prove you didn’t over-subscribe).  
- Image upload success rate / max size enforced.

---

## 13. One-sentence pitch

“FoodExpress is a **Firebase-backed**, **multi-role** food delivery web app with **OTP + Google + email auth**, **admin-gated restaurant supply**, **shopkeeper menu and dispatch tooling**, **delivery partner earnings workflows**, and **real-time order tracking** with **offline persistence** for real-world networks.”

---

*Sourced from the FoodExpress README; reconcile “reviews planned” vs “review system implemented” against your actual `main` branch before publishing metrics.*
