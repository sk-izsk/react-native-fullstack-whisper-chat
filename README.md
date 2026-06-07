# Whisper Chat

Whisper Chat is a full-stack real-time messaging project built across three runtimes:

- `mobile/`: Expo + React Native client
- `web/`: React + Vite browser client
- `backend/`: Express + Socket.IO API

The point of the project is not just “send a message.” It is to show how a modern chat product is built end-to-end with authentication, realtime delivery, optimistic UI, presence, typing indicators, and maintainable state boundaries.

## Product Summary

Whisper supports:

- sign-in with Clerk
- syncing authenticated users into the app database
- creating or reusing one-to-one chats
- fetching chat history over HTTP
- sending messages in real time with Socket.IO
- online/offline presence
- typing indicators
- optimistic message updates
- mobile and web clients backed by the same API and realtime contract

## Repository Layout

```text
react-native-whisper-chat/
├── backend/
│   ├── src/controllers/
│   ├── src/models/
│   ├── src/routes/
│   └── src/utils/socket.ts
├── mobile/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── lib/
└── web/
    ├── src/components/
    ├── src/hooks/
    ├── src/lib/
    └── src/screen/
```

## Tech Stack

### Web

- React 19
- TypeScript
- Vite
- React Router
- Clerk React
- TanStack Query
- Zustand
- Tailwind CSS
- DaisyUI
- Socket.IO Client
- `ky`

### Mobile

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

### Backend

- Express 5
- TypeScript
- Socket.IO
- MongoDB
- Mongoose
- Clerk Express
- Bun

## Why This Stack Is Good

### Clerk

Clerk handles identity so the project does not waste time rebuilding sensitive auth infrastructure. That means:

- less auth boilerplate
- better security defaults
- easier social sign-in support
- cleaner token handling on web and mobile

### TanStack Query + Zustand

This split is one of the strongest parts of the architecture:

- TanStack Query owns server data like chats, users, and messages
- Zustand owns transient realtime state like socket connection, unread markers, online users, and typing state

That is better than putting everything into one large store because responsibilities stay clear and the code is easier to refactor.

### Socket.IO

For chat, Socket.IO is a better fit than polling because it provides:

- lower perceived latency
- direct event delivery
- typing and presence support
- reconnect behavior
- simpler developer ergonomics than raw websockets

### Expo for mobile

Expo lets the project focus on actual product work instead of native project setup:

- faster development
- easier testing
- cleaner routing and asset handling
- lower platform friction

### Vite for web

Vite keeps the web client fast and minimal:

- quick local startup
- straightforward builds
- modern TypeScript support
- low configuration overhead

## Architecture

High-level flow:

1. User signs in with Clerk on web or mobile.
2. Client syncs that identity into the app database.
3. Client fetches chats, users, and messages over HTTP.
4. Client opens an authenticated socket connection using the Clerk token.
5. Backend verifies the token and joins the user to socket rooms.
6. New messages, presence, and typing updates are pushed in real time.
7. Clients update TanStack Query caches immediately so the UI stays coherent.

## Engineering Highlights

### Realtime cache coordination

The project does not stop at “receive a socket event.” Incoming messages update:

- the active message list
- the chat preview/last message data
- unread markers for inactive chats
- typing state cleanup

That is real application logic, not tutorial filler.

### Cross-platform behavior

The web and mobile apps are separate clients, but they preserve the same product rules:

- same auth model
- same data model
- same realtime contract
- same chat behavior

That makes the repo more credible than a single-surface demo.

### Refactoring for maintainability

The socket layer and chat screens have already been split into smaller modules. This improves:

- readability
- testability
- rerender control
- change safety

That matters because maintainability is a better long-term signal than raw line count or feature count.

## Learning Outcomes

This project demonstrates useful engineering skills in:

- full-stack TypeScript
- authenticated API design
- authenticated websocket design
- optimistic UI
- presence and typing event modeling
- separating server state from local realtime state
- cross-platform product implementation
- refactoring oversized modules into smaller layers

## Why This Project Is Better Than a Basic Chat Tutorial

Many chat tutorials stop at:

- fake local data
- unprotected endpoints
- simplistic websocket demos
- no mobile client
- no presence
- no typing
- no cache coordination

Whisper goes further with:

- real auth
- persistent backend models
- web and mobile surfaces
- realtime presence and typing
- optimistic updates
- operational tooling like Sentry
- cleaner state architecture

## Local Development

### Backend

```bash
cd backend
bun install
bun run dev
```

### Web

```bash
cd web
bun install
bun run start
```

### Mobile

```bash
cd mobile
bun install
npx expo start
```

## Environment Notes

From the codebase, these are relevant:

- web uses `VITE_CLERK_PUBLISHABLE_KEY`
- web optionally uses `VITE_API_INCLUDE_CREDENTIALS`
- mobile uses `EXPO_PUBLIC_API_URL`
- backend uses `FRONTEND_URL`
- backend also requires Clerk secret configuration and MongoDB connection configuration

Adding `.env.example` files later would improve onboarding.

## Next Improvements

- add automated tests for realtime cache logic
- add `.env.example` files in each workspace
- add group chats
- add delivery and read receipts
- add media upload support
- add rate limiting and abuse controls
- add deployment docs

## Workspace READMEs

- [web/README.md](/Volumes/Mac%20Mini%201tb%20Ext/Projects/React%20Native/react-native-whisper-chat/web/README.md)
- [mobile/README.md](/Volumes/Mac%20Mini%201tb%20Ext/Projects/React%20Native/react-native-whisper-chat/mobile/README.md)
- [backend/README.md](/Volumes/Mac%20Mini%201tb%20Ext/Projects/React%20Native/react-native-whisper-chat/backend/README.md)
