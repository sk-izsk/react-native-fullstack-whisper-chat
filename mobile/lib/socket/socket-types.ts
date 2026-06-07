import type { QueryClient } from '@tanstack/react-query'
import type { StoreApi } from 'zustand'
import type { Chat, Message, MessageSender } from '../../types'
import type { Socket } from 'socket.io-client'

export interface SocketState {
  socket: Socket | null
  isConnected: boolean
  onlineUsers: Set<string>
  typingUsers: Map<string, string>
  unreadChats: Set<string>
  currentChatId: string | null
  queryClient: QueryClient | null
}

export interface SocketActions {
  connect: (token: string, queryClient: QueryClient) => void
  disconnect: () => void
  joinChat: (chatId: string) => void
  leaveChat: (chatId: string) => void
  sendMessage: (chatId: string, text: string, currentUser: MessageSender) => void
  sendTyping: (chatId: string, isTyping: boolean) => void
}

export type SocketStore = SocketState & SocketActions
export type SocketStoreApi = StoreApi<SocketStore>
export type IncomingMessagePayload = Message | { message: Message }

export const createInitialSocketState = (): SocketState => ({
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  typingUsers: new Map(),
  unreadChats: new Set(),
  currentChatId: null,
  queryClient: null,
})

export const resetSocketState = (): SocketState => createInitialSocketState()
