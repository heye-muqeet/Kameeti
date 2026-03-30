# Data Model

The app uses a **server-backed account and social layer** plus **kameeti ledger** data (see [FEATURES_SPEC.md](./FEATURES_SPEC.md)). Field names are suggestions.

---

## A. Identity & social (server authority)

### `User` (account)

| Field | Type | Notes |
|-------|------|--------|
| `id` | UUID | Primary key |
| `phoneE164` | string | **Unique**; normalized international format |
| `displayName` | string | |
| `avatarUrl` | string? | Optional |
| `createdAt` | ISO datetime | |
| `updatedAt` | ISO datetime | |
| `reputationVisibility` | enum | `everyone` \| `friends_only` \| `hidden` — who sees stars/points (see [REPUTATION_AND_GAMIFICATION.md](./REPUTATION_AND_GAMIFICATION.md)) |

**Rule:** One row per phone number globally.

### `UserReputation` (materialized summary)

| Field | Type | Notes |
|-------|------|--------|
| `userId` | PK, FK → User | One row per user |
| `trustPoints` | int | Monotonic with floor/ceiling caps |
| `starLevel` | int | 1–5, **derived** from `trustPoints` bands |
| `updatedAt` | ISO datetime | |

### `ReputationEvent` (audit + automation)

| Field | Type | Notes |
|-------|------|--------|
| `id` | UUID | |
| `userId` | FK → User | Who is affected |
| `eventType` | string | e.g. `payment_on_time`, `payment_late`, `cycle_completed`, `default` |
| `deltaPoints` | int | Change applied |
| `sourceType` | string | e.g. `payment`, `membership`, `join_request` |
| `sourceId` | string | Idempotency key |
| `metadata` | JSON? | Extra context |
| `createdAt` | ISO datetime | |

### `BadgeDefinition` (config)

| Field | Type | Notes |
|-------|------|--------|
| `id` | string | e.g. `first_cycle_complete` |
| `title` | string | Display |
| `description` | string | |
| `iconKey` | string | Asset key |

### `UserBadge`

| Field | Type | Notes |
|-------|------|--------|
| `userId` | FK | |
| `badgeId` | FK | |
| `awardedAt` | ISO datetime | |
| **PK** | `(userId, badgeId)` | |

### `Session` / tokens

Managed by auth provider (JWT refresh, or Firebase session). Not necessarily a table in your DB if using BaaS.

### `KameetiGroup` (committee at network level)

| Field | Type | Notes |
|-------|------|--------|
| `id` | UUID | |
| `name` | string | |
| `adminUserId` | FK → User | Creator / organizer |
| `installmentAmount` | decimal | |
| `currencyCode` | string | e.g. `PKR` |
| `periodType` | enum | `monthly` \| `weekly` |
| `joinMethod` | enum | `METHOD_1_BUYIN` \| `METHOD_2_MID_JOIN` |
| `startDate` | date | |
| `plannedPeriodCount` | int | |
| `status` | enum | `active` \| `completed` \| `archived` |
| `createdAt` | ISO datetime | |

### `JoinRequest`

| Field | Type | Notes |
|-------|------|--------|
| `id` | UUID | |
| `groupId` | FK | |
| `requesterUserId` | FK → User | |
| `status` | enum | `pending` \| `accepted` \| `rejected` \| `cancelled` |
| `createdAt` | ISO datetime | |
| `resolvedAt` | ISO datetime? | |

**Constraint:** Unique `(groupId, requesterUserId)` while `pending` (or one active request per pair).

### `GroupMembership`

| Field | Type | Notes |
|-------|------|--------|
| `id` | UUID | |
| `groupId` | FK | |
| `userId` | FK → User | |
| `role` | enum | `admin` \| `member` |
| `status` | enum | `active` \| `left` \| `removed` |
| `joinedAt` | ISO datetime | |

**Constraint:** Unique `(groupId, userId)` for active membership.

---

## B. Ledger (per group; server or synced)

Links app users to **committee slots** for payouts.

### `CommitteeMember` (ledger row)

| Field | Type | Notes |
|-------|------|--------|
| `id` | UUID | |
| `groupId` | FK | |
| `userId` | FK → User | Required when member is app user |
| `sortOrder` | int | Payout order (1-based) |
| `joinPeriodIndex` | int | Method 2 |
| `exitAfterPeriodIndex` | int? | Method 2 |
| `buyInAmount` | decimal? | Method 1 |
| `ledgerStatus` | enum | See lifecycle in [kameeti-system.md](../kameeti-system.md) |
| `notes` | string? | |

### `Period`, `Payment`, `Payout`

| Entity | Key fields |
|--------|------------|
| `Period` | `groupId`, `index`, `receiverMemberId`, `expectedPot`, `dueAt` (deadline for payments—drives reputation) |
| `Payment` | `periodId`, `committeeMemberId`, `amount`, `paidAt`, `status` — compare `paidAt` vs `Period.dueAt` for on-time scoring |
| `Payout` | Confirms receiver’s lump sum for that period |

**Computation (Method 2):** [kameeti-system.md](../kameeti-system.md) — eligible payers × installment.

**Reputation:** scoring reads `Payment` + `Period.dueAt`; see [REPUTATION_AND_GAMIFICATION.md](./REPUTATION_AND_GAMIFICATION.md).

---

## C. Contact matching (client + API)

**Not** a stored “social graph” by default.

1. Client reads contacts (permission), extracts **phone numbers**, normalizes to E.164.
2. Client calls **`POST /contacts/match`** with a batch of numbers (or secure variant: hashed numbers if you implement privacy-preserving matching).
3. Server returns **`userId`**s for registered accounts.
4. **Friends list** = returned users (optionally merged with contact display names locally).

**Discover groups:**

1. Same matched `userId` set from contacts.
2. **`GET /groups/discoverable`** with same batch or server-side stored “last match” — returns groups where `adminUserId` ∈ **users whose phones are in device contacts** (server recomputes using submitted numbers + `User.phoneE164`).

Implementation detail: pass normalized E.164 list each time or cache server-side with user consent and TTL.

---

## D. Local cache (optional)

- SQLite / MMKV cache of groups, periods, payments for **offline read** and faster UI; **server** remains source of truth for membership and requests.

## Indexes (server)

- `User(phoneE164)` unique.
- `JoinRequest(groupId, requesterUserId)`.
- `GroupMembership(groupId, userId)`.
- `Period(groupId, index)` unique.

## Migrations

Version schema from day one; document changes to `CommitteeMember` when join rules evolve.
