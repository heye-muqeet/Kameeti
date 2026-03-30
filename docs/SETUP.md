# Development Setup (React Native CLI)

Use when you initialize the native project alongside this documentation.

## 1. Environment

Install:

- **Node.js** (LTS)
- **Watchman** (macOS, recommended)
- **JDK 17** (or version compatible with your RN version—check RN docs)
- **Android Studio** (SDK, emulator, `ANDROID_HOME`)
- **Xcode** (macOS only, for iOS)

## 2. Create the app

From the parent folder (not inside this doc-only repo if you prefer separation):

```bash
npx @react-native-community/cli@latest init KameetiTraditionMeetsTech --version latest
cd KameetiTraditionMeetsTech
```

Use **Kameeti – Tradition Meets Tech** as the user-visible app name (iOS **Display Name**, Android `app_name` / launcher label) after init; the CLI project folder uses a name **without spaces** (above).

Enable TypeScript if the template asks, or add TS per React Native docs.

## 3. Copy documentation (optional)

Copy `kameeti-system.md` and the `docs/` folder into the new project root, or keep this repo as the **spec repo** and clone both side by side.

## 4. Run

```bash
# Android
npx react-native run-android

# iOS (macOS)
cd ios && bundle exec pod install && cd ..
npx react-native run-ios
```

## 5. Troubleshooting

- **Metro:** `npx react-native start --reset-cache`
- **Android build:** verify `JAVA_HOME`, SDK licenses, emulator running
- **iOS:** CocoaPods Ruby version; `pod repo update` if needed

Always follow the **official React Native** environment setup for your OS and RN version—links change; search “React Native environment setup” on https://reactnative.dev .
