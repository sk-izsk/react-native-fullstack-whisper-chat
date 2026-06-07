import { useState } from 'react'
import { useCurrentUser } from '../../hooks/useUsers'
import { useSocketActions, useSocketStore } from '../../lib/socket'
import { useTypingIndicator } from './useTypingIndicator'

export const useChatRoom = (chatId?: string) => {
  const [message, setMessage] = useState('')
  const { data: currentUser } = useCurrentUser()
  const socket = useSocketStore((state) => state.socket)
  const { sendMessage } = useSocketActions()
  const { clearTypingTimeout, handleTypingValue, markTyping } = useTypingIndicator(chatId)

  const handleMessageChange = (value: string) => {
    setMessage(value)
    handleTypingValue(value)
  }

  const handleSend = () => {
    const text = message.trim()
    if (!text || !chatId || !socket || !currentUser) {
      return false
    }

    clearTypingTimeout()
    sendMessage(chatId, text, {
      _id: currentUser._id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      email: currentUser.email,
    })
    setMessage('')
    markTyping(false)
    return true
  }

  return {
    currentUser,
    message,
    setMessage: handleMessageChange,
    handleSend,
  }
}
