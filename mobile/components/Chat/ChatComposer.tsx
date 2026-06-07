import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native'

type ChatComposerProps = {
  keyboardHeight: number
  isSending: boolean
  message: string
  onChangeText: (text: string) => void
  onSend: () => void
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  keyboardHeight,
  isSending,
  message,
  onChangeText,
  onSend,
}) => {
  return (
    <View
      className="px-3 pt-2 border-t bg-surface border-surface-light"
      style={[
        styles.composer,
        {
          paddingBottom: 12 + keyboardHeight,
        },
      ]}
    >
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
          onChangeText={onChangeText}
          onSubmitEditing={onSend}
          editable={!isSending}
        />
        <Pressable
          className="items-center justify-center w-8 h-8 rounded-full bg-primary"
          onPress={onSend}
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
  )
}

const styles = StyleSheet.create({
  composer: {
    marginBottom: 0,
  },
})
