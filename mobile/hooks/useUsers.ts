import { useQuery } from '@tanstack/react-query'
import { useApi } from '../lib/ky'
import { User } from '../types'

export const useUsers = () => {
  const { apiWithAuth } = useApi()

  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const data = await apiWithAuth<User[]>({ method: 'GET', url: '/users' })
      return data
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
