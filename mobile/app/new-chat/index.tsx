import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserItem } from '../../components/UserItem'
import { useGetOrCreateChat } from '../../hooks/useChats'
import { useUsers } from '../../hooks/useUsers'
import { useSocketStore } from '../../lib/socket'
import { Chat, User } from '../../types'

const NewChatScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { onlineUsers } = useSocketStore()

  const { data: allUsers, isLoading } = useUsers()
  const {
    mutate: getOrCreateChat,
    isPending: isCreatingChat,
    isSuccess,
    isError,
    error,
  } = useGetOrCreateChat()
  console.log('isCreatingChat: ', isCreatingChat)
  console.log('error: ', error)
  console.log('isError: ', isError)
  console.log('isSuccess: ', isSuccess)
  // const { onlineUsers } = useSocketStore()

  const users = allUsers?.filter((u) => {
    if (!searchQuery.trim()) {
      return true
    }
    const query = searchQuery.toLowerCase()
    return u.name?.toLowerCase().includes(query) || u.email?.toLowerCase().includes(query)
  })

  const handleUserSelect = (user: User) => {
    getOrCreateChat(user._id, {
      onSuccess: (chat: Chat) => {
        router.dismiss()

        setTimeout(() => {
          router.push({
            pathname: '/chat/[id]',
            params: {
              id: chat._id,
              participantId: chat.participant._id,
              name: chat.participant.name,
              avatar: chat.participant.avatar,
            },
          })
        }, 100)
      },
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <View className="justify-end flex-1 bg-black/40">
        <View className="bg-surface rounded-t-3xl h-[95%] overflow-hidden">
          <View className="flex-row items-center px-5 pt-3 pb-3 border-b bg-surface border-surface-light">
            <Pressable
              className="items-center justify-center mr-2 rounded-full w-9 h-9 bg-surface-card"
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={20} color="#F4A261" />
            </Pressable>

            <View className="flex-1">
              <Text className="text-xl font-semibold text-foreground">New chat</Text>
              <Text className="text-muted-foreground text-xs mt-0.5">
                Search for a user to start chatting
              </Text>
            </View>
          </View>
          <View className="px-5 pt-3 pb-2 bg-surface">
            <View className="flex-row items-center bg-surface-card rounded-full px-3 py-1.5 gap-2 border border-surface-light">
              <Ionicons name="search" size={18} color="#6B6B70" />
              <TextInput
                placeholder="Search users"
                placeholderTextColor="#6B6B70"
                className="flex-1 text-sm text-foreground"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View className="flex-1 bg-surface">
            {isCreatingChat || isLoading ? (
              <View className="items-center justify-center flex-1">
                <ActivityIndicator size="large" color="#F4A261" />
              </View>
            ) : !users || users.length === 0 ? (
              <View className="items-center justify-center flex-1 px-5">
                <Ionicons name="person-outline" size={64} color="#6B6B70" />
                <Text className="mt-4 text-lg text-muted-foreground">No users found</Text>
                <Text className="mt-1 text-sm text-center text-subtle-foreground">
                  Try a different search term
                </Text>
              </View>
            ) : (
              <ScrollView
                className="flex-1 px-5 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
              >
                <Text className="mb-3 text-xs text-muted-foreground">USERS</Text>
                {users.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    isOnline={onlineUsers.has(user._id)}
                    onPress={() => handleUserSelect(user)}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NewChatScreen
