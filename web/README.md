# Web Client

This folder contains the browser client for Whisper Chat. It is a React + TypeScript application built with Vite and designed around authenticated realtime messaging.

## Stack

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

## What This Client Does

- signs users in with Clerk
- fetches chats, users, and messages from the backend
- connects to the realtime socket layer
- shows online/offline presence
- shows typing indicators
- applies optimistic message updates
- updates chat previews immediately when new messages arrive

## Why This Stack Works Well

### React + Vite

This combination keeps the client fast and straightforward. The app gets modern React ergonomics without a heavy framework layer it does not need.

### TanStack Query

TanStack Query is a strong fit for chat data because it handles:

- request lifecycle state
- cache reuse
- refetching and invalidation
- easy reconciliation with incoming socket events

### Zustand

Zustand is used for socket state rather than all app state. That is a good boundary because presence, typing, and connection state are ephemeral and should not be mixed with all fetched data.

### Clerk

Clerk removes most of the auth boilerplate and lets the client consume secure tokens instead of managing auth infrastructure directly.

## Important Folders

- `src/components/`
- `src/hooks/`
- `src/lib/`
- `src/screen/`

## Engineering Notes

- socket logic is split into client, cache, events, and store modules
- screen logic is extracted into hooks instead of overloading route components
- auth-aware API requests are centralized through the `ky` helper
- the app uses narrow Zustand selector hooks to avoid broad store subscriptions

## Run Locally

```bash
cd web
bun install
bun run start
```

## Build

```bash
cd web
bun run build
```

## Environment

Required:

- `VITE_CLERK_PUBLISHABLE_KEY`

Optional:

- `VITE_API_INCLUDE_CREDENTIALS`

## Learning Value

This client is a solid reference for:

- structuring a realtime React app
- combining TanStack Query with Socket.IO
- keeping server state and local realtime state separate
- refactoring large screens and stores into smaller layers
