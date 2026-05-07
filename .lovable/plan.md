
# Production Advisor — full planner page

Replace Stock and Orders in the sidebar with a single, prescriptive **Production Advisor** that tells artisans *what to make, how much, and when*. Includes a 4-week production calendar, materials shopping list, and a separate onboarding wizard for new artisans.

---

## 1. Navigation cleanup

Update `src/components/site/AppShell.tsx` nav array to:
- Home, Trends, Mandi, **Advisor** (new), Reports, Profile

Remove Stock and Orders entries. Use a `ClipboardList` or `Compass` icon for Advisor with Hindi label `सलाहकार`.

In `src/App.tsx`:
- Remove `/stock` and `/orders` routes and their imports.
- Add `/advisor` (main page) and `/advisor/onboarding` (wizard) routes.
- Delete `src/pages/Stock.tsx` and `src/pages/Orders.tsx`.

Any links to /stock or /orders elsewhere (landing page, dashboard) get retargeted to /advisor or removed.

---

## 2. Onboarding wizard — `/advisor/onboarding`

A separate 3-step wizard for new artisans, shown automatically when no advisor profile exists in localStorage. Uses framer-motion step transitions.

**Step 1 — Cluster & craft**
- Select cluster (Varanasi Weave, Khurja Pottery, Jaipur Block Print, Moradabad Brass, Channapatna Toys, Kutch Embroidery — 6 presets matching existing data).
- Auto-fills craft category.

**Step 2 — Skill & setup**
- Experience: Beginner / Intermediate / Established (radio cards).
- Equipment count (looms / wheels / tables) — number input.
- Optional: years practicing — slider.

**Step 3 — Capacity & goals**
- "I can make X units per week" — slider.
- Primary goal: Income stability / Festival push / Export-ready / Learning (chips).
- CTA: **Generate my first plan** → saves profile to localStorage `advisor.profile`, redirects to `/advisor`.

A skip link at the top lets returning users go straight to /advisor.

---

## 3. Advisor page — `/advisor`

Layout mirrors Trends shell (uses AppShell). Single column on mobile, two-column on desktop with sticky right rail.

### Header strip (full width)
Editable context chips: cluster · craft · skill level · capacity (X units/wk) · "Edit setup" link → onboarding wizard.

### Main column

**A. Capacity dial**
Slider that rescales every recommendation live ("I can make 20 → 60 units/week"). Anchored at top so the user feels in control.

**B. This week's batch recommendations (3 cards)**
Each card shows:
- Product name + a small craft-photo thumbnail
- Suggested batch size (responds to capacity slider)
- Demand confidence % bar (pulled from same scale as Trends sidebar)
- Festival/season tag (Diwali, Karwa Chauth, Wedding, Export-Holiday)
- Materials cost estimate · est. revenue · est. margin
- Lead time (days) and ship-by date
- Expandable **"Why this?"** rationale citing Trends + Mandi signals
- Actions: **Add to plan**, **Share with cluster**

**C. 4-week production calendar**
Horizontal timeline (4 columns = 4 weeks, rows = recommended batches). Each cell shows batch name + qty + festival anchor. Drag-free for v1 — read-only schedule generated from accepted recommendations. Uses the existing `Calendar`/grid styling language; no react-big-calendar needed.

**D. Materials shopping list**
Aggregated from all batches in the plan: material, quantity, est. cost, suggested mandi (links to /mandi). Group by material category with subtotals and grand total.

### Sticky right rail (desktop only, like Trends)

**Plan summary card**
- Total units this month
- Estimated revenue
- Estimated margin %
- Festival coverage indicator (which festivals the plan addresses)

**Cluster benchmark card**
- "Artisans in Varanasi Weave are averaging X units/week, ₹Y revenue" — peer comparison.

**Risk flags card**
- Material price spikes, demand cooldowns, capacity overcommit warnings.

---

## 4. State & persistence

All client-side, no backend (matches current app pattern):

- `localStorage["advisor.profile"]` → `{ cluster, craft, skill, capacity, goal, equipment }`
- `localStorage["advisor.plan"]` → array of accepted recommendation IDs with week assignments
- A `useAdvisor` hook in `src/hooks/use-advisor.ts` wraps reads/writes and exposes recommendations.

Recommendation data lives in `src/data/advisorRecommendations.ts` — keyed by cluster, with 6–8 sample products per cluster including all card fields. Filtered/scored client-side based on profile + capacity + current month (festival proximity).

---

## 5. Visual & motion

- Reuse existing tokens from `index.css` — no new colors. Display font for headings, data font for numbers, Hindi font for vernacular labels (matches Trends).
- Framer-motion: stagger card entrance, smooth height transitions on "Why this?" expand, calendar cell hover lift.
- Confidence bars and capacity slider use `--primary` / `--secondary` tokens already in the system.

---

## Technical notes

```text
src/
  pages/
    Advisor.tsx              (main planner)
    AdvisorOnboarding.tsx    (3-step wizard)
  components/advisor/
    CapacityDial.tsx
    RecommendationCard.tsx
    ProductionCalendar.tsx
    MaterialsList.tsx
    PlanSummary.tsx
    ClusterBenchmark.tsx
    RiskFlags.tsx
  data/
    advisorRecommendations.ts
    clusterBenchmarks.ts
  hooks/
    use-advisor.ts
```

Routing guard in `Advisor.tsx`: if `localStorage["advisor.profile"]` is missing, redirect to `/advisor/onboarding`.

Files to delete: `src/pages/Stock.tsx`, `src/pages/Orders.tsx`. Routes and nav entries removed in the same pass.

No new dependencies required — framer-motion, lucide-react, shadcn primitives, and Tailwind are all already in the project.
