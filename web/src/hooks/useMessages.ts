import { useQuery } from '@tanstack/react-query'
import { useApi } from '../lib/ky'
import type { Message } from '../types'

export const useMessages = (chatId?: string) => {
  const { apiWithAuth } = useApi()

  return useQuery<Message[]>({
    queryKey: ['messages', chatId],
    queryFn: async () => {
      return apiWithAuth<Message[]>({
        url: `/messages/chat/${chatId}`,
        method: 'GET',
      })
    },
    enabled: !!chatId,
  })
}
