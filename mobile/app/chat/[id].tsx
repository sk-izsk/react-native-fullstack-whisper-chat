import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MessageBubble } from '../../components/Chat/MessageBubble'
import EmptyUI from '../../components/EmptyUI'
import { useCurrentUser } from '../../hooks/useAuthCallback'
import { useMessages } from '../../hooks/useMessages'
import { useSocketStore } from '../../lib/socket'
import { MessageSender } from '../../types'

type ChatParams = {
  id: string
  participantId: string
  name: string
  avatar: string
}

const ChatDetailScreen: React.FC = () => {
  const { id: chatId, participantId, name, avatar } = useLocalSearchParams<ChatParams>()
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const scrollViewRef = useRef<ScrollView>(null)

  const { data: currentUser } = useCurrentUser()

  const { data: messages, isLoading } = useMessages(chatId)

  const { joinChat, leaveChat, sendMessage, sendTyping, isConnected, onlineUsers, typingUsers } =
    useSocketStore()

  const isOnline = participantId ? onlineUsers.has(participantId) : false
  const isTyping = participantId ? typingUsers.has(participantId) : false

  const typingTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (chatId && isConnected) {
      joinChat(chatId)
    }

    return () => {
      if (chatId) {
        leaveChat(chatId)
      }
    }
  }, [chatId, joinChat, leaveChat, isConnected])

  useEffect(() => {
    if (messages && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  const handleTyping = useCallback(
    (text: string) => {
      setMessage(text)

      if (!isConnected || !chatId) {
        return
      }

      if (text.length > 0) {
        sendTyping(chatId, true)

        if (typingTimeOutRef.current) {
          clearTimeout(typingTimeOutRef.current)
        }

        typingTimeOutRef.current = setTimeout(() => {
          sendTyping(chatId, false)
        }, 2000)
      } else {
        if (typingTimeOutRef.current) {
          clearTimeout(typingTimeOutRef.current)
        }
        sendTyping(chatId, false)
      }
    },
    [chatId, isConnected, sendTyping],
  )

  const handleSend = () => {
    console.log('Sending message:', message, isConnected, currentUser, isSending)
    if (!message.trim() || !isConnected || !currentUser || isSending) {
      return
    }

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current)
    }
    sendTyping(chatId, false)

    setIsSending(true)
    sendMessage(chatId, message.trim(), {
      _id: currentUser._id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      email: currentUser.email,
    })
    setMessage('')
    setIsSending(false)

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <View className="flex-row items-center px-4 py-2 border-b bg-surface border-surface-light">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#F4A261" />
        </Pressable>
        <View className="flex-row items-center flex-1 ml-2">
          {avatar && <Image source={avatar} style={{ width: 40, height: 40, borderRadius: 999 }} />}
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

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View className="flex-1 bg-surface">
          {isLoading ? (
            <View className="flex items-center justify-center flex-1">
              <ActivityIndicator size="large" color="#F4A261" />
            </View>
          ) : !messages || messages.length === 0 ? (
            <EmptyUI
              title="No messages yet"
              subtitle="Start the conversation!"
              iconName="chatbubbles-outline"
              iconColor="#6B6B70"
              iconSize={64}
            />
          ) : (
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                gap: 8,
              }}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {messages.map((msg) => {
                const senderId = (msg.sender as MessageSender)._id
                const isFromMe = currentUser ? senderId === currentUser._id : false

                return <MessageBubble key={msg._id} message={msg} isFromMe={isFromMe} />
              })}
            </ScrollView>
          )}

          <View className="px-3 pt-2 pb-3 border-t bg-surface border-surface-light">
            <View className="flex-row items-end bg-surface-card rounded-3xl px-3 py-1.5 gap-2">
              <Pressable className="items-center justify-center w-8 h-8 rounded-full">
                <Ionicons name="add" size={22} color="#F4A261" />
              </Pressable>
              <TextInput
                placeholder="Type a message"
                placeholderTextColor="#6B6B70"
                className="flex-1 mb-2 text-sm text-foreground"
                multiline
                style={{ maxHeight: 100 }}
                value={message}
                onChangeText={handleTyping}
                onSubmitEditing={handleSend}
                editable={!isSending}
              />
              <Pressable
                className="items-center justify-center w-8 h-8 rounded-full bg-primary"
                onPress={handleSend}
                disabled={!message.trim() || isSending}
              >
                {isSending ? (
                  <ActivityIndicator size="small" color="#0D0D0F" />
                ) : (
                  <Ionicons name="send" size={18} color="#0D0D0F" />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatDetailScreen
