import {FC, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, Animated, View} from 'react-native';

type TStar = {
  filled: boolean;
  starId: number;
  setRating: (data: number) => void;
  currentSeceted: number;
};

const Star: FC<TStar> = ({filled, setRating, starId, currentSeceted}) => {
  const value = useState(new Animated.Value(0))[0];

  const move = () => {
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
    outputRange: [1, 1.1],
  });

  const handleRating = (starId: number) => {
    setRating(starId);
    if (!filled || starId != currentSeceted) {
      move();
    }
  };

  return (
    <TouchableOpacity onPress={() => handleRating(starId)}>
      <Animated.View
        style={[
          styles.star,
          filled ? styles.filled : styles.empty,
          {transform: [{scale: interpolated}]},
        ]}></Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  star: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginRight: 4,
    borderWidth: 1,
  },
  filled: {
    backgroundColor: 'gold',
  },
  empty: {
    backgroundColor: '#ccc',
  },
});

export default Star;
