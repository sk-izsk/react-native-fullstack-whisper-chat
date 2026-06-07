import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { createSocketClient } from './socket-client'
import {
  appendOptimisticMessage,
  createOptimisticMessage,
  removeMessageById,
} from './socket-cache'
import { bindSocketEvents } from './socket-events'
import {
  createInitialSocketState,
  resetSocketState,
  type SocketActions,
  type SocketStore,
} from './socket-types'

export const useSocketStore = create<SocketStore>((set, get, store) => ({
  ...createInitialSocketState(),

  connect: (token, queryClient) => {
    const existingSocket = get().socket
    if (existingSocket?.connected) {
      return
    }

    if (existingSocket) {
      existingSocket.disconnect()
    }

    const socket = createSocketClient(token)
    bindSocketEvents(socket, { queryClient, store })

    set({ socket, queryClient })
  },

  disconnect: () => {
    const socket = get().socket
    if (!socket) {
      return
    }

    socket.disconnect()
    set(resetSocketState())
  },

  joinChat: (chatId) => {
    const socket = get().socket
    set((state) => {
      const unreadChats = new Set(state.unreadChats)
      unreadChats.delete(chatId)
      return { currentChatId: chatId, unreadChats }
    })

    if (socket?.connected) {
      socket.emit('join-chat', chatId)
    }
  },

  leaveChat: (chatId) => {
    const socket = get().socket
    set({ currentChatId: null })

    if (socket?.connected) {
      socket.emit('leave-chat', chatId)
    }
  },

  sendMessage: (chatId, text, currentUser) => {
    const { socket, queryClient } = get()
    if (!socket?.connected || !queryClient) {
      return
    }

    const optimisticMessage = createOptimisticMessage(chatId, text, currentUser)
    appendOptimisticMessage(queryClient, chatId, optimisticMessage)

    socket.emit('send-message', { chatId, text })

    const errorHandler = (error: { message: string }) => {
      removeMessageById(queryClient, chatId, optimisticMessage._id)
      socket.off('socket-error', errorHandler)
    }

    socket.once('socket-error', errorHandler)
  },

  sendTyping: (chatId, isTyping) => {
    const socket = get().socket
    if (socket?.connected) {
      socket.emit('typing', { chatId, isTyping })
    }
  },
}))

export const useSocketStatus = () => useSocketStore((state) => state.isConnected)

export const useOnlineUsers = () => useSocketStore((state) => state.onlineUsers)

export const useIsUserOnline = (userId?: string) =>
  useSocketStore((state) => (userId ? state.onlineUsers.has(userId) : false))

export const useTypingUserId = (chatId: string) =>
  useSocketStore((state) => state.typingUsers.get(chatId) ?? null)

export const useIsChatTyping = (chatId: string, participantId?: string) =>
  useSocketStore((state) => (participantId ? state.typingUsers.get(chatId) === participantId : false))

export const useUnreadChatIds = () => useSocketStore((state) => state.unreadChats)

export const useIsChatUnread = (chatId: string) =>
  useSocketStore((state) => state.unreadChats.has(chatId))

export const useSocketActions = () =>
  useSocketStore(
    useShallow(
      (state): SocketActions => ({
      connect: state.connect,
      disconnect: state.disconnect,
      joinChat: state.joinChat,
      leaveChat: state.leaveChat,
      sendMessage: state.sendMessage,
      sendTyping: state.sendTyping,
      }),
    ),
  )
