import { useAuth } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useApi } from '../lib/ky'

export const useUserSync = () => {
  const { isSignedIn, userId, getToken } = useAuth()
  const { api } = useApi()
  const lastSyncedUserRef = useRef<string | null>(null)

  const {
    mutate: syncUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['syncUser'],
    mutationFn: async () => {
      const token = await getToken()
      const res = await api.post('/auth/callback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res
    },
  })

  useEffect(() => {
    if (!isSignedIn) {
      lastSyncedUserRef.current = null
      return
    }

    if (!userId) {
      return
    }

    // Prevent repeated sync requests on rerenders/errors for the same signed-in user.
    if (lastSyncedUserRef.current === userId) {
      return
    }

    if (!isPending && !isSuccess) {
      lastSyncedUserRef.current = userId
      syncUser()
    }
  }, [isSignedIn, userId, isPending, isSuccess, syncUser])

  return { isSyncing: isPending, isSynced: isSuccess }
}
