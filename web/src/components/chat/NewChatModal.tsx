import { SearchIcon, UsersIcon } from 'lucide-react'
import { useState } from 'react'
import { useUserSearch } from '../../hooks/useUserSearch'
import { useUsers } from '../../hooks/useUsers'
import { useOnlineUsers } from '../../lib/socket'
import type { User } from '../../types'

interface NewChatModalProps {
  onStartChat: (participantId: string) => void
  isPending: boolean
  isOpen: boolean
  onClose: () => void
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  onStartChat,
  isPending,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const onlineUsers = useOnlineUsers()
  const { data: allUsers = [] } = useUsers()
  const isOnline = (id: string) => onlineUsers.has(id)

  const handleStartChat = (participantId: string) => {
    onStartChat(participantId)
    setSearchQuery('')
    onClose()
  }

  const searchResults = useUserSearch(allUsers, searchQuery)

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="flex items-center gap-2 mb-4 font-semibold">
          <UsersIcon className="size-5 text-primary" />
          New Chat
        </h3>
        <div className="relative mb-4">
          <SearchIcon className="absolute z-10 w-4 h-4 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-base-content/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full pl-10 input input-bordered"
            autoFocus
          />
        </div>
        <div className="overflow-y-auto max-h-72">
          {searchResults.length === 0 ? (
            <div className="py-8 text-sm text-center text-base-content/60">
              {searchQuery ? 'No users found' : 'Start typing to search'}
            </div>
          ) : (
            <div className="space-y-2">
              {searchResults.map((u: User) => (
                <button
                  key={u._id}
                  onClick={() => handleStartChat(u._id)}
                  disabled={isPending}
                  className="justify-start w-full gap-3 normal-case btn btn-ghost"
                >
                  <div className="relative">
                    <img src={u.avatar} className="w-10 h-10 rounded-full" />
                    {isOnline(u._id) && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-base-200" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-base-content/70">{u.email}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn"
              onClick={() => {
                setSearchQuery('')
                onClose()
              }}
            >
              Close
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}
