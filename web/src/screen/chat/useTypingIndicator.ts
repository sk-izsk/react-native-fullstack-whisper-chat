import { useEffect, useRef } from 'react'
import { useSocketActions, useSocketStore } from '../../lib/socket'

export const useTypingIndicator = (chatId?: string) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const socket = useSocketStore((state) => state.socket)
  const { sendTyping } = useSocketActions()

  const clearTypingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const markTyping = (isTyping: boolean) => {
    if (!chatId || !socket) {
      return
    }

    sendTyping(chatId, isTyping)
  }

  const handleTypingValue = (value: string) => {
    if (!chatId || !socket) {
      return
    }

    clearTypingTimeout()

    if (!value.trim()) {
      markTyping(false)
      return
    }

    markTyping(true)
    timeoutRef.current = setTimeout(() => {
      markTyping(false)
      timeoutRef.current = null
    }, 2000)
  }

  useEffect(() => clearTypingTimeout, [])

  return {
    clearTypingTimeout,
    handleTypingValue,
    markTyping,
  }
}
