# UI Generation Prompt — Kameeti – Tradition Meets Tech

Use the sections below **as a single master prompt** for your UI/UX AI (Figma Make, Galileo, v0, Uizard, Midjourney UI, etc.). Adjust **deliverable** wording (e.g. “high-fidelity mobile frames” vs “component library”) at the top for your tool.

---

## COPY-PASTE BLOCK (full prompt)

### Role & output

You are a senior product designer. Design a **complete mobile UI** (iOS and Android conventions, **React Native** mental model) for **“Kameeti – Tradition Meets Tech”** — a community finance app for **Pakistani-style rotating savings committees (kameeti / committee)** with **phone-based accounts**, **WhatsApp-like contact discovery**, **join requests**, **full ledger** (installments, pots, payouts), and a **gamified trust system** (points, 1–5 stars, badges) that updates automatically from behavior.

**Deliverables requested:**

1. **Design system:** color tokens (light + dark), typography scale, spacing, corner radius, elevation/shadows, icon style, primary/secondary/destructive/success/warning colors.
2. **Core components:** buttons (primary, secondary, ghost, destructive), text fields (phone, OTP boxes), list rows (user, group, request), cards, chips/tags, star rating read-only, badge pills, toggles/switches, bottom tab bar, top app bar, FAB, empty states, skeleton loaders, modal/bottom sheet, toast/snackbar.
3. **Full screen set** (listed below) in **mobile portrait** 390×844 safe-area aware frames, with **consistent navigation** model.
4. **States** for critical screens: default, loading, empty, error, success confirmation.
5. **Accessibility:** touch targets ≥44pt, readable contrast, support for larger text.

**Do not** include actual payment processing UI beyond “recorded / pending” labels — the app is a **ledger**, not a wallet.

---

### Product narrative (for tone & visuals)

- **Trust & community:** Visual language should feel **warm, credible, calm** — not casino-like. Stars and badges are **integrity signals**, not childish game loot.
- **Tradition meets tech:** Subtle nod to heritage optional (patterns, typography) but **modern, clean**, globally legible — avoid clichéd stock “cultural” clipart.
- **Clarity over decoration:** Financial numbers (installment, pot, balance) must be **scannable** and **hierarchy clear**.

---

### Technical product summary

- **Auth:** Phone number (E.164) + **OTP**; one account per phone.
- **Friends:** Only **registered users whose numbers exist in the user’s phone contacts** (contact permission). Search within that set.
- **Groups (kameeti):** User can **create** a group (becomes **admin**) or **discover** groups where the **group admin’s phone** is in the user’s contacts.
- **Join:** **Request to join** → **admin accepts or rejects**. Admin sees **requester’s star/trust summary**.
- **Ledger:** Fixed **installment** amount; **periods** (monthly/weekly); **Method 1** (buy-in) or **Method 2** (mid-cycle join, variable pot sizes); mark **who paid** each period and **who receives** the pot; show **expected pot** and per-member **totals**.
- **Reputation (automated):** **Trust points**, **1–5 stars**, **badges**; profile shows score; **visibility** setting: show to everyone / friends only / hide stars.

---

### Information architecture & navigation

**Unauthenticated stack**

1. **Welcome** — hero, tagline “Tradition Meets Tech”, buttons Sign up / Sign in.
2. **Sign up — phone** — country code + number, primary CTA “Send code”, terms/privacy links.
3. **Verify OTP** — 6 digit inputs or single field, resend timer, “Wrong number?” link.

**Authenticated: bottom tabs (4)**

| Tab | Purpose |
|-----|---------|
| **Home** | My kameeti groups (cards). |
| **Discover** | Groups discoverable because admin is in my contacts. |
| **Friends** | Contact-matched registered users. |
| **Profile** | Me: avatar, name, phone masked, stars, points, badges, reputation history, visibility toggle, sign out. |

**Modal / stack screens (from tabs or FAB)**

- **Create group** (multi-step or long form): group name, currency, installment amount, period (monthly/weekly), start date, number of periods, join method **Method 1 / Method 2**, optional note. Primary CTA “Create”.
- **Group dashboard** (inside a group): header with group name, role badge Admin/Member, **current period** (#3 of 6), **next due date**, **this period’s receiver** (name + avatar), **expected pot** (large number), secondary CTA “Record payments” → Period detail.
- **Period detail:** Title “Period 3 — March 2026”, list of **members who must pay** with row = avatar, name, **Paid toggle** or checkbox, **On-time** subtle label if paid before due; footer **Total collected** vs **Expected pot**; highlight **Receiver** row if applicable.
- **Member detail** (in group): user avatar, name, role, **contributed total**, **received total**, **balance**, timeline of periods (paid / received).
- **Group settings** (admin): edit name/rules (if allowed), member list, **Join requests** entry, archive group, leave (if member).
- **Join requests inbox** (admin): list of requests — each row: requester avatar, name, **star rating strip (1–5)**, trust label (“High reliability”), buttons **Accept** / **Reject**, timestamp.
- **Group preview** (non-member, from Discover): group name, admin name (from contacts), rules summary (installment, period count, method), member count, primary **Request to join**, secondary Share (optional).
- **User public profile** (from Friends): avatar, name, stars, badges row, optional points if visibility allows; CTA message or invite (optional).

---

### Screen-by-screen UI elements (checklist for designer)

**Welcome**

- Logo/wordmark area, short subtitle explaining kameeti in one line.
- Primary: Get started; Secondary: Sign in.

**Home (groups list)**

- Section title “Your committees”.
- **Group card:** name, status pill (Active / Completed), subtitle “Next: Period 4 • Due 28 Mar”, optional chip “Payment due”.
- FAB: **+ New kameeti**.
- Empty: illustration, “No groups yet”, CTA Create.

**Discover**

- Search bar (filter group names).
- **Group row/card:** name, **Admin: [name]** with small “in your contacts” badge, installment, member count, chevron.
- Empty: “No groups match your contacts” + tip to add numbers.

**Friends**

- Search bar.
- **Contact permission** banner if not granted (Enable contacts).
- **User row:** avatar, name, **star row**, optional “On Kameeti” badge.
- Empty: “None of your contacts are on Kameeti yet” + Share app.

**Profile**

- Large avatar, edit icon.
- Display name, masked phone (+92 ••• ••• 1234).
- **Reputation block:** large **star display**, numeric **Trust points**, horizontal **badge** chips (icon + label).
- List: **Reputation history** (“+10 On-time payment — 2 Mar”), **Who can see my trust** (segmented control: Everyone / Friends only / Hidden).
- Sign out (destructive style at bottom).

**Create group**

- Use clear sections: **Basics**, **Money & schedule**, **Rules**.
- Method 1 vs Method 2 as **segmented control** or radio cards with **short explanation** under each (one line).
- Currency + amount field with thousand separators.
- Date picker for start.

**Group dashboard**

- Progress indicator: **Period X of Y** (linear progress).
- Hero card: **This period’s pot** (PKR 60,000), **Receiver:** name.
- Chips: Method badge, Weekly/Monthly.

**Period detail**

- Sticky summary bar: Expected pot / Collected so far.
- List with clear **Paid** state colors (green check vs gray).

**Join requests**

- Urgent but calm; **stars** must be visible at a glance for admin trust decision.

---

### Design system direction (suggestions — you may refine)

- **Primary color:** Deep teal or emerald (trust, growth); **Accent:** warm gold/amber for stars (use sparingly).
- **Neutrals:** Cool gray backgrounds, white/off-white cards; **dark mode:** deep charcoal surfaces.
- **Typography:** One **display** font for headings (optional slight personality) + **system UI** or Inter for body; **tabular figures** for money.
- **Shapes:** 12–16px card radius; soft shadows for cards.
- **Icons:** Outlined, 24px, consistent stroke — money, calendar, users, shield/trust, star.

---

### Microcopy samples (use or adapt)

- OTP: “Enter the 6-digit code we sent you.”
- Contacts: “See which friends use Kameeti — we only match phone numbers you already have.”
- Discover: “Groups run by people in your contacts.”
- Trust: “Your trust score updates when you pay on time and finish cycles.”
- Period: “Who pays this period” / “Receiver this period”.

---

### Explicit non-goals for UI

- No slot-machine or excessive gamification animations.
- No cluttered tables on small screens — prefer **cards** and **stepped flows**.

---

### File naming (for handoff)

Prefix frames: `Auth_Welcome`, `Main_Home`, `Main_Discover`, `Group_Dashboard`, `Group_PeriodDetail`, `Admin_JoinRequests`, `Profile_Me`, etc.

---

## END OF COPY-PASTE BLOCK

---

## Notes for you (human)

- If the AI **truncates**, split prompts by **Auth**, **Main tabs**, **Group flows**, **Admin**, then ask for **design system** first.
- For **Figma**: ask for **Auto Layout**, **variables** for colors, and **component properties** for button variants.
- Reference domain math is in [kameeti-system.md](../kameeti-system.md); UX does not need to show formulas, only **results** (pot, balances).
