import React, {FC, useState} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Star from '../../../shared/Components/Rating/ui/Star';

type TRating = {
  onChandge: (data: number) => void;
  count: number;
  iconStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
};

const Rating: FC<TRating> = ({onChandge, count, iconStyle, iconSize = 40}) => {
  const [rating, setRating] = useState(-1);
  const ratingCount = Array(count).fill(0);

  const handleRating = (startId: number) => {
    if (rating === startId) {
      setRating(rating - 1);
      onChandge(rating);
      return;
    }
    setRating(startId);
    onChandge(++startId);
  };

  const stars = ratingCount.map((_, index) => (
    <Star
      key={'rating' + index}
      filled={index <= rating}
      starId={index}
      setRating={handleRating}
      currentSeceted={rating}
      iconStyle={iconStyle}
      iconSize={iconSize}
    />
  ));

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Rating;

// еще один вариант заполнения
// const stars = [];
// for (let i = 0; i < count; i++) {
//   const filled = i <= rating;
//   stars.push(
//     <Star key={i} filled={filled} starId={i} setRating={handleRating} />,
//   );
// }
