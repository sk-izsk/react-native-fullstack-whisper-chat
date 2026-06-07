import React, { useEffect, useRef } from 'react'
import { MessageSquareIcon } from 'lucide-react'
import { ChatHeader } from '../../components/chat/ChatHeader'
import { ChatInput } from '../../components/chat/ChatInput'
import { MessageBubble } from '../../components/chat/MessageBubble'
import type { Chat, Message, User } from '../../types'

type ChatMessagesPanelProps = {
  activeChat?: Chat
  activeChatId: string | null
  currentUser?: User
  message: string
  messages?: Message[]
  messagesLoading: boolean
  onMessageChange: (value: string) => void
  onSend: () => void
}

export const ChatMessagesPanel: React.FC<ChatMessagesPanelProps> = ({
  activeChat,
  activeChatId,
  currentUser,
  message,
  messages,
  messagesLoading,
  onMessageChange,
  onSend,
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeChatId])

  if (!activeChatId || !activeChat) {
    return <NoChatSelectedUI />
  }

  return (
    <>
      <ChatHeader participant={activeChat.participant} chatId={activeChatId} />

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messagesLoading && (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-spinner loading-md text-amber-400" />
          </div>
        )}

        {messages?.length === 0 && !messagesLoading && <NoMessagesUI />}

        {messages?.map((entry) =>
          currentUser ? (
            <MessageBubble key={entry._id} message={entry} currentUser={currentUser} />
          ) : null,
        )}

        <div ref={messageEndRef} />
      </div>

      <ChatInput
        value={message}
        onChange={(event) => onMessageChange(event.target.value)}
        onSubmit={(event) => {
          event.preventDefault()
          onSend()
        }}
        disabled={!message.trim()}
      />
    </>
  )
}

function NoMessagesUI() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-base-300/40">
        <MessageSquareIcon className="w-8 h-8 text-base-content/20" />
      </div>
      <p className="text-base-content/70">No messages yet</p>
      <p className="mt-1 text-sm text-base-content/60">Send a message to start the conversation</p>
    </div>
  )
}

function NoChatSelectedUI() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center">
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-linear-to-br from-amber-500/20 to-orange-500/20">
        <MessageSquareIcon className="w-10 h-10 text-amber-400" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">Welcome to Whisper</h2>
      <p className="max-w-sm text-base-content/70">
        Select a conversation from the sidebar or start a new chat to begin messaging
      </p>
    </div>
  )
}
