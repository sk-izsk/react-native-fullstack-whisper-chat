import { useAuth } from '@clerk/clerk-react'
import React from 'react'

interface Props {}

const ChatScreen: React.FC<Props> = () => {
  const { signOut } = useAuth()
  return (
    <div>
      <button onClick={() => signOut()} className="btn">
        Sign Out
      </button>
    </div>
  )
}

export default ChatScreen
