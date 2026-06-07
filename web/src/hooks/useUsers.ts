import { useQuery } from '@tanstack/react-query'
import { useApi } from '../lib/ky'
import type { User } from '../types'

export const useUsers = () => {
  const { apiWithAuth } = useApi()

  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      return apiWithAuth<User[]>({
        url: '/users',
        method: 'GET',
      })
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
