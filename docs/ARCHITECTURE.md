# Architecture

## Principles

- **Server authority** for accounts, phone uniqueness, groups, memberships, join requests, and **reputation** (points/stars/badges) — **never** trust client-submitted scores.
- **Ledger domain** stays in **pure TypeScript** modules ([kameeti-system.md](../kameeti-system.md)) — same formulas client-side for validation; server should re-validate on write.
- **Thin UI:** screens call **API hooks** / repositories; no business rules in styles.
- **Offline-friendly (optional):** cache groups and last ledger state locally; queue writes or read-only when offline (product decision).

## Layers

```
┌─────────────────────────────────────────┐
│  Screens (React Native)                 │
├─────────────────────────────────────────┤
│  State: TanStack Query / Zustand        │
├─────────────────────────────────────────┤
│  API client (REST or Firebase SDK)      │
│  + auth interceptors                    │
├─────────────────────────────────────────┤
│  Backend (server): reputation pipeline  │
│  events → apply points → UserReputation │
├─────────────────────────────────────────┤
│  Domain (pure TS): pot, eligibility,    │
│  balances — unit tested                 │
├─────────────────────────────────────────┤
│  Optional: SQLite cache                 │
└─────────────────────────────────────────┘
```

## Suggested folder layout (`src/`)

```
src/
  app/                 # Providers: QueryClient, AuthContext
  navigation/          # Auth stack + main tabs + group stack
  screens/
    auth/
    profile/
    friends/
    discover/
    groups/
  components/
  domain/              # Unchanged: committee/, period/, member/
  api/                 # endpoints: auth, users, groups, joinRequests, ledger
  hooks/               # useAuth, useContactMatch, useGroup(id), useReputation(userId)
  services/
    contacts.ts        # Read + normalize phones → batch match API
  # Server-side (not in RN): reputation worker on Payment/Period updates
  theme/
  types/               # Align with DATA_MODEL
```

## Key modules

| Module | Responsibility |
|--------|----------------|
| `services/contacts.ts` | Permission, read contacts, normalize to E.164, call **match** API. |
| `api/groups.ts` | CRUD group, discoverable list, join request. |
| `domain/period/eligibility.ts` | Payer set + expected pot (Method 2). |

## Navigation

- **React Navigation:** unauthenticated stack → authenticated tabs + modal stacks for group detail.
- Type-safe `ParamList` for all routes.

## Testing

- **Unit tests:** `domain/*` with fixture from [kameeti-system.md](../kameeti-system.md).
- **Integration:** API mocks for join flow; optional Detox later.

## Error handling

- Network errors: toast + retry on mutations.
- 409 on duplicate phone / duplicate join request: user-facing message.
