# Screens & Navigation

Aligned with [USER_FLOW.md](./USER_FLOW.md) and [FEATURES_SPEC.md](./FEATURES_SPEC.md).

## Navigation graph (recommended)

```
AuthStack (unauthenticated)
  ├── Welcome
  ├── SignUpPhone
  ├── VerifyOTP
  └── SignInPhone (or merged with OTP)

MainApp (authenticated)
  └── MainTabs
        ├── HomeGroups          # my kameeti groups
        ├── Discover            # groups whose admin is in contacts
        ├── Friends             # users on platform from my contacts
        └── Profile

GroupStack (nested)
  ├── GroupDashboard
  ├── PeriodDetail
  ├── MemberDetail
  ├── GroupSettings           # admin: edit rules, members, requests
  ├── JoinRequestsInbox       # admin only
  └── CreateGroup
```

## Screen list

### Auth & profile

| Screen | Purpose |
|--------|---------|
| **Welcome** | Value prop; CTA sign up / sign in. |
| **SignUpPhone** | Enter phone; request OTP. |
| **VerifyOTP** | Enter code; create session. |
| **Profile** | Name, avatar, phone (masked), **stars / trust points / badges**, reputation history (own), visibility setting, sign out. |
| **UserPublicProfile** | *(optional route)* When viewing another user: **stars + badges** (and points if allowed); same cards as Friends row detail. |

### Social & discovery

| Screen | Purpose |
|--------|---------|
| **Friends** | List/search **registered users** in **device contacts** (after permission); each row shows **star rating** summary. |
| **Discover** | List **kameeti groups** whose **admin** is in **contacts** (and registered). Search/filter optional. |
| **GroupPreview** | Non-member: summary; CTA **Request to join**. |

### Admin / requests

| Screen | Purpose |
|--------|---------|
| **JoinRequestsInbox** | Pending **Request to join** list; **Accept** / **Reject**; show **requester stars / trust summary** ([REPUTATION_AND_GAMIFICATION.md](./REPUTATION_AND_GAMIFICATION.md)). |

### Kameeti ledger (member/admin)

| Screen | Purpose |
|--------|---------|
| **HomeGroups** | My groups; badges (pending request, next payment). |
| **CreateGroup** | Name, installment, period, Method 1/2, length, start; user becomes admin. |
| **GroupDashboard** | Current period, receiver, expected pot, CTA period detail. |
| **PeriodDetail** | Payers, paid toggles, pot. |
| **MemberDetail** | User-linked member totals and history. |
| **GroupSettings** | Admin: members, rules, archive. |

## User flows (short)

### First-time

Welcome → SignUpPhone → VerifyOTP → **Contacts permission** (Friends or Discover) → Profile optional → HomeGroups (empty) or Discover.

### Discover & join

Discover → tap group → GroupPreview → **Request to join** → (admin) JoinRequestsInbox → Accept → user appears in **HomeGroups** with ledger access.

### Create group

HomeGroups → CreateGroup → fill form → group appears; admin invites from **Friends** or waits for **Discover** + requests (if group discoverable by rule).

## Empty states

- **Friends:** “No contacts on Kameeti yet” / share app CTA.
- **Discover:** “No groups match — add someone’s number to contacts” or “no admin in your contacts.”
- **Requests:** “No pending requests.”

## Accessibility

Large targets; readable OTP fields; dynamic type.
