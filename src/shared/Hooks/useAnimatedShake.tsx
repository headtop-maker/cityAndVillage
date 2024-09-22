import React, {useCallback} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const useAnimatedShake = () => {
  const shake = useSharedValue<number>(0);

  const animateStyle = useAnimatedStyle(() => ({
    transform: [{translateX: shake.value}],
  }));

  const handleShake = useCallback(() => {
    shake.value = withSequence(
      withTiming(-5, {duration: 50}),
      withTiming(5, {duration: 50}),
      withTiming(0, {duration: 50}),
    );
  }, []);

  const childrenShakeElement = (
    children: string | JSX.Element | JSX.Element[],
  ) => (
    <Animated.View style={animateStyle}>
      <>{children}</>
    </Animated.View>
  );

  return {handleShake, childrenShakeElement, animateStyle};
};

export default useAnimatedShake;
