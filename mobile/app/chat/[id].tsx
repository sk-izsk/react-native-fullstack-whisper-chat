import { useLocalSearchParams } from 'expo-router'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ChatComposer } from '../../components/Chat/ChatComposer'
import { ChatConversation } from '../../components/Chat/ChatConversation'
import { ChatDetailHeader } from '../../components/Chat/ChatDetailHeader'
import { useAndroidKeyboardInset } from '../../hooks/useAndroidKeyboardInset'
import { useChatRoom } from '../../hooks/useChatRoom'

type ChatParams = {
  id: string
  participantId: string
  name: string
  avatar: string
}

const ChatDetailScreen: React.FC = () => {
  const { id: chatId, participantId, name, avatar } = useLocalSearchParams<ChatParams>()
  const insets = useSafeAreaInsets()
  const {
    currentUser,
    handleSend,
    handleTyping,
    isLoading,
    isOnline,
    isSending,
    isTyping,
    message,
    messages,
    scrollToBottom,
    scrollViewRef,
  } = useChatRoom(chatId, participantId)
  const keyboardHeight = useAndroidKeyboardInset(insets.bottom, scrollToBottom)

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <ChatDetailHeader avatar={avatar} isOnline={isOnline} isTyping={isTyping} name={name} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View className="flex-1 bg-surface">
          <ChatConversation
            currentUser={currentUser}
            isLoading={isLoading}
            messages={messages}
            onContentSizeChange={scrollToBottom}
            scrollViewRef={scrollViewRef}
          />
          <ChatComposer
            keyboardHeight={keyboardHeight}
            isSending={isSending}
            message={message}
            onChangeText={handleTyping}
            onSend={handleSend}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatDetailScreen
