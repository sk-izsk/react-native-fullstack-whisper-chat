import { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { useCurrentUser } from './useAuthCallback'
import { useMessages } from './useMessages'
import { useIsChatTyping, useIsUserOnline, useSocketActions, useSocketStatus } from '../lib/socket'

export const useChatRoom = (chatId: string, participantId?: string) => {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data: currentUser } = useCurrentUser()
  const { data: messages, isLoading } = useMessages(chatId)
  const isConnected = useSocketStatus()
  const isOnline = useIsUserOnline(participantId)
  const isTyping = useIsChatTyping(chatId, participantId)
  const { joinChat, leaveChat, sendMessage, sendTyping } = useSocketActions()

  const clearTypingTimeout = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }, [])

  const scrollToBottom = useCallback((animated = true) => {
    scrollViewRef.current?.scrollToEnd({ animated })
  }, [])

  useEffect(() => {
    if (chatId && isConnected) {
      joinChat(chatId)
    }

    return () => {
      clearTypingTimeout()
      if (chatId) {
        leaveChat(chatId)
      }
    }
  }, [chatId, clearTypingTimeout, isConnected, joinChat, leaveChat])

  useEffect(() => {
    if (messages?.length) {
      const timeoutId = setTimeout(() => {
        scrollToBottom()
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [messages, scrollToBottom])

  const handleTyping = useCallback(
    (text: string) => {
      setMessage(text)

      if (!isConnected || !chatId) {
        return
      }

      clearTypingTimeout()

      if (!text.length) {
        sendTyping(chatId, false)
        return
      }

      sendTyping(chatId, true)
      typingTimeoutRef.current = setTimeout(() => {
        sendTyping(chatId, false)
        typingTimeoutRef.current = null
      }, 2000)
    },
    [chatId, clearTypingTimeout, isConnected, sendTyping],
  )

  const handleSend = useCallback(() => {
    if (!message.trim() || !isConnected || !currentUser || isSending) {
      return
    }

    clearTypingTimeout()
    sendTyping(chatId, false)

    setIsSending(true)
    sendMessage(chatId, message.trim(), {
      _id: currentUser._id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      email: currentUser.email,
    })
    setMessage('')
    setIsSending(false)

    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, [
    chatId,
    clearTypingTimeout,
    currentUser,
    isConnected,
    isSending,
    message,
    scrollToBottom,
    sendMessage,
    sendTyping,
  ])

  return {
    currentUser,
    handleSend,
    handleTyping,
    isConnected,
    isLoading,
    isOnline,
    isSending,
    isTyping,
    message,
    messages,
    scrollToBottom,
    scrollViewRef,
    setMessage,
  }
}
