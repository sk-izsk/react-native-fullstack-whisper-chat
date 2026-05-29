import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import { ChatHeader } from '../../components/Chat/ChatHeader'
import { ChatItem } from '../../components/Chat/ChatItem'
import EmptyUI from '../../components/EmptyUI'
import { useChats } from '../../hooks/useChats'
import { Chat } from '../../types'

const ChatsTab = () => {
  const router = useRouter()
  const { data: chats, isLoading, error, refetch } = useChats()
  console.log('error: ', error)
  console.log('isLoading: ', isLoading)
  console.log('chats: ', chats)

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-surface">
        <ActivityIndicator size="large" color="#f4a261" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="items-center justify-center flex-1 bg-surface">
        <Text className="text-red-500"> Failed to load chats</Text>
        <Pressable onPress={() => refetch()} className="px-4 py-2 mt-4 rounded-lg bg-primary">
          <Text className="text-foreground">Retry</Text>
        </Pressable>
      </View>
    )
  }

  const handleChatPress = (chat: Chat) => {
    router.push({
      pathname: '/chat/[id]',
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      },
    })
  }

  return (
    <View className="flex-1 bg-surface">
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatItem chat={item} onPress={() => handleChatPress(item)} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}
        ListHeaderComponent={() => <ChatHeader />}
        ListEmptyComponent={
          <EmptyUI
            title="No chats yet"
            subtitle="Start a conversation!"
            iconName="chatbubbles-outline"
            iconColor="#6B6B70"
            iconSize={64}
            buttonLabel="New Chat"
            onPressButton={() => router.push('/new-chat')}
          />
        }
      />
    </View>
  )
}

export default ChatsTab
