import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Star from '../../../entities/Rating/ui/Star';

type TRating = {
  onChandge: (data: number) => void;
  count: number;
};

const Rating: FC<TRating> = ({onChandge, count}) => {
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
    />
  ));

  return (
    <View>
      <View style={styles.container}>{stars}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  star: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginRight: 4,
  },
  filled: {
    backgroundColor: 'gold',
  },
  empty: {
    opacity: 0.5,
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
