import { useUser } from '@clerk/clerk-expo'
import React, { useEffect, useRef } from 'react'
import { useAuthCallback } from '../hooks/useAuthCallback'

interface Props {}

export const AuthSync: React.FC<Props> = () => {
  const { user, isSignedIn } = useUser()

  const { mutate: syncUser } = useAuthCallback()
  const hasSynced = useRef(false)

  useEffect(() => {
    if (!isSignedIn) {
      hasSynced.current = false
      return
    }

    if (!user || hasSynced.current) {
      return
    }

    hasSynced.current = true
    syncUser(undefined, {
      onError: () => {
        hasSynced.current = false
      },
    })
  }, [isSignedIn, user, syncUser])

  return null
}
