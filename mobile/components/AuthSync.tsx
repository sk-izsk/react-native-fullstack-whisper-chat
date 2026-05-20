import { useUser } from '@clerk/clerk-expo'
import React, { useEffect, useRef } from 'react'
import { useAuthCallback } from '../hooks/useAuthCallback'

interface Props {}

export const AuthSync: React.FC<Props> = () => {
  const { user, isSignedIn } = useUser()

  const { mutate: syncUser } = useAuthCallback()
  const hasSynced = useRef(false)

  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true
      syncUser(undefined, {
        onError: (error) => {
          console.error('Failed to sync user:', error)
          hasSynced.current = false
        },
        onSuccess: (data) => {
          console.log('User synced successfully', data)
        },
      })

      if (!isSignedIn) {
        hasSynced.current = false
      }
    }
  }, [isSignedIn, user, syncUser])
  return null
}
