import { useMemo } from 'react'
import type { User } from '../types'

export const useUserSearch = (users: User[] | undefined, searchQuery: string, emptyMatches = true) =>
  useMemo(() => {
    const allUsers = users ?? []
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return emptyMatches ? [] : allUsers
    }

    return allUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(normalizedQuery) ||
        user.email?.toLowerCase().includes(normalizedQuery),
    )
  }, [emptyMatches, searchQuery, users])
