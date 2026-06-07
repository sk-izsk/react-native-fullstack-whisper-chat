import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import EmptyUI from '../EmptyUI'
import { MessageBubble } from './MessageBubble'
import type { Message, MessageSender, User } from '../../types'

type ChatConversationProps = {
  currentUser?: User
  isLoading: boolean
  messages?: Message[]
  onContentSizeChange: () => void
  scrollViewRef: React.RefObject<ScrollView | null>
}

export const ChatConversation: React.FC<ChatConversationProps> = ({
  currentUser,
  isLoading,
  messages,
  onContentSizeChange,
  scrollViewRef,
}) => {
  if (isLoading) {
    return (
      <View className="flex items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    )
  }

  if (!messages?.length) {
    return (
      <EmptyUI
        title="No messages yet"
        subtitle="Start the conversation!"
        iconName="chatbubbles-outline"
        iconColor="#6B6B70"
        iconSize={64}
      />
    )
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1"
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
      }}
      onContentSizeChange={onContentSizeChange}
    >
      {messages.map((message) => {
        const senderId = (message.sender as MessageSender)._id
        const isFromMe = currentUser ? senderId === currentUser._id : false

        return <MessageBubble key={message._id} message={message} isFromMe={isFromMe} />
      })}
    </ScrollView>
  )
}
