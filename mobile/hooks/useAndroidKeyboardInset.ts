import { useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'

export const useAndroidKeyboardInset = (
  bottomInset: number,
  onKeyboardShown: () => void,
) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(Math.max(0, event.endCoordinates.height - bottomInset))
      setTimeout(() => {
        onKeyboardShown()
      }, 50)
    })

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [bottomInset, onKeyboardShown])

  return keyboardHeight
}
