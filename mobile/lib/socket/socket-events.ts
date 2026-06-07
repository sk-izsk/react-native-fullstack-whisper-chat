import * as Sentry from '@sentry/react-native'
import type { MessageSender } from '../../types'
import type { Socket } from 'socket.io-client'
import {
  appendIncomingMessage,
  shouldMarkChatUnread,
  updateChatPreview,
} from './socket-cache'
import type { SocketStoreApi } from './socket-types'
import type { IncomingMessagePayload } from './socket-types'

type BindSocketEventsParams = {
  queryClient: NonNullable<ReturnType<SocketStoreApi['getState']>['queryClient']>
  store: SocketStoreApi
}

export const bindSocketEvents = (socket: Socket, { queryClient, store }: BindSocketEventsParams) => {
  socket.on('connect', () => {
    console.log('Socket connected, id:', socket.id)
    Sentry.logger.info('Socket connected', { socketId: socket.id })
    store.setState({ isConnected: true })
  })

  socket.on('connect_error', (error: unknown) => {
    const connectError = error as Error & {
      context?: unknown
      description?: unknown
      type?: string
    }

    console.error('Socket connect error:', connectError.message)
    Sentry.logger.error('Socket connect error', {
      message: connectError.message,
      description: connectError.description,
      context: connectError.context,
      type: connectError.type,
    })
    store.setState({ isConnected: false })
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnect', socket.id)
    Sentry.logger.info('Socket disconnect', { socketId: socket.id })
    store.setState({ isConnected: false })
  })

  socket.on('online-users', ({ userIds }: { userIds: string[] }) => {
    console.log('Received online-users:', userIds)
    store.setState({ onlineUsers: new Set(userIds) })
  })

  socket.on('user-online', ({ userId }: { userId: string }) => {
    store.setState((state) => ({
      onlineUsers: new Set([...state.onlineUsers, userId]),
    }))
  })

  socket.on('user-offline', ({ userId }: { userId: string }) => {
    store.setState((state) => {
      const onlineUsers = new Set(state.onlineUsers)
      onlineUsers.delete(userId)
      return { onlineUsers }
    })
  })

  socket.on('socket-error', (error: { message: string }) => {
    console.error('Socket error:', error.message)
    Sentry.logger.error('Socket error occurred', { message: error.message })
  })

  socket.on('new-message', (payload: IncomingMessagePayload) => {
    const message = 'message' in payload ? payload.message : payload
    const senderId = (message.sender as MessageSender)._id
    const { currentChatId } = store.getState()

    appendIncomingMessage(queryClient, message)
    updateChatPreview(queryClient, message, senderId)

    if (shouldMarkChatUnread(queryClient, message, currentChatId)) {
      store.setState((state) => ({
        unreadChats: new Set([...state.unreadChats, message.chat]),
      }))
    }

    store.setState((state) => {
      const typingUsers = new Map(state.typingUsers)
      typingUsers.delete(message.chat)
      return { typingUsers }
    })
  })

  socket.on(
    'typing',
    ({ userId, chatId, isTyping }: { userId: string; chatId: string; isTyping: boolean }) => {
      store.setState((state) => {
        const typingUsers = new Map(state.typingUsers)
        if (isTyping) {
          typingUsers.set(chatId, userId)
        } else {
          typingUsers.delete(chatId)
        }

        return { typingUsers }
      })
    },
  )
}
