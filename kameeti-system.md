# Pakistani Traditional Kameeti System — Specification

A **kameeti** (also spelled *committee*, *kameti*, *beesi*, *ballot committee*) is an informal group arrangement for pooling money and distributing it in turns. In India and elsewhere similar setups are sometimes called *chit fund* (those can also be formal and regulated—context matters). Economically, a typical informal kameeti is a **rotating savings and credit association (ROSCA)**.

This document collects **cultural description**, **rules variants**, a **worked example (Method 2)**, and **roles/statuses** useful for real committees or for building apps (e.g. React Native). It is **not** legal, financial, or religious (fiqh) advice.

**React Native app (CLI) — *Kameeti – Tradition Meets Tech* — implementation documentation:** [docs/README.md](./docs/README.md) (product spec, **user flow**, **automated reputation** [points/stars/badges], data model, screens, architecture, roadmap).

---

## Contents

1. [Purpose](#purpose)  
2. [Definitions](#definitions)  
3. [How it works](#how-it-works)  
4. [User roles](#user-roles)  
5. [Member lifecycle statuses](#member-lifecycle-statuses)  
6. [Optional roles in larger groups or software](#optional-roles-in-larger-groups-or-software)  
7. [Cash-flow logic (timing)](#cash-flow-logic-timing)  
8. [Joining in the middle of a cycle](#joining-in-the-middle-of-a-cycle)  
9. [Method 1 — Buy-in / catch-up](#method-1--buy-in--catch-up)  
10. [Method 2 — Mid join, variable pots, balanced totals](#method-2--mid-join-variable-pots-balanced-totals)  
11. [Leaving, default, and late payment](#leaving-default-and-late-payment)  
12. [Why it persists](#why-it-persists)  
13. [Risks and limitations](#risks-and-limitations)  
14. [Related concepts](#related-concepts)  
15. [Quick reference](#quick-reference)  

---

## Purpose

People join a kameeti to:

- Obtain a **lump sum** at a planned time (weddings, business, property, school fees, emergencies).
- **Save** in a disciplined way through fixed periodic contributions.
- Rely on **trust and social ties** instead of—or alongside—formal credit products.

---

## Definitions

| Term | Meaning |
|------|---------|
| **Cycle / round** | One full pass where **each** member receives the pot **once** (under the agreed rules). |
| **Period** | How often people pay: e.g. **month** or **week**. |
| **Installment / contribution** | Fixed amount each member pays **when they are due to pay** under the rules. |
| **Pot / lump sum** | Total collected in a given period and given to **one** member that period. |
| **Turn / slot** | The period when a specific member **receives** the pot. |
| **Active (in pool)** | Member is bound by the rules to pay (or receive) for that period—exact meaning depends on **method** (Method 1 vs Method 2). |
| **ROSCA** | Rotating savings and credit association—the formal name for this family of arrangements. |

---

## How it works

1. **Formation**  
   The group agrees on: **installment amount**, **number of members** (or how membership changes), **cycle length** (number of periods), **payout order** (fixed list, lottery, bidding, etc.), and **rules for joins, exits, and defaults**. Some groups write rules; many rely on verbal agreement.

2. **Contributions**  
   Each period, **every member who is required to pay that period** pays the **same installment** into the pool (unless your rules say otherwise). *Who must pay in a given month* may depend on the **method** (see Method 2: early finishers may not pay in the last month).

3. **Payout**  
   The **full amount collected that period** goes to **one member** (whose turn it is). Common ways to decide order:

   - **Fixed rotation** — sequence fixed at the start (e.g. A, then B, then C…).
   - **Lottery** — each period, draw among members who have not yet received.
   - **Bidding** — members bid under rules the group sets; details **vary a lot** by group.

4. **Cycle completion**  
   When each member has received the pot **once** (per the rules), one **cycle** ends. The group may stop or start a **new cycle**.

---

## User roles

These are **people-level** roles (not the same as “early/late receiver,” which is a **timing position**—see [Cash-flow logic](#cash-flow-logic-timing)).

| Role | Responsibility |
|------|----------------|
| **Organizer / Administrator** | Sets or records committee rules; collects contributions (or coordinates transfers); keeps a **ledger** (who paid, who received, whose turn); announces payouts; often the **trusted** contact for disputes. May hold cash—depends on the group. |
| **Member** | Pays when required; receives on their turn; follows agreed rules for leave/replacement/default. |

**Minimum viable committee:** **one organizer** + **members**. Everything else below is optional or is a **status**, not a separate title.

---

## Member lifecycle statuses

Use these (or similar labels) to track each person **within one cycle**. Exact names can match your app database.

| Status | Meaning |
|--------|---------|
| **Pending / invited** | Approved to join but **not yet** in the pool or **not yet** paying (e.g. waiting for next cycle). |
| **Active — not received** | In the pool; **has not** taken the lump sum yet; must pay when rules say so. |
| **Active — received** | Already took the lump sum; may still **owe** payments until the obligation ends (classic ROSCA), or may **stop** when totals balance (depends on Method 2 rules). |
| **Completed** | Received their pot and **finished** all required payments for that cycle (totals balanced or rules satisfied). |
| **Left / withdrawn** | Exited under an agreed **settlement** or replacement—must be recorded so the pot still balances. |
| **Defaulted** | Stopped meeting obligations against the rules; group may mark for trust/recovery—informal committees rarely have court enforcement. |

**Example (Method 2, six-member spreadsheet):** Members 1–2 move to **completed** after month 5 (50k in, 50k out). Member 6 is **pending** until month 3, then **active**, then **completed** after month 6.

---

## Optional roles in larger groups or software

| Role | When to use |
|------|-------------|
| **Co-organizer / Deputy** | Backup when the main organizer is unavailable; split workload. |
| **Treasurer** | If you **separate** “who holds money” from “who sets rules”—not always distinct in small groups. |
| **Observer / Auditor** | **Read-only** access to totals and history for transparency; cannot change rules or move money. |
| **Platform super-admin** *(software only)* | Operates the **app** (support, billing, policies)—not a role *inside* a single kameeti unless the same person is also a member/organizer. |

**Multi-committee app (typical):**

| Role | Scope |
|------|--------|
| **End user** | Can belong to one or more committees. |
| **Organizer** | Can create/manage **their** committees and members (per product permissions). |
| **System admin** | Whole platform administration. |

---

## Cash-flow logic (timing)

This table describes **position in time**, not app permissions.

| Position in cycle | Effect |
|-------------------|--------|
| **Early receiver** | Gets the lump sum **before** having paid over the whole cycle—**early access** to pooled money, backed by trust that they keep paying if the rules require it. |
| **Late receiver** | Pays for many periods **before** receiving—like **forced saving** with a **delayed** lump payout. |

There is usually **no bank-style interest**; timing and group rules determine who benefits from **liquidity**. (Bidding variants may look like premiums or discounts—group-specific.)

---

## Joining in the middle of a cycle

There is **no single legal template** for informal kameetis—groups decide. Typical patterns:

| Approach | What usually happens |
|----------|----------------------|
| **Wait for next cycle** | New person starts only when a **new** cycle begins. **Simplest** for bookkeeping. |
| **Join at the end of the line** | Newcomer’s turn comes **after** existing members who joined first; pays from join date until their slot. |
| **Buy-in / catch-up (Method 1)** | New member pays **past** installments or a lump sum so math matches a full member. |
| **Replacement** | New person takes a **leaver’s** slot; leaver must be **settled** per group rules. |
| **No mid-cycle joins** | Only enroll when a new cycle opens. |

**Summary:** Joins work when **turn order**, **amounts**, and **who pays on which month** are explicit.

---

## Method 1 — Buy-in / catch-up

The new member pays **lump sum or back installments** so they match what they would have paid from **month one** of the current cycle (or another agreed formula). Then they pay the **normal installment** each period going forward.

| Pros | Cons |
|------|------|
| **Same pot size** each month if everyone pays every month. | Requires **upfront** money or a catch-up schedule. |
| Newcomer is **economically** like an original member. | Formula must be exact (which months, what if membership changes). |

---

## Method 2 — Mid join, variable pots, balanced totals

**Core rules (aligned with the worked example):**

1. New member **does not** pay for months **before** joining; pays **from join month** onward.
2. While the new member is **not** in the pool, pot = **(number of contributing members) × installment**.
3. After the new member joins, more members may pay each month → pots can **grow**.
4. On the **new member’s** receiving month, members who **already completed** their obligation (totals balanced, **early finishers**) **do not** pay—so the pot can be **smaller** than the maximum-month pot.
5. In the documented example, **each person’s total received = total contributed** (no aggregate profit or loss).

**Formula (per month):**

$$\text{Pot in period } t = (\text{count of members who pay in period } t) \times (\text{installment})$$

The count follows the committee rules (especially who has **completed** and who is **not yet** in the pool).

---

### Worked example: 6 members, 10,000 per month, Member 6 joins in Month 3

**Setup**

| Member | In pool | Months paying | Contribution total |
|--------|---------|-----------------|---------------------|
| Member 1 | From month 1 | Months 1–5 only | **50,000** |
| Member 2 | From month 1 | Months 1–5 only | **50,000** |
| Member 3 | From month 1 | Months 1–6 | **60,000** |
| Member 4 | From month 1 | Months 1–6 | **60,000** |
| Member 5 | From month 1 | Months 1–6 | **60,000** |
| Member 6 (new) | From month 3 | Months 3–6 only | **40,000** |

Member 6 is **not** in the pool in months 1–2 (no contribution).

**Months 1 and 2 — five members in the pool**

- Member 1 receives **50,000** (month 1) → **Members 1–5** × 10,000.  
- Member 2 receives **50,000** (month 2) → **Members 1–5** × 10,000.  
- Member 6: **not** in pool.

**Months 3, 4, and 5 — six members in the pool**

- Members 3, 4, 5 receive **60,000** each → **Members 1–6** × 10,000 each month.

**Month 6 — Member 6’s turn**

- Member 6 receives **40,000** → **Members 3, 4, 5, 6** × 10,000.  
- Members 1 and 2 **do not** pay (already **completed** after 50k paid / 50k received).

**Balance check**

| Member | Contributed | Received | Match |
|--------|-------------|----------|-------|
| 1 | 50,000 | 50,000 | Yes |
| 2 | 50,000 | 50,000 | Yes |
| 3 | 60,000 | 60,000 | Yes |
| 4 | 60,000 | 60,000 | Yes |
| 5 | 60,000 | 60,000 | Yes |
| 6 | 40,000 | 40,000 | Yes |

| Pros | Cons |
|------|------|
| No back-pay for the new member. | Pot **amount differs by month**—must be explained. |
| Per-person **balance**: in = out (this example). | Other turn orders or **second** joiner need a **new** schedule to keep balance. |

**Choosing Method 1 vs Method 2**

- **Method 1** — equal monthly pots (typical), newcomer can afford catch-up.  
- **Method 2** — no back-pay, variable pots, **per-person totals balanced** (in this design).

---

## Leaving, default, and late payment

- **Leaving early** — Often requires **settlement** or a **replacement**; someone who **already received** is usually expected to **keep paying** until the group’s rules are satisfied (unless Method 2 explicitly closes their obligation earlier when totals match).  
- **Late payment** — Grace period, penalties, or renegotiation—group-specific.  
- **Default** — Especially **stop paying after receiving** the pot; others bear the loss in informal settings—**core ROSCA risk**.

---

## Why it persists

- Low formal overhead; works with **social trust**.
- Useful where formal credit is costly or slow.
- Reputation and relationships support **ongoing payment**.

---

## Risks and limitations

- **Default** after payout.  
- **Disputes** — turns, joins, exits, record-keeping.  
- **No regulatory protection** in purely informal arrangements (unlike licensed institutions).  
- **Trust concentration** — opaque cash handling or missing records.

---

## Related concepts

- **ROSCA** — rotating pooled savings groups.  
- **Beesi / ballot committee** — regional variants.  
- **Chit fund** — overlapping term; may be **regulated** in some countries.  
- **Formal alternatives** — banks, microfinance, registered cooperatives.

---

## Quick reference

| Topic | Specification |
|-------|----------------|
| **Minimum roles** | Organizer + members. |
| **Statuses** | Pending → active (not received) → active (received) / completed → or left / defaulted. |
| **Method 1** | Back-pay or lump sum to align with full cycle; pots often **constant** if all pay every month. |
| **Method 2** | Join without past months; pots vary by **who pays** each month; example shows **received = contributed** per person. |
| **Pot formula** | \(\text{Payers in period } t \times \text{installment}\) (under your rules). |
| **Organizer duties** | Rules, collections, ledger, turns, disputes. |

---

*This document is for general cultural and educational explanation only; it is not financial, legal, or religious advice.*
