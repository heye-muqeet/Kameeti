# Kameeti – Tradition Meets Tech

*React Native (CLI) — informal rotating savings committees (kameeti / committee): members, installments, payouts, Method 1 & Method 2.*

**Planned product flow:** **Sign up** with phone (OTP) → **profile** (with **trust score / stars / badges**) → **friends** (only registered users in **device contacts**, unique by phone) → **create** a kameeti group or **discover** groups whose **admin is in your contacts** → **request to join** → **admin accepts** → ledger inside the group. **Reputation** is **automated** from on-time payments and participation ([docs/REPUTATION_AND_GAMIFICATION.md](./docs/REPUTATION_AND_GAMIFICATION.md)). User journey: [docs/USER_FLOW.md](./docs/USER_FLOW.md).

## Documentation

| Document | Description |
|----------|-------------|
| [Domain specification](./kameeti-system.md) | Business rules: ROSCA, Method 1 & 2, roles, statuses, worked example |
| [Documentation index](./docs/README.md) | Full list of app design and implementation docs |

## Prerequisites (when you scaffold the app)

- Node.js (LTS)
- JDK (for Android)
- Xcode (for iOS, macOS only)
- Android Studio / SDK
- React Native CLI: `npx @react-native-community/cli`

## Quick start (after project exists)

```bash
npm install
# Android
npx react-native run-android
# iOS (macOS)
cd ios && pod install && cd ..
npx react-native run-ios
```

> **Note:** This repository currently contains **specification and documentation** only. Initialize the native project with the React Native CLI when you are ready to implement (example folder name without spaces: `npx @react-native-community/cli init KameetiTraditionMeetsTech`). Set the **display name** to **Kameeti – Tradition Meets Tech** in `app.json` / Android `strings.xml` / Xcode as needed.

## License

Specify your license when you publish the app.
