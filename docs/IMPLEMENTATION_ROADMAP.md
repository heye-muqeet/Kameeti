# Implementation Roadmap

Phased delivery; adjust timelines to team size.

## Phase 0 — Bootstrap

- [ ] React Native CLI + TypeScript; navigation shell
- [ ] Choose backend (Firebase / Supabase / custom)
- [ ] Folder layout per [ARCHITECTURE.md](./ARCHITECTURE.md)

**Exit:** App runs; placeholder auth screens.

## Phase 1 — Auth & profile

- [ ] Phone input + E.164 normalization
- [ ] OTP sign up / sign in; unique phone server-side
- [ ] Profile screen; session persistence

**Exit:** User can sign up, reopen app, see profile.

## Phase 2 — Contacts & matching

- [ ] Contacts permission + read numbers
- [ ] `POST /contacts/match` (or equivalent): return registered `User`s
- [ ] **Friends** screen: list + search in matched set

**Exit:** “Friends” shows only contact-backed registered users.

## Phase 3 — Groups & join flow

- [ ] Create **KameetiGroup**; set admin = current user
- [ ] **Discover** groups: admin phone ∈ user’s contacts + registered
- [ ] **Join request** + **admin inbox** Accept / Reject
- [ ] Push notifications (optional but recommended)

**Exit:** End-to-end [USER_FLOW.md](./USER_FLOW.md) without full ledger UI.

## Phase 4 — Ledger domain + UI

- [ ] Types + `CommitteeMember`, `Period`, `Payment`, `Payout` per [DATA_MODEL.md](./DATA_MODEL.md)
- [ ] Domain functions + tests (**6-member / 10k** fixture)
- [ ] Group dashboard, period detail, payment toggles

**Exit:** Full cycle for Method 1 & 2 per [kameeti-system.md](../kameeti-system.md).

## Phase 5 — Reputation & gamification

- [ ] `Period.dueAt` + compare to `Payment.paidAt` for on-time detection
- [ ] Server: `ReputationEvent` + idempotent handlers; `UserReputation` materialized
- [ ] Stars/badges config (versioned); profile + Friends row + join-request preview UI
- [ ] `reputationVisibility` setting

**Exit:** Scoring runs **without manual steps** when payments are recorded.

## Phase 6 — Polish

- [ ] i18n, accessibility, error states
- [ ] Export CSV (admin)
- [ ] Offline read cache (optional)

## Milestones

| ID | Criterion |
|----|-----------|
| **M1** | OTP auth + unique phone |
| **M2** | Contact match + friends list |
| **M3** | Discover + join request + admin accept |
| **M4** | Ledger QA scenario passes |
| **M5** | Reputation updates automatically on payment events |
