# Backend API

This folder contains the backend for Whisper Chat. It provides authenticated REST endpoints, realtime messaging via Socket.IO, and MongoDB persistence for users, chats, and messages.

## Stack

- Express 5
- TypeScript
- Socket.IO
- MongoDB
- Mongoose
- Clerk Express
- Bun

## Responsibilities

- verify Clerk-authenticated requests
- sync application users from Clerk identities
- fetch chat lists
- create or reuse one-to-one chats
- fetch ordered message history
- maintain authenticated realtime socket connections
- broadcast presence, typing, and message events

## Main Routes

- `/health`
- `/api/auth`
- `/api/chats`
- `/api/messages`
- `/api/users`

## Realtime Layer

The socket server handles:

- token verification during socket handshake
- online user tracking
- room membership for users and chats
- message broadcasting
- typing events

This matters because realtime behavior is treated as part of the core system design, not as an add-on after the HTTP API.

## Why This Design Is Good

### Clerk for identity, MongoDB for app data

Clerk owns identity concerns while MongoDB stores app-specific user, chat, and message data. That separation keeps the backend simpler and more flexible.

### Room-based socket delivery

Using user rooms and chat rooms makes event delivery more precise than global broadcasting and keeps presence and message flows easier to reason about.

### Express + Socket.IO

This is a pragmatic full-stack pairing for a chat backend because it keeps both request/response work and realtime event handling in one understandable service.

## Key Source Areas

- `src/app.ts`
- `src/controllers/`
- `src/models/`
- `src/routes/`
- `src/utils/socket.ts`
- `src/middleware/`

## Run Locally

```bash
cd backend
bun install
bun run dev
```

## Build

```bash
cd backend
bun run build
node dist/index.js
```

## Environment

Relevant values inferred from the code:

- Clerk secret configuration
- MongoDB connection configuration
- `FRONTEND_URL`
- `NODE_ENV`

## Learning Value

This backend is a good example of:

- combining authenticated HTTP and websocket flows
- syncing third-party auth identities into local app models
- implementing one-to-one chat creation
- keeping realtime chat logic understandable in a single service
