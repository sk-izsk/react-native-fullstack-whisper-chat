import React, { useState } from 'react'
import { useSearchParams } from 'react-router'
import { NewChatModal } from '../components/chat/NewChatModal'
import { useChats, useGetOrCreateChat } from '../hooks/useChats'
import { useMessages } from '../hooks/useMessages'
import { useSocketConnection } from '../hooks/useSocketConnection'
import type { Chat } from '../types'
import { ChatMessagesPanel } from './chat/ChatMessagesPanel'
import { ChatSidebar } from './chat/ChatSidebar'
import { useChatRoom } from './chat/useChatRoom'

interface Props {}

interface SearchParams {}

const ChatScreen: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeChatId = searchParams.get('chat')
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false)
  useSocketConnection(activeChatId || undefined)

  const { data: chats, isLoading: chatsLoading } = useChats()
  const { data: messages, isLoading: messagesLoading } = useMessages(activeChatId || undefined)
  const { currentUser, message, setMessage, handleSend } = useChatRoom(activeChatId || undefined)
  const startChatMutation = useGetOrCreateChat()

  const handleStartChat = (participantId: string) => {
    startChatMutation.mutate(participantId, {
      onSuccess: (chat: Chat) => setSearchParams({ chat: chat._id }),
    })
  }

  const activeChat = chats?.find((chat) => chat._id === activeChatId)

  return (
    <div className="flex h-screen bg-base-100 text-base-content">
      <ChatSidebar
        activeChatId={activeChatId}
        chats={chats}
        chatsLoading={chatsLoading}
        onOpenNewChat={() => setIsNewChatModalOpen(true)}
        onSelectChat={(chatId) => setSearchParams({ chat: chatId })}
      />
      <div className="flex flex-col flex-1">
        <ChatMessagesPanel
          activeChat={activeChat}
          activeChatId={activeChatId}
          currentUser={currentUser}
          message={message}
          messages={messages}
          messagesLoading={messagesLoading}
          onMessageChange={setMessage}
          onSend={handleSend}
        />
      </div>

      <NewChatModal
        onStartChat={handleStartChat}
        isPending={startChatMutation.isPending}
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
      />
    </div>
  )
}

export default ChatScreen
