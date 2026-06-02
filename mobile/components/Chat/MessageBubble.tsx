import React from 'react'
import { View, Text } from 'react-native'
import { Message } from '../../types'

interface Props {
  message: Message
  isFromMe: boolean
}

export const MessageBubble: React.FC<Props> = ({ message, isFromMe }) => {
  return (
    <View className={`flex-row ${isFromMe ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`max-w-[80%] px-3 py-2 rounded-2xl ${
          isFromMe
            ? 'bg-primary rounded-br-sm'
            : 'bg-surface-card rounded-bl-sm border border-surface-light'
        }`}
      >
        <Text className={`text-sm ${isFromMe ? 'text-surface-dark' : 'text-foreground'}`}>
          {message.text}
        </Text>
      </View>
    </View>
  )
}
