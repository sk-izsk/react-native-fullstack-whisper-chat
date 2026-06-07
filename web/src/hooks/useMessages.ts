import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '../lib/ky'
import type { Message } from '../types'

export const useMessages = (chatId?: string) => {
  const { getToken } = useAuth()
  const { api } = useApi()

  return useQuery<Message[]>({
    queryKey: ['messages', chatId],
    queryFn: async () => {
      const token = await getToken()
      const res = await api.get(`/chats/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.json()
    },
    enabled: !!chatId,
  })
}
