import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

type ChatDetailHeaderProps = {
  avatar?: string
  isOnline: boolean
  isTyping: boolean
  name?: string
}

export const ChatDetailHeader: React.FC<ChatDetailHeaderProps> = ({
  avatar,
  isOnline,
  isTyping,
  name,
}) => {
  return (
    <View className="flex-row items-center px-4 py-2 border-b bg-surface border-surface-light">
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#F4A261" />
      </Pressable>
      <View className="flex-row items-center flex-1 ml-2">
        {avatar ? <Image source={avatar} style={{ width: 40, height: 40, borderRadius: 999 }} /> : null}
        <View className="ml-3">
          <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
            {name}
          </Text>
          <Text className={`text-xs ${isTyping ? 'text-primary' : 'text-muted-foreground'}`}>
            {isTyping ? 'typing...' : isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <Pressable className="items-center justify-center rounded-full w-9 h-9">
          <Ionicons name="call-outline" size={20} color="#A0A0A5" />
        </Pressable>
        <Pressable className="items-center justify-center rounded-full w-9 h-9">
          <Ionicons name="videocam-outline" size={20} color="#A0A0A5" />
        </Pressable>
      </View>
    </View>
  )
}
