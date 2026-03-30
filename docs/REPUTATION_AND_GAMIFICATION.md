# Reputation & Gamification (Trust System)

**Kameeti – Tradition Meets Tech** uses an **automated, gamified trust layer**: behavior is inferred from ledger and membership events; **points / stars / badges** reflect reliability; **profiles** show reputation so others can judge trust at a glance.

This doc complements [FEATURES_SPEC.md](./FEATURES_SPEC.md) and [DATA_MODEL.md](./DATA_MODEL.md).

---

## 1. Goals

| Goal | Mechanism |
|------|-----------|
| Reward **punctuality** | Points for **on-time** payments and **on-time** join/start participation |
| Reward **reliability** | Streaks, low default rate, completed cycles |
| **Visible credibility** | Trust **score** and **stars** on profile; badges for milestones |
| **Accountability** | Poor behavior reduces score; history auditable server-side |
| **Zero manual grading** | Server **automates** scoring from events—no admin clicks to “award trust” |

---

## 2. Behaviors tracked (signals)

Events are emitted when the **ledger** or **membership** state changes (see §5 Automation).

| Signal | Source | Good behavior | Negative behavior |
|--------|--------|---------------|-------------------|
| **Payment on time** | `Payment` marked paid vs `Period` due date | Paid within **grace window** | Late, missed, defaulted |
| **Join / start on time** | Member active before first due period; join request resolved quickly | Joined & active as scheduled | Late activation, no-show |
| **Cycle participation** | Completed **full** membership in a group without default | Full cycle completed | Left early without settlement, default |
| **Consistency** | Multiple groups / periods | Repeated on-time payments | — |
| **Admin fairness** (optional) | Resolves join requests within SLA | Fast accept/reject | — |

**Due dates:** Define `periodDueAt` per period (e.g. end of month 23:59 in group timezone). **Grace period** configurable (e.g. 48 hours) before “late.”

---

## 3. Scoring model (suggested baseline)

Tune constants in **server config**; version them so old cycles don’t change retroactively without a migration.

### 3.1 Points (numeric trust)

- **`trustPoints`** — integer; **monotonic** upward for good actions, **downward** for penalties (bounded at floor, e.g. 0 or 300).
- **Examples (illustrative):**
  - On-time payment: **+10** points (per installment period).
  - Late payment (within extended grace): **+3** or **0**.
  - Missed payment (made up before period close): **−5**.
  - Default / removed for cause: **−25** (cap per incident).
  - Completed full kameeti cycle with no late: **+50** bonus (once per group completion).

### 3.2 Stars (display layer)

Map `trustPoints` to **1–5 stars** for UI simplicity:

| Star band | Points range (example) |
|-----------|--------------------------|
| ★☆☆☆☆ | 0–199 |
| ★★☆☆☆ | 200–399 |
| … | … |
| ★★★★★ | 800+ |

Expose **`starLevel` (1–5)** as **derived** field on read API so clients don’t duplicate logic.

### 3.3 Badges (achievement flags)

| Badge ID | Condition (example) |
|----------|---------------------|
| `first_cycle_complete` | Completed 1 full cycle |
| `on_time_streak_6` | 6 consecutive on-time payments (any group) |
| `trusted_member` | `trustPoints` ≥ threshold |
| `community_pillar` | Active in ≥ N groups completed |

Badges are **idempotent** (award once); stored as `UserBadge` rows.

### 3.4 Rewards (optional product)

- **Cosmetic:** profile frame, animated star (no monetary value).
- **Functional (careful):** higher priority in discover ordering—**risk of gaming**; only if abuse controls exist.

---

## 4. Profile reputation display

- **Own profile:** full **points**, **stars**, **badge list**, **short history** (“Last 5 events”).
- **Others’ profiles** (e.g. from Friends or before admin accepts request): show **stars + badge icons + optional label** (“Reliable payer”); **hide** raw point number if product prefers (**privacy** toggle).
- **Join request preview (admin):** show **requester’s stars** to help admin decision.

---

## 5. Automation architecture

**No manual scoring** in normal operation.

1. **Event sourcing (recommended):** append-only **`ReputationEvent`** rows (`userId`, `type`, `payload`, `sourceId`, `createdAt`).
2. **Triggers:** on `Payment` status change, `Period` close, `GroupMembership` status change, `JoinRequest` resolved — enqueue **job** or call **domain function** `applyReputationEffect(event)`.
3. **Idempotency:** `sourceId` = e.g. `payment:{paymentId}` so retries don’t double-award.
4. **Batch job (optional):** nightly **recalculate** star bands from points; **reconcile** drift.
5. **Materialized view:** `UserReputation` table updated synchronously or async for fast profile reads (`trustPoints`, `starLevel`, `updatedAt`).

**Client:** read-only; **never** trust client-sent points.

---

## 6. Fairness & abuse

- **Sybil:** phone uniqueness mitigates one vector; watch for **collusion** (fake groups)—optional cap on points from same admin IP/device (future).
- **Disputes:** admin-marked “wrong entry” should **reverse** or **freeze** reputation event (compensating transaction).
- **Transparency:** user can see **why** points changed (event type + date), not opaque black box.

---

## 7. Privacy & visibility

- Settings: **“Show my trust score to friends only”** vs **everyone matched** vs **hide stars** (show member only).
- **GDPR-style:** export reputation events with account data.

---

## 8. API surface (illustrative)

- `GET /users/:id/reputation` — public fields per visibility rules.
- `GET /me/reputation/history` — paginated events.
- **Internal only:** `POST /internal/reputation/recompute` — admin/support tool, not mobile.

---

*Scoring constants and badge lists should live in **versioned config** so product can tune without code changes where possible.*
