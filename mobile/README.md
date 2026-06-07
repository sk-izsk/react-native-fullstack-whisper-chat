# Mobile App

This folder contains the React Native mobile client for Whisper Chat. It targets iOS and Android through Expo and mirrors the core product behavior of the web client while keeping mobile-native routing and interaction patterns.

## Stack

- React Native
- Expo
- Expo Router
- TypeScript
- Clerk Expo
- TanStack Query
- Zustand
- NativeWind
- Socket.IO Client
- Sentry
- `ky`

## Core Features

- social sign-in flow
- authenticated user sync to backend
- chat list and message history
- new chat creation
- realtime message delivery
- typing indicators
- presence tracking
- optimistic sends
- mobile error monitoring

## Why This Stack Is Strong

### Expo

Expo reduces native setup friction and keeps the project focused on product engineering instead of infrastructure setup.

### Expo Router

File-based routing keeps navigation structure readable and maps naturally to auth screens, tabs, chat detail, and modal flows.

### TanStack Query + Zustand

The same clear state split used on web also works well here:

- Query handles backend-owned data
- Zustand handles socket-oriented transient state

That keeps the mobile app easier to reason about as features grow.

### Sentry

Sentry is especially useful on mobile because device-specific bugs and runtime issues are harder to inspect manually than browser errors.

## Important Folders

- `app/`
- `components/`
- `hooks/`
- `lib/`

## Engineering Notes

- root-level auth sync and socket connection keep route components cleaner
- keyboard inset logic is isolated instead of mixed through the whole chat screen
- chat room behavior is extracted into hooks
- socket logic is split into focused modules for readability and safer refactors

## Run Locally

```bash
cd mobile
bun install
npx expo start
```

## Type Checking

```bash
cd mobile
./node_modules/.bin/tsc --noEmit -p tsconfig.json
```

## Environment

Relevant values from the current code:

- `EXPO_PUBLIC_API_URL`
- Clerk publishable key configuration used by the app

## Learning Value

This mobile app is a good reference for:

- building a realtime React Native product
- combining auth, navigation, sockets, and cached data
- maintaining cross-platform product consistency without forcing a shared UI layer
