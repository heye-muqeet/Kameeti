# Product Overview

**Product name:** **Kameeti – Tradition Meets Tech**

## Vision

A **React Native (CLI)** mobile application that combines:

1. **Trusted discovery** — users sign up with **phone numbers**; find friends and groups **through device contacts** (similar to WhatsApp’s contact model).
2. **Kameeti management** — create groups, run **Method 1** and **Method 2** cycles, record payments and payouts per [kameeti-system.md](../kameeti-system.md).
3. **Governed membership** — **join requests** approved by **group admin**.
4. **Trust & reputation** — **automated** tracking of on-time payments and participation; **points / stars / badges**; **visible** on profiles to reward reliability and encourage accountability ([REPUTATION_AND_GAMIFICATION.md](./REPUTATION_AND_GAMIFICATION.md)).

## Target users

| Persona | Needs |
|---------|--------|
| **Member** | Sign up, profile, see friends on platform (from contacts), join groups (request → accept), pay/receive in ledger. |
| **Admin** | Create group, approve/reject join requests, manage cycle and ledger. |
| **Privacy-conscious user** | Clear contact usage; only **matched** phones touch the server per policy; control **who sees** reputation. |

## Goals

- **Identity:** **Unique user per phone number** (E.164).
- **Discovery:** **Friends** = registered users present in **my contacts**; **discoverable groups** = those whose **admin is in my contacts**.
- **Ledger accuracy:** Pots and balances follow domain rules.
- **Transparency:** Members see agreed history within the group (per permissions).
- **Trust signals:** Reputation is **computed from behavior**, not subjective ratings; **server-automated** updates.

## Scope (product)

- **Backend** required: auth (OTP), users, groups, memberships, join requests, ledger API (or BaaS rules).
- **Contacts:** OS permission + normalized phone matching.
- **Method 1 & Method 2** scheduling and validation.
- **Reputation engine:** event-driven points, stars, badges; materialized `UserReputation`; configurable scoring version.

## Non-goals (initial)

- Holding or transferring real money inside the app (ledger only).
- Regulated chit-fund registration in any jurisdiction.
- Public directory of **all** users without contact matching (default).

## Success criteria

- User completes **sign up → profile → contact match → discover group (admin in contacts) → request → admin accept →** see ledger.
- **6-member / 10,000** Method 2 scenario passes QA ([kameeti-system.md](../kameeti-system.md)).
