import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Image } from 'expo-image'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useIsChatTyping, useIsChatUnread, useIsUserOnline } from '../../lib/socket'
import { Chat } from '../../types'

dayjs.extend(relativeTime)

interface Props {
  chat: Chat
  onPress?: () => void
}

export const ChatItem: React.FC<Props> = ({ chat, onPress }) => {
  const participant = chat.participant

  const isOnline = useIsUserOnline(participant._id)
  const isTyping = useIsChatTyping(chat._id, participant._id)
  const hasUnReadMessages = useIsChatUnread(chat._id)
  return (
    <Pressable className="flex-row items-center py-3 active:opacity-70" onPress={onPress}>
      <View className="relative">
        <Image
          source={{ uri: participant.avatar }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
          }}
        />
        {isOnline && (
          <View className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-[3px] border-surface" />
        )}
      </View>
      <View className="flex-1 ml-4">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-base font-medium ${hasUnReadMessages ? 'text-primary' : 'text-foreground'}`}
          >
            {participant.name}
          </Text>

          <View className="flex-row items-center gap-2">
            {hasUnReadMessages && <View className="w-2.5 h-2.5 bg-primary rounded-full" />}
            <Text className="text-xs text-subtle-foreground">
              {chat.lastMessageAt ? dayjs(chat.lastMessageAt).fromNow(true) : ''}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-1">
          {isTyping ? (
            <Text className="text-sm italic text-primary">typing...</Text>
          ) : (
            <Text
              className={`text-sm flex-1 mr-3 ${hasUnReadMessages ? 'text-foreground font-medium' : 'text-subtle-foreground'}`}
              numberOfLines={1}
            >
              {chat.lastMessage?.text || 'No messages yet'}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  )
}
