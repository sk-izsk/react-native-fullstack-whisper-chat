import React from 'react'
import { MessageSquareIcon, PlusIcon, SparklesIcon } from 'lucide-react'
import { Link } from 'react-router'
import { UserButton } from '@clerk/clerk-react'
import { ChatListItem } from '../../components/chat/ChatListItem'
import type { Chat } from '../../types'

type ChatSidebarProps = {
  activeChatId: string | null
  chats?: Chat[]
  chatsLoading: boolean
  onOpenNewChat: () => void
  onSelectChat: (chatId: string) => void
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  activeChatId,
  chats,
  chatsLoading,
  onOpenNewChat,
  onSelectChat,
}) => {
  return (
    <div className="flex flex-col border-r w-80 border-base-300 bg-base-200">
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center justify-between mb-4">
          <Link to="/chat" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-amber-400 to-orange-500">
              <SparklesIcon className="w-4 h-4 text-primary-content" />
            </div>
            <span className="font-bold">Whisper</span>
          </Link>
          <UserButton />
        </div>
        <button
          onClick={onOpenNewChat}
          className="gap-2 border-none btn btn-primary btn-block rounded-xl bg-linear-to-r from-amber-500 to-orange-500"
        >
          <PlusIcon className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatsLoading && (
          <div className="flex items-center justify-center py-8">
            <span className="loading loading-spinner loading-sm text-amber-400" />
          </div>
        )}

        {chats?.length === 0 && !chatsLoading && <NoConversationsUI />}

        <div className="flex flex-col gap-1">
          {chats?.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              isActive={activeChatId === chat._id}
              onClick={() => onSelectChat(chat._id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function NoConversationsUI() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <MessageSquareIcon className="w-10 h-10 mb-3 text-amber-400" />
      <p className="text-sm text-base-content/70">No conversations yet</p>
      <p className="mt-1 text-xs text-base-content/60">Start a new chat to begin</p>
    </div>
  )
}
