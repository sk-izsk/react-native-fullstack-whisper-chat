import { useMutation, useQuery } from '@tanstack/react-query'
import { useApi } from '../lib/ky'
import { User } from '../types'

export const useAuthCallback = () => {
  const { apiWithAuth } = useApi()

  return useMutation({
    mutationFn: async () => {
      const response = await apiWithAuth({
        url: 'auth/me',
        method: 'POST',
      })

      return response
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
