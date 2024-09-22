import React, {FC, useState} from 'react';
import {TouchableOpacity, Animated, StyleProp, ViewStyle} from 'react-native';
import StarSVG from '../../../shared/assets/SvgComponents/StarSVG';

type TStar = {
  filled: boolean;
  starId: number;
  setRating: (data: number) => void;
  currentSeceted: number;
  iconSize: number;
  iconStyle?: StyleProp<ViewStyle>;
};

const Star: FC<TStar> = ({
  filled,
  setRating,
  starId,
  currentSeceted,
  iconSize,
  iconStyle,
}) => {
  const value = useState(new Animated.Value(0))[0];

  const scale = () => {
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const interpolated = value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const handleRating = (starId: number) => {
    setRating(starId);
    if (!filled || starId != currentSeceted) {
      scale();
    }
  };

  return (
    <TouchableOpacity onPress={() => handleRating(starId)}>
      <Animated.View style={[iconStyle, {transform: [{scale: interpolated}]}]}>
        <StarSVG
          height={iconSize}
          width={iconSize}
          fill={filled ? '#ffd712' : '#cccccc'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Star;
