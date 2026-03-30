# Features Specification

Requirements trace to [kameeti-system.md](../kameeti-system.md) for **ledger rules** and to [USER_FLOW.md](./USER_FLOW.md) for **account & discovery**.

---

## FR-0 — Sign up & session

- **FR-0.1** **Sign up** with **phone number**; identity is **unique per phone** (E.164 normalization on client and server).
- **FR-0.2** **OTP verification** (SMS or provider-supported channel) before account is active.
- **FR-0.3** **Sign in** returning users with same phone + OTP (or refresh token session per [SECURITY_AND_PRIVACY.md](./SECURITY_AND_PRIVACY.md)).
- **FR-0.4** Secure **session** storage (Keychain / Keystore); optional biometric re-prompt.

## FR-1 — Profile

- **FR-1.1** **Profile screen:** display name, phone (read-only or masked), optional avatar.
- **FR-1.2** Edit display name / avatar; phone change is **out of scope** for MVP or requires re-verification (product decision).
- **FR-1.3** **Reputation display:** **trust score** (points) and/or **stars (1–5)** and **badges** per [REPUTATION_AND_GAMIFICATION.md](./REPUTATION_AND_GAMIFICATION.md); respect **visibility** (`everyone` / `friends_only` / `hidden`).
- **FR-1.4** **Own profile:** optional **history** of recent reputation events (why points changed).

## FR-2 — Contacts & friend discovery (WhatsApp-like)

- **FR-2.1** Request **READ_CONTACTS** (Android) / **Contacts** (iOS) when user opts in to discovery features.
- **FR-2.2** **Friends / directory:** list **registered users** whose **phone number** appears in the user’s **device contacts** (match after **normalization** to same format as server).
- **FR-2.3** **Search** within that set (by name / phone) — no global search of every user by default (privacy).
- **FR-2.4** Optional: explicit **friend request** vs implicit “can invite to group” — MVP can treat contact-matched users as **invitable** without a separate friend graph.

## FR-3 — Kameeti group creation & ownership

- **FR-3.1** Authenticated user can **create a kameeti group** with: name, **installment amount**, **period** (monthly / weekly), **start date**, **join method** `METHOD_1_BUYIN` | `METHOD_2_MID_JOIN`, **planned period count**, **payout order** (fixed list for MVP).
- **FR-3.2** Creator becomes **admin (organizer)**; `adminUserId` stored server-side.
- **FR-3.3** Archive / complete group per lifecycle rules.

## FR-4 — Discover groups (admin in my contacts)

- **FR-4.1** **Discover** (or search) shows **kameeti groups** where:
  - the group’s **admin** is a **registered user**, and  
  - the **admin’s phone number** is present in the **current user’s device contacts** (same matching rules as FR-2).
- **FR-4.2** User can open group **preview** (non-member): name, rules summary, member count if policy allows — **no** sensitive ledger until member.

## FR-5 — Join requests

- **FR-5.1** **Request to join** creates a record `pending` for that `groupId` + `requesterUserId` (unique pending per user per group).
- **FR-5.2** **Admin** sees list of pending requests with requester name/phone (masked per policy).
- **FR-5.3** Admin **Accept** → user becomes **group member**; server creates/links **CommitteeMember** (and ledger) per agreed rules (join period for Method 2, etc.).
- **FR-5.4** Admin **Reject** → request `rejected`; optional push/in-app notification to requester.
- **FR-5.5** Admin may **invite** users from FR-2 list without a request (optional shortcut).

## FR-6 — Committee members & ledger (domain)

- **FR-6.1** **Member** linked to **User** via `userId` where applicable; unique `(groupId, userId)` for active membership.
- **FR-6.2** Assign **join period** (Method 2), **buy-in** (Method 1), **exit period** (Method 2), roles `organizer` | `member`.
- **FR-6.3** Member **status:** `pending` | `active_not_received` | `active_received` | `completed` | `left` | `defaulted` (see domain doc).
- **FR-6.4** Replace / remove member with audit trail (admin action).

## FR-7 — Periods & ledger

- **FR-7.1** Generate **periods** from group settings.
- **FR-7.2** **Pot (Method 2):** `pot = count(payers in period) × installment` per [kameeti-system.md](../kameeti-system.md).
- **FR-7.3** **Method 1** payouts per rules + buy-in adjustments.
- **FR-7.4** Mark **payment** per member per period; mark **payout** for receiver.

## FR-8 — Balances & validation

- **FR-8.1** Per-member **contributed / received / balance**; warnings on mismatch.
- **FR-8.2** **QA fixture:** 6 members, 10k, M6 joins month 3 ([kameeti-system.md](../kameeti-system.md)).

## FR-9 — Views & notifications

- **FR-9.1** Dashboard: current period, receiver, expected pot.
- **FR-9.2** Period detail: payers, toggles, pot.
- **FR-9.3** **Push notifications** (recommended): join request to admin; request outcome to requester; optional payment reminders.

## FR-10 — Export (optional)

- **FR-10.1** Export CSV/PDF for a group (admin).

## FR-11 — Reputation, gamification & automation

- **FR-11.1** **Track behavior** automatically from ledger data: **payment on time** vs period **due date**; **join/active on time**; **cycle completion** without default; optional admin SLAs for join requests.
- **FR-11.2** **Award** and **deduct** **trust points** server-side only; **idempotent** per source event (e.g. payment id).
- **FR-11.3** **Derive** **star level** (1–5) from points using **versioned** bands in server config.
- **FR-11.4** **Badges** for milestones (e.g. first cycle complete, on-time streak); stored as earned records; shown on profile.
- **FR-11.5** **Profile (others):** show stars/badges (and points if visibility allows) so users can assess **trust** before inviting or approving joins.
- **FR-11.6** **Join request (admin view):** show **requester reputation summary** (stars).
- **FR-11.7** **No manual reputation edits** in normal flows; corrections via **support** or **compensating events** only.
- **FR-11.8** **Optional rewards:** cosmetic or ordered discover—define anti-abuse rules before launch.

## Out of scope (unless added later)

- In-app money movement or payment gateways.
- Legal registration of chit funds per jurisdiction.
- Global public search of all users by phone without contact match.
