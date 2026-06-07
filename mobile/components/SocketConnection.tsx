import { useSocketActions } from '@/lib/socket'
import { useAuth } from '@clerk/clerk-expo'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const SocketConnection = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const queryClient = useQueryClient()
  const { connect, disconnect } = useSocketActions()

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    if (!isSignedIn) {
      disconnect()
      return
    }

    let cancelled = false

    void getToken().then((token) => {
      if (cancelled) {
        return
      }

      if (token) {
        connect(token, queryClient)
        return
      }

      disconnect()
    })

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, connect, disconnect, getToken, queryClient])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return null
}
