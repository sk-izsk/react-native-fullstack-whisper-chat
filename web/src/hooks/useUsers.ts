import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '../lib/ky'
import type { User } from '../types'

export const useUsers = () => {
  const { getToken } = useAuth()
  const { api } = useApi()

  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await getToken()
      const res = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.json()
    },
  })
}

export const useCurrentUser = () => {
  const { apiWithAuth } = useApi()

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const data = await apiWithAuth<User>({ method: 'GET', url: '/auth/me' })
      return data
    },
  })
}
