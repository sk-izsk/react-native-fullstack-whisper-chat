import type { QueryClient } from '@tanstack/react-query'
import type { Chat, Message, MessageSender } from '../../types'

const withoutOptimisticMessages = (messages: Message[]) =>
  messages.filter((message) => !message._id.startsWith('temp-'))

export const appendIncomingMessage = (queryClient: QueryClient, message: Message) => {
  queryClient.setQueryData<Message[]>(['messages', message.chat], (oldMessages) => {
    if (!oldMessages) {
      return [message]
    }

    const filteredMessages = withoutOptimisticMessages(oldMessages)
    if (filteredMessages.some((existingMessage) => existingMessage._id === message._id)) {
      return filteredMessages
    }

    return [...filteredMessages, message]
  })
}

export const updateChatPreview = (
  queryClient: QueryClient,
  message: Message,
  senderId: string,
) => {
  queryClient.setQueryData<Chat[]>(['chats'], (oldChats) =>
    oldChats?.map((chat) => {
      if (chat._id !== message.chat) {
        return chat
      }

      return {
        ...chat,
        lastMessage: {
          _id: message._id,
          text: message.text,
          sender: senderId,
          createdAt: message.createdAt,
        },
        lastMessageAt: message.createdAt,
      }
    }),
  )
}

export const shouldMarkChatUnread = (
  queryClient: QueryClient,
  message: Message,
  currentChatId: string | null,
) => {
  if (currentChatId === message.chat) {
    return false
  }

  const chats = queryClient.getQueryData<Chat[]>(['chats'])
  const chat = chats?.find((entry) => entry._id === message.chat)
  const senderId = (message.sender as MessageSender)._id

  return Boolean(chat?.participant && senderId === chat.participant._id)
}

export const createOptimisticMessage = (
  chatId: string,
  text: string,
  currentUser: MessageSender,
): Message => ({
  _id: `temp-${Date.now()}`,
  chat: chatId,
  sender: currentUser,
  text,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

export const appendOptimisticMessage = (
  queryClient: QueryClient,
  chatId: string,
  optimisticMessage: Message,
) => {
  queryClient.setQueryData<Message[]>(['messages', chatId], (oldMessages) => {
    if (!oldMessages) {
      return [optimisticMessage]
    }

    return [...oldMessages, optimisticMessage]
  })
}

export const removeMessageById = (
  queryClient: QueryClient,
  chatId: string,
  messageId: string,
) => {
  queryClient.setQueryData<Message[]>(['messages', chatId], (oldMessages) => {
    if (!oldMessages) {
      return []
    }

    return oldMessages.filter((message) => message._id !== messageId)
  })
}
