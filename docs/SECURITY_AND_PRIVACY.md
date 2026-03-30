# Security & Privacy

## Data handled

- **Phone numbers** — account identity; must be **unique** and verified by OTP.
- **Device contacts** — read only with OS permission; used to **match** registered users; avoid uploading raw contact names if not needed (names can stay on device).

## Recommendations

| Topic | Practice |
|-------|----------|
| **Transport** | TLS for all APIs. |
| **Tokens** | Short-lived access + refresh; store in **Keychain** / Keystore. |
| **Contacts upload** | Send **normalized E.164** list in batches; document in privacy policy **what** is sent and **why**. |
| **Matching** | Prefer **minimal** payload; optional future: hashed numbers if legal/product requires. |
| **Display** | Mask phone in UI where possible (e.g. last 4 digits). |
| **Logs** | No full phone numbers in client logs in release builds. |
| **Admin actions** | Accept/reject join only for **your** groups (server-side authorization). |

## Reputation

- **Server-only** point changes; clients **display** only.
- **Visibility** setting (`everyone` / `friends_only` / `hidden`) controls what others see on profile.
- Event history may be **sensitive**; apply same retention policy as account data.

## Permissions copy (user-facing)

Explain clearly: contacts help find **friends and groups** where the **admin is someone you know** — not to spam unrelated users. Explain that **trust scores** come from **payment and participation behavior** in the app.

## Legal

- Privacy policy + terms covering OTP, contacts, and ledger disclaimer (app does not move money).

## Threats

- **SIM swap** — same as any SMS OTP app; document risk.
- **Stolen device** — biometrics + session revocation (future).
