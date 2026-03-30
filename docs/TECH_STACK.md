# Tech Stack

## Core

| Technology | Role |
|------------|------|
| **React Native (CLI)** | iOS + Android |
| **TypeScript** | Shared types with backend or OpenAPI client |
| **React Navigation** | Auth + tabs + stacks |

## Backend (choose one pattern)

| Option | Notes |
|--------|--------|
| **Firebase** | Auth (phone OTP), Firestore rules for groups/members/requests; good for fast MVP. |
| **Supabase** | Postgres + RLS + Auth; phone OTP via provider. |
| **Custom Node/Django + Postgres** | Full control; implement OTP via **Twilio** / **MessageBird** / local SMS gateway. |

**Requirements:** Unique `User` by phone; secure APIs for groups, `JoinRequest`, and ledger CRUD.

## Auth & identity

- **Phone OTP** via Firebase Phone Auth, Supabase Auth, or custom SMS.
- Store **refresh token** in **Keychain** / **EncryptedSharedPreferences**.

## Contacts (React Native)

| Library | Role |
|---------|------|
| **`react-native-contacts`** or **`@react-native-community/contacts`** | Read device contacts; extract phone numbers. |
| **`libphonenumber-js`** (or similar) | Normalize to **E.164** before API match. |

## Networking & cache

| Library | Role |
|---------|------|
| **TanStack Query** | Server state, caching, retries |
| **`axios` or `fetch`** | HTTP client |
| Optional: **SQLite** / **WatermelonDB** | Offline cache for ledger |

## Reputation (server)

| Mechanism | Role |
|-----------|------|
| DB triggers / Cloud Functions / queue workers | On `Payment` or `Period` close, emit **reputation** side effects ([REPUTATION_AND_GAMIFICATION.md](./REPUTATION_AND_GAMIFICATION.md)) |
| Config store or JSON | Versioned **point weights** and star bands |

## Supporting

| Library | Role |
|---------|------|
| `zod` | Runtime validation of API payloads |
| `date-fns` | Period dates |
| `@react-native-firebase/messaging` or **Expo push** (if applicable) | Push: join requests, approvals |

## Dev tooling

- ESLint + Prettier + Jest

## Internationalization

- `react-i18next` — English + Urdu when ready
