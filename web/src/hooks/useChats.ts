import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useApi } from '../lib/ky'
import type { Chat } from '../types'

export const useChats = () => {
  const { getToken } = useAuth()
  const { api } = useApi()

  return useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: async () => {
      const token = await getToken()
      const res = await api.get('/chats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.json()
    },
  })
}

export const useGetOrCreateChat = () => {
  const { getToken } = useAuth()
  const { api } = useApi()
  const queryClient = useQueryClient()

  return useMutation<Chat, unknown, string>({
    mutationKey: ['getOrCreateChat'],
    mutationFn: async (userId: string) => {
      const token = await getToken()
      const res = await api.post(`/chats/with/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    },
  })
}
