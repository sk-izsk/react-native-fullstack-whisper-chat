import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

type AnimatedOrbProps = {
  colors: [string, string, ...string[]]
  size: number
  initialX: number
  initialY: number
  duration: number
}

export const AnimatedOrb: React.FC<AnimatedOrbProps> = ({
  colors,
  size,
  initialX,
  initialY,
  duration,
}) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)

  useEffect(() => {
    const easing = Easing.inOut(Easing.ease)

    translateX.value = withRepeat(
      withSequence(
        withTiming(30, { duration, easing }),
        withTiming(-30, { duration, easing }),
        withTiming(0, { duration, easing }),
      ),
      -1,
    )

    translateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: duration * 0.8, easing }),
        withTiming(20, { duration: duration * 0.8, easing }),
        withTiming(0, { duration: duration * 0.8, easing }),
      ),
      -1,
    )

    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: duration * 1.2, easing }),
        withTiming(0.9, { duration: duration * 1.2, easing }),
        withTiming(1, { duration: duration * 1.2, easing }),
      ),
      -1,
    )
  }, [duration, scale, translateX, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }))

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: initialX,
          top: initialY,
        },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={colors}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: 0.6,
          shadowColor: colors[0],
          shadowOpacity: 0.35,
          shadowRadius: 40,
          shadowOffset: { width: 0, height: 0 },
          elevation: 8,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  )
}
